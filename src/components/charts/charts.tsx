import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import './charts.css';

type TObj = {
    x: Date;
    y: number;
}
type TLocation = string;

interface TProps {
    currentCity: string
}


const Charts = ({ currentCity }: TProps) => {
    const [chartData, setChartData] = useState<TObj[]>([]);
    const [locationKey, setLocationKey] = useState<TLocation>("");
    const [graphDisplay, setGraphDisplay] = useState<string>("none")
    const accuKey = process.env.REACT_APP_ACCU_KEY;
    // var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    useEffect(() => {
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${accuKey}&q=${currentCity}`)
            .then(response => {
                setLocationKey(response?.data[0]?.Key);

                // Second API call with locationKey as parameter
                axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${accuKey}`)
                    .then(res => {
                        const arr: TObj[] = [];
                        for (let i = 0; i < res?.data?.length; i++) {

                            //convert input temperature from F to C.
                            const celsiusValue = (res?.data[i]?.Temperature?.Value - 32) * 5 / 9;
                            const obj: TObj = { x: new Date(res?.data[i]?.DateTime), y: celsiusValue };
                            arr.push(obj);
                        }
                        setChartData(arr);
                        setGraphDisplay("block");
                    })
                    .catch(err => {
                        setGraphDisplay("none")
                    })
            })
            .catch(err => {
                // console.log("error in city key", err)
                setGraphDisplay("none")
            });
    }, [currentCity, locationKey, accuKey]);

    const options = {
        animationEnabled: true,
        title: {
            text: "Temperature in next 12 hours",
            fontColor: "#352432",
            fontSize: 18,
            fontWeight: 0,
        },
        axisX: {
            title: "Time",
            type: "time",
            valueFormatString: "HH:mm",
            gridThickness: 0,
            titleFontSize: 16,
        },
        axisY: {
            title: "Temperature",
            suffix: "°C",
            gridThickness: 0,
            titleFontSize: 16,
        },
        data: [{
            yValueFormatString: "#,###",
            xValueFormatString: "HH:mm",
            type: "splineArea",
            dataPoints: chartData,
        }],
        height: 260,
        backgroundColor: "#e6bf9b",
    };

    return (

        <div className="chart-content" style={{ display: graphDisplay }}>
            <CanvasJSChart className="canvas-chart" options={options} />
        </div>

    );
};

export default Charts;
