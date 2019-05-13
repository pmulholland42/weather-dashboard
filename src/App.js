import React from 'react';
import './App.css';

import Time from './components/Time';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Wind from './components/Wind';

function App() {
  return (
    <div className="App">
      <Time></Time>
      <br></br>
      <Temperature currentTemp={69} feelsLikeTemp={67} highTemp={84} lowTemp={57}></Temperature>
      <Humidity humidity={62}></Humidity>
      <Wind speed={4} direction={340}></Wind>
    </div>
  );
}

export default App;
