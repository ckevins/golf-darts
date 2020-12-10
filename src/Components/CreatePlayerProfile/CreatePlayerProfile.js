import React from 'react';
import './CreatePlayerProfile.css';

export class CreatePlayerProfile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            input: ""
        }
        this.createPlayer = this.createPlayer.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState( {input: e.target.value} )
    }
    createPlayer() {
        const newPlayer = {
            name: this.state.input,
            scores: []
        };
        this.props.onPlayerCreation(newPlayer);
        // const players = JSON.parse(localStorage.getItem('players'));
        // if(players[0].name === "No players available"){
        //     players.splice(0, 1, newPlayer);
        //     const playerString = JSON.stringify(players);
        //     localStorage.setItem('players', playerString);
        //     this.props.onPlayerCreation();
        //     alert('Player created! You can now find them in the Player Select menu')
        // } else {
        //     players.push(newPlayer);
        //     const playersString = JSON.stringify(players);
        //     localStorage.setItem('players', playersString);
        //     this.props.onPlayerCreation();
        //     alert('Player created! You can now find them in the Player Select menu')
        // }
            
    }
    render() {
        return (
            <div>
                <h2>Create New Player Profile</h2>
                <p>If your name does not appear in the Player Select menu, you can create a new player profile here.</p> 
                <label>New Player Name: </label>
                <br></br>
                <input type="text" name="name" id="name" onChange={this.handleChange}></input>
                <button onClick={this.createPlayer}>Create Player</button>
            </div>
        )
    }
}