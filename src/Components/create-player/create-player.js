import React from 'react';
import './create-player.css';

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
            games: []
        };
        this.props.onPlayerCreation(newPlayer); 
    }
    render() {
        return (
            <div>
                <h3>Create New Player Profile</h3>
                <p>If your name does not appear in the Player Select menu, you can create a new player profile here.</p> 
                <label>New Player Name: </label>
                <br></br>
                <input type="text" name="name" id="name" onChange={this.handleChange}></input>
                <button onClick={this.createPlayer}>Create Player</button>
            </div>
        )
    }
}