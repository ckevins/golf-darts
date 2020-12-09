import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import logo from './furmanLogo.png';
import { GameInput } from '../GameInput/GameInput';
import { Scores } from '../Scores/Scores';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: JSON.parse(localStorage.getItem('players'))
    };
    this.submit = this.submit.bind(this);
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Furman Logo" className="logo"/>
          <h1>
            Golf Darts
          </h1>
        </header>
        <GameInput onSubmit={this.submit}/>
        <Scores players={this.state.players} className="score-sheet"/>
      </div>
    );
  }
}

export default App;
