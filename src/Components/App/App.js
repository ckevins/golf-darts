import React from 'react';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import './app.css';
import logo from './furmanLogo.png';
import { GameInput } from '../game-input/game-input';
import { Scores } from '../score-sheets/score-sheets';
import { CreatePlayerProfile } from '../create-player/create-player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availablePlayers: [
        {
          player_id: 0,
          name: "No players available",
          games: []
        }
      ]
    };
    
    this.submit = this.submit.bind(this);
    this.updateAvailablePlayers = this.updateAvailablePlayers.bind(this);
    this.getAllPlayers = this.getAllPlayers.bind(this);
  }

  //after App mounts, this function fetches players that are saved to the database and sets the state of available players.
  // availablePlayer: [{player_id: 1, name: 'Cody', scores: [[game1],[game2]]}]

  getAllPlayers() {
    fetch('http://localhost:4000/api/players')
      .then(response => response.json())
      .then(data => {
        if(data.players.length > 0) {
          data.players.forEach(player => {
            const textScoreArr = Array.from(player.games);
            const allScores = [];
            textScoreArr.forEach(text => {
              const num = Number(text);
              allScores.push(num);
            })
            let games = [];
            const splitArray = (array) => {
              while(array.length >= 18) {
                let arrayElement = array.splice(0,18);
                games.push(arrayElement);
              }
              return games;
            };
            splitArray(allScores);
            player.games = games;
          });
          this.setState( {
            availablePlayers: data.players} );
        }
      });
  }

  componentDidMount() {
    this.getAllPlayers();
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
        <GameInput 
          availablePlayers={this.state.availablePlayers} 
          onPlayerCreation={this.updateAvailablePlayers} 
          onSubmit={this.submit}/>
        <CreatePlayerProfile 
          className="create-player" 
          onPlayerCreation={this.updateAvailablePlayers}/>
        <Scores availablePlayers={this.state.availablePlayers} className="score-sheet"/>
      </div>
    )
  }

  updateAvailablePlayers(newPlayer) {
    // const setLocalStorage = () => localStorage.setItem("players", JSON.stringify(this.state.availablePlayers));
    // if(this.state.availablePlayers[0].name === "No players available"){
    //   const players = [newPlayer]
    //   this.setState( {availablePlayers: players}, setLocalStorage)
    // } else {
    //   this.setState(state => {
    //     return {availablePlayers: [...state.availablePlayers, newPlayer] }
    //   }, setLocalStorage)
    // }
    const url = 'http://localhost:4000/api/players';
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer)
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Player Created >>>> Name: ${data.player.name}`);
        alert(`New player created:

        ${data.player.name}

        They can now be selected from all player selection menus.
        `);
        this.getAllPlayers();
      })
  } 

}

export default App;
