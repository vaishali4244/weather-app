import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import './charts.css'


const Charts = ({ search, setSearch,currentCity }) => {
    const [chartData, setChartData] = useState([])
const [locationKey,setLocationKey] =useState("")

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    console.log("chart data", new Date(2017, 0))

    let api_key2 = "a882ffaad1641b85d7c373a0bdaea292"


    useEffect(() => {
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Cz0KRlAxSEDcAaa4pcf4hNCG9JFCf3wJ&q=${currentCity}`
         )

             .then(response => {
                 console.log("city number",response)
                 setLocationKey(response?.data)
                    })
             .catch(err => console.log("error in city", err));
     }, [currentCity])

    useEffect(() => {
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/204842?apikey=Cz0KRlAxSEDcAaa4pcf4hNCG9JFCf3wJ`
         )
        
             .then(res => {
                const arr=[]
                for(let i=0;i<res?.data?.length;i++){
                    // console.log("viv data",res?.data?.DateTime)
                    const obj={x:new Date(res?.data[i]?.DateTime), y:res?.data[i]?.Temperature?.Value}
                    arr.push(obj)
                      }      
                      setChartData(arr)
               console.log("viv graph res",res)
                    })
             .catch(err => console.log("error in graph", err));
     }, [])

    const options = {
        animationEnabled: true,
        title: {
            text: "Monthly Sales - 2017"
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            // title: "Sales (in USD)",
            // prefix: "$"
            title: "temperature",
            suffix: "F"
        },
        data: [{
            yValueFormatString: "$#,###",
            // xValueFormatString: "MMMM Do YYYY, h:mm:ss a",
            xValueFormatString: "MMMM Do, h a", 
            type: "spline",
            dataPoints: chartData
            // [
            //     { x: new Date(2017, 0), y: 25060 },
            //     { x: new Date(2017, 1), y: 27980 },
            //     { x: new Date(2017, 2), y: 42800 },
            //     { x: new Date(2017, 3), y: 32400 },
            //     { x: new Date(2017, 4), y: 35260 },
            //     { x: new Date(2017, 5), y: 33900 },
            //     { x: new Date(2017, 6), y: 40000 },
            //     { x: new Date(2017, 7), y: 52500 },
            //     { x: new Date(2017, 8), y: 32300 },
            //     { x: new Date(2017, 9), y: 42000 },
            //     { x: new Date(2017, 10), y: 37160 },
            //     { x: new Date(2017, 11), y: 38400 }
            // ]
        }]
    }

   


    return (
        <div>
            <div className="chart-content">
                <CanvasJSChart  options={options}
                /* onRef={ref => this.chart = ref} */
                />
            </div>
        </div >
    )
}

export default Charts;
