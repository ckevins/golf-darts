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
    this.state = {
      availablePlayers: [
        {
          player_id: 0,
          name: "No players available",
          scores: []
        }
      ]
    };
    
    this.submit = this.submit.bind(this);
    this.updateAvailablePlayers = this.updateAvailablePlayers.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/players')
      .then(response => response.json())
      .then(data => {
        console.log(data.players);
        if(data.players.length > 0) {
          data.players.forEach(player => {
            const textScoreArr = Array.from(player.score);
            console.log(textScoreArr);
            const score = []
            textScoreArr.forEach(text => {
              const num = Number(text);
              score.push(num);
            })
            console.log(score);
            player.score = score;
          });
          this.setState( {
            availablePlayers: data.players} );
        }
      });
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
    alert('Player created! You can now find them in the player select menus.')
  } 

}

export default App;
