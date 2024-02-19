import { Route, Routes } from 'react-router-dom';
import Screen from './screen/screen';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Screen />} />
    </Routes>
  );
}

export default App;
