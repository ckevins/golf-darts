import React from 'react';
import _ from 'lodash';
import './game-input.css';

export const nums = _.range(1, 19);

//state to reset to after submit
const initialState = {
    players: [
        {name: "",
        scores: new Array(18).fill(0)}
    ]
};

//resets player select box to default option so that submit button can be used more than once.
const resetSelection = () => {
    const playerSelect = document.getElementById('player-select');
    playerSelect.value = -1;
}


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
        this.removePlayer = this.removePlayer.bind(this);
        this.handleNameSelection = this.handleNameSelection.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.submit = this.submit.bind(this);
        this.checkID = this.checkID.bind(this);
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
    removePlayer() {
        console.log("Remove Player Clicked");
        this.setState(state => {
            const playersMinusOne = state.players.slice(0, -1)
            return {
                players: playersMinusOne
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
        const oneBoxDown = document.getElementById(((playerIndex+1)*18)+ scoreIndex);
        const firstRowBox = document.getElementById(scoreIndex+1);
        if(oneBoxDown) {
            oneBoxDown.focus()
        } else if( firstRowBox && firstRowBox.id !== "18"){
            firstRowBox.focus()
        } 
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

    checkID (score) {
        if (score === 1) {
            return {
                color: 'red',
                border: 'double 6px red',
                borderRadius: '50%'
            }
        } else if (score < 4) {
            return {
                color: 'red',
                border: 'none',
                borderRadius: '20%'
            }
        } else if (score === 6) {
            return {
                color: 'blue',
                border: 'double 6px blue',
                borderRadius: '50%'
            }
        } else {
            return {
                color: 'blue',
                border: 'none',
                borderRadius: '20%'
            }
        }
    }

    submit() {
        const isLessThanOne = element => element < 1;
        const isMoreThanSix = element => element > 6;
        const hasErrors = this.state.players.map(playerObj => {
            if(playerObj.name === "") {
                alert(`One or more teams in this game has not selected a name.`);
                return true;
            } else if (playerObj.scores.some(isLessThanOne) || playerObj.scores.some(isMoreThanSix)) {
                alert(`One or more scores in the game is not between 1 and 6.`);
                return true;
            } else {
                return false;
            }
        });
        if (hasErrors.includes(true)) {
            return;
        } else {
            this.props.onSubmit(this.state.players);
            this.setState(initialState);
            resetSelection();
        }
    }

    render() {
        return (
            <div className='game-input'>
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
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
                                            return <option key={`Row ${i}: ${playerObj.name}`}>{playerObj.name}</option>})
                                        }
                                    </select>
                                </td>
                                {p.scores.map((score, si) => {
                                    return (
                                        <td key={si}>
                                            <input 
                                                className="score-input-box"
                                                id={(i*18)+si} 
                                                style = {this.checkID(score)}
                                                value={score || ""} 
                                                onChange={event => {
                                                    this.handleScoreChange(event, i, si);
                                                    this.checkID(event, i, si)
                                                }}/>
                                        </td>
                                    )
                                 })}
                                 <td>{p.scores.reduce((a,b)=> a + b)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button 
                    onClick={this.addPlayer}>Add Team
                </button>
                <button 
                    onClick={this.removePlayer}>Remove Team
                </button>
                <button 
                    onClick={()=> {this.submit()}}>
                    Submit Scores
                </button>
                <p id='scores-confirmation'>{this.props.submitMessage}</p>
            </div>
        )
    }
}