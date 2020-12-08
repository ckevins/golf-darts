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
        return {
            name: this.state.input,
            scores: []
        }
    }
    render() {
        return (
            <div>
                <h2>Create New Player Profile</h2>
                <p>If your name does not appear in the Player Select menu, you can create a new player profile here.</p> 
                <label>New Player Name: </label>
                <input type="text" name="name" id="name" onChange={this.handleChange}></input>
                <button onClick={this.createPlayer}>Create Player</button>
            </div>
        )
    }
}