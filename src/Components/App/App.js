import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import logo from './furmanLogo.png';
import { GameInput } from '../GameInput/GameInput';
import { Scores } from '../Scores/Scores';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.appHTML = this.appHTML.bind(this);
  }
  submit(players) {
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
    this.setState( {players: JSON.parse(localStorage.getItem('players'))} ); 
  }

  appHTML() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Furman Logo" className="logo"/>
          <h1>
            Golf Darts
          </h1>
        </header>
        <GameInput onSubmit={this.submit}/>
        <Scores className="score-sheet"/>
      </div>
    )
  }

  render() {
    if(localStorage.getItem('players')){
      return this.appHTML();
    } else {
      const newPlayer = {
        name: "No players available",
        scores: []
      };
      const newPlayerString = JSON.stringify(newPlayer);
      localStorage.setItem('players',`[${newPlayerString}]`);
      return this.appHTML();
    }
  }
}

export default App;
