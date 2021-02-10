import React from 'react';
import './game-input.css';
import _ from 'lodash';
import { CreatePlayerProfile } from '../create-player/create-player';

export const nums = _.range(1, 19);

const initialState = {
    players: [
        {name: "",
        scores: new Array(18).fill(0)}
    ],
    availablePlayers: JSON.parse(window.localStorage.getItem('players'))
};
export class GameInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                {name: "",
                scores: new Array(18).fill(0)}
            ]
        }
        this.addPlayer = this.addPlayer.bind(this);
        this.handleNameSelection = this.handleNameSelection.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);
    }
    addPlayer() {
        console.log("Add Player Clicked");
        this.setState(state => {
            return {
                players: [...state.players,
                    {name: "",
                    scores: new Array(18).fill(0),
                    }
                ]
            }
        })
    }
    handleNameSelection(e, index) {
        this.setState(state => {
            return {
                players: state.players.map((p, i) => {
                    if (index === i) {
                        return {
                            ...p,
                            name: e.target.value
                        }
                    } else {
                        return p
                    }
                })
            }
        })
    }
    handleScoreChange(event, playerIndex, scoreIndex) {
        this.setState(state => {
            return {
                players: state.players.map((p, pi) => {
                    if (playerIndex === pi) {
                        return {
                            ...p,
                            scores: p.scores.map((s, si) => {
                                if(scoreIndex === si) {
                                    return parseInt(event.target.value) || 0
                                } else {
                                    return s
                                }
                            })
                        }
                    } else {
                        return p
                    }
                })
            }
        })
    }
    render() {
        return (
            <div className="input-table">
                <table>
                    <thead>
                        <tr>
                            <th className="name-column">Player</th>
                            {nums.map(n=> <th key={n}>{n}</th>)}
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.players.map((p,i) => (
                            <tr key={i}>
                                <td>
                                    <select 
                                        name="player-select" 
                                        id="player-select" 
                                        onChange={event => this.handleNameSelection(event,i)} >
                                        <option value={-1}>Select: </option>
                                        {this.props.availablePlayers.map(playerObj => {
                                            return <option>{playerObj.name}</option>})
                                        }
                                    </select>
                                </td>
                                {p.scores.map((score, si) => {
                                    return (
                                        <td key={si}>
                                            <input 
                                                className="score-input" 
                                                type="number" 
                                                value={score || ""} 
                                                onChange={event => this.handleScoreChange(event, i, si)}/>
                                        </td>
                                    )
                                 })}
                                 <td>{p.scores.reduce((a,b)=> a + b)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button 
                    className="button" 
                    onClick={this.addPlayer}>Add Player
                </button>
                <button 
                    className="button" 
                    onClick={()=> {
                        this.props.onSubmit(this.state.players);
                        this.setState(initialState)}}>Submit
                </button>
                <CreatePlayerProfile className="create-player" onPlayerCreation={this.props.onPlayerCreation}/>
            </div>
        )
    }
}