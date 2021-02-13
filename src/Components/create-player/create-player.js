import React from 'react';
import './create-player.css';

export class CreatePlayer extends React.Component {
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
            games: []
        };
        this.props.onPlayerCreation(newPlayer);
    }
    render() {
        return (
            <div>
                <h2>Create Team</h2>
                <p>If your team name does not appear in the Team Select menu, you can create a new team here.</p> 
                <label>New Team Name: </label>
                <br></br>
                <input type="text" name="name" id="new-player-name" onChange={this.handleChange}></input>
                <button onClick={this.createPlayer}>Create Team</button>
            </div>
        )
    }
}