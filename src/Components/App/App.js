import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import logo from './furmanLogo.png';
import { GameInput } from '../GameInput/GameInput';
import { Scores } from '../Scores/Scores';

const App = () => {
  const submit = (players) => {
    console.log(players);
    const savedPlayers = JSON.parse(localStorage.getItem('players'));
    players.map(player => {
      savedPlayers.map(savedPlayer => {
        if(player.name === savedPlayer.name){
          savedPlayer.scores.push(player.scores);
          return savedPlayer
        } else {
          return savedPlayer
        }
      })
      return savedPlayers;
    });
    localStorage.setItem('players', JSON.stringify(savedPlayers));
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
      <Scores />
    </div>
  );
}

export default App;
