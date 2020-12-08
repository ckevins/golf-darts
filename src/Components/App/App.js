import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import logo from './furmanLogo.png';
import { GameInput } from '../GameInput/GameInput';
import { Scores } from '../Scores/Scores';
import { CreatePlayerProfile } from '../CreatePlayerProfile/CreatePlayerProfile';

const App = () => {
  const submit = (players) => {
    console.log(players);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Furman Logo" className="logo"/>
        <p>
          Golf Darts
        </p>
      </header>
      <GameInput onSubmit={submit}/>
      <CreatePlayerProfile />
      <Scores />
    </div>
  );
}

export default App;
