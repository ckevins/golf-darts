import React from 'react';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import logo from './furmanLogo.png';
import { GameInput } from '../GameInput/GameInput';
import { Scores } from '../Scores/Scores';

class App extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('players')){
      this.state = {
        availablePlayers: JSON.parse(window.localStorage.getItem('players'))
      }
    } else {
      this.state = {
        availablePlayers: [
          {
            name: "No players available",
            scores: []
          }
        ]
      }
    }
    this.submit = this.submit.bind(this);
    this.updateAvailablePlayers = this.updateAvailablePlayers.bind(this);
  }

  submit(players) {
    this.setState(state => {
      return { 
        availablePlayers: state.availablePlayers.map(availablePlayer => {
          const player = _.find(players, {name: availablePlayer.name});
          if (player) {
            return {
              ...availablePlayer,
              scores: [...availablePlayer.scores, player.scores]
            }
          } else {
            return availablePlayer
          }
        })
      }
    }, () => localStorage.setItem("players", JSON.stringify(this.state.availablePlayers)))
    // const savedPlayers = JSON.parse(localStorage.getItem('players'));
    // players.map(player => {
    //   savedPlayers.map(savedPlayer => {
    //     if(player.name === savedPlayer.name){
    //       savedPlayer.scores.push(player.scores);
    //       return savedPlayer
    //     } else {
    //       return savedPlayer
    //     }
    //   })
    //   return savedPlayers;
    // });
    // localStorage.setItem('players', JSON.stringify(savedPlayers));
    // this.setState( {availablePlayers: JSON.parse(localStorage.getItem('players'))} ); 
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
        <GameInput availablePlayers={this.state.availablePlayers} onPlayerCreation={this.updateAvailablePlayers} onSubmit={this.submit}/>
        <Scores availablePlayers={this.state.availablePlayers} className="score-sheet"/>
      </div>
    )
  }

  updateAvailablePlayers(newPlayer) {
    const setLocalStorage = () => localStorage.setItem("players", JSON.stringify(this.state.availablePlayers));
    if(this.state.availablePlayers[0].name === "No players available"){
      const players = [newPlayer]
      this.setState( {availablePlayers: players}, setLocalStorage)
    } else {
      this.setState(state => {
        return {availablePlayers: [...state.availablePlayers, newPlayer] }
      }, setLocalStorage)
    }
  } 

}

export default App;
