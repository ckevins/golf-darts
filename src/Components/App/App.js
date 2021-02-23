import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import './app.css';
import logo from './furmanLogo.png';
import animation from './logo-animated.mp4';
import codyEvinsLogo from './cody-evins-logo-name.png';
import { GameInput } from '../game-input/game-input';
import { ScoreSheets } from '../score-sheets/score-sheets';
import { CreatePlayer } from '../create-player/create-player';
import { Rankings } from '../rankings/rankings';

const api = 'postgresApi';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: true,
      teamConfirmation: '',
      teamMessage: '',
      submitMessage: '',
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
    // this.renderAnimatedLogo = this.renderAnimatedLogo.bind(this);
    // this.clearAnimatedLogo = this.clearAnimatedLogo.bind(this);
  }

  //after App mounts, this function fetches players that are saved to the database and sets the state of available players.
  // availablePlayer: [{player_id: 1, name: 'Cody', scores: [[game1],[game2]]}]

  getAllPlayers() {
    fetch('http://localhost:4000/'+ api +'/players')
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
    // this.clearAnimatedLogo();
  }

  submit(players) {
    const url = 'http://localhost:4000/'+ api +'/players/scores';
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(players)
    })
    .then(() => {
      this.getAllPlayers();
      this.setState( {submitMessage: 'Scores submitted!'} )
    })
    .then(()=>{
      setTimeout(()=> {
        this.setState( {submitMessage: ''} )
      }, 2000)
    })
  }

  createPlayer(newPlayer) {
    const url = 'http://localhost:4000/'+ api +'/players';
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
      .then(() => {
        console.log(`Team Created >>>> Name: ${newPlayer.name}`);
        this.getAllPlayers();
        this.setState( {
          teamConfirmation: `Team Created: ${newPlayer.name}`,
          teamMessage: `This team can now be found in all team selection menus.`
        })
      })
      .then(()=>{
        setTimeout(()=>{
          this.setState( {
            teamConfirmation: '',
            teamMessage: ''  
          })
        }, 4000)
      })
      .catch(error => {
        console.error('This team name is probably taken.', error);
        this.setState( {
          teamConfirmation: `Sorry! This team name is taken.`,
          teamMessage: `Please enter a new name and try again.`
        } )
      })
  } 

  // renderAnimatedLogo() {
  //   return (
  //     <div id='animation'>
  //       <video width='200' autoPlay>
  //         <source src={animation} type='video/mp4'></source>
  //       </video>
  //     </div>
  //   )
  // }

  // clearAnimatedLogo() {
  //   setTimeout(() => {
  //     this.setState( {animation: false} )
  //   }, 5000);
  // }

  render() {
    const availablePlayers = this.state.availablePlayers;
    // if (this.state.animation === true) {
    //   return (
    //     <div>
    //       {this.renderAnimatedLogo()}
    //     </div>
    //   )
    // } else {
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
          <Router>
            <div className='router'>
              <nav>
                <ul>
                  <li>
                    <Link to='/'>Play</Link>
                  </li>
                  <li>
                    <Link to='/create-a-team'>Create a Team</Link>
                  </li>
                  <li>
                    <Link to='/statistics'>Statistics</Link>
                  </li>
                  <li>
                    <Link to='/rankings'>Rankings</Link>
                  </li>
                </ul>
              </nav>
              <Switch>
                <Route path='/create-a-team'>
                  <CreatePlayer 
                    className="create-player" 
                    onPlayerCreation={this.createPlayer}
                    teamConfirmation={this.state.teamConfirmation}
                    teamMessage={this.state.teamMessage}/>
                </Route>
                <Route path='/statistics'>
                  <ScoreSheets
                    availablePlayers={availablePlayers} 
                    className="score-sheet"/>
                </Route>
                <Route path='/rankings'>
                  <Rankings 
                    availablePlayers={availablePlayers}/>
                </Route>
                <Route path='/'>
                  <GameInput 
                    availablePlayers={availablePlayers} 
                    onSubmit={this.submit}
                    submitMessage={this.state.submitMessage}/>
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      )
    // }
  }
}



export default App;
