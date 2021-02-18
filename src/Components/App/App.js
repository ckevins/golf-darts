import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './app.css';
import logo from './furmanLogo.png';
import codyEvinsLogo from './cody-evins-logo-name.png';
import { GameInput } from '../game-input/game-input';
import { ScoreSheets } from '../score-sheets/score-sheets';
import { CreatePlayer } from '../create-player/create-player';

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
    this.createPlayer = this.createPlayer.bind(this);
    this.getAllPlayers = this.getAllPlayers.bind(this);
  }

  //after App mounts, this function fetches players that are saved to the database and sets the state of available players.
  // availablePlayer: [{player_id: 1, name: 'Cody', scores: [[game1],[game2]]}]

  getAllPlayers() {
    fetch('http://localhost:4000/sqliteApi/players')
      .then(response => response.json())
      .then(data => {
        if(data.players.length > 0) {
          this.setState( {
            availablePlayers: data.players} );
        }
      });
  }

  componentDidMount() {
    this.getAllPlayers();
  }

  submit(players) {
    const url = 'http://localhost:4000/sqliteApi/players/scores';
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(players)
    })
    .then(()=> this.getAllPlayers())
  }

  createPlayer(newPlayer) {
    const url = 'http://localhost:4000/sqliteApi/players';
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer)
    })
      .then(response => {
        console.log(response.ok);
        if(!response.ok) {
          throw new Error('Something went wrong with API request');
        }
        return response.json()
      })
      .then(data => {
        console.log(`Team Created >>>> Name: ${data.player.name}`);
        this.getAllPlayers();
        document.getElementById('team-creation-confirmation').innerHTML = `Team Created: ${data.player.name}`;
        document.getElementById('team-creation-message').innerHTML = `Your new team can now be found in all team selection menus.`;
      })
      .catch(error => {
        console.error('This team name is probably taken.', error);
        document.getElementById('team-creation-confirmation').innerHTML = `Sorry! This team name is taken.`;
        document.getElementById('team-creation-message').innerHTML = `Please enter a new name and try again.`;
      })
  } 

  render() {
    return (
      <div>
        <div className="cody-evins-logo">
          <img src={codyEvinsLogo} alt="Cody Evins Logo" id="CE"/>
        </div>
        <header className="App-header">
          <img src={logo} alt="Furman Logo" id="logo"/>
          <h1 id="page-title">
            Furman Theatre Darts
          </h1>
        </header>
        <GameInput 
          availablePlayers={this.state.availablePlayers} 
          onSubmit={this.submit}/>
        <CreatePlayer 
          className="create-player" 
          onPlayerCreation={this.createPlayer}/>
        <p id='team-creation-confirmation'></p>
        <p id='team-creation-message'></p>
        <ScoreSheets
          availablePlayers={this.state.availablePlayers} 
          className="score-sheet"/>
      </div>
    )
  }
}

export default App;
