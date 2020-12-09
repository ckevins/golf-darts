import React from 'react';
import './Scores.css';
import { Statistics } from '../Statistics/Statistics';
import {nums} from '../GameInput/GameInput';

export class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            selection: -1
        };
        this.selectPlayer = this.selectPlayer.bind(this);
    }
    selectPlayer(event) {
        this.setState ({selection: event.target.value});
    }
    render() {
        const player = this.state.players[this.state.selection];
        return (
            <div className="print">
                <h2>Print Score Sheets</h2>
                <label className="select" for="player-select">Choose a darter:</label>
                <select name="players" id="player-select" onChange={this.selectPlayer} value={this.state.selection}>
                    <option value={-1}>--Please choose a darter--</option>
                    {this.state.players.map((player, i)=> <option value={i}>{player.name}</option>)}
                </select>
                {this.state.selection > -1 && 
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="name-column">{player.name}</th>
                                    {nums.map(n=> <th key={n}>{n}</th>)}
                                    <th>Score</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {player.scores.map((s,i)=>{
                                    return (
                                        <tr>
                                            <td>Game {i+1}</td>
                                            {s.map((holeScore, i2) => <td key={i*18+i2}>{holeScore}</td>)}
                                            <td>{s.reduce((a,b) => a + b)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Statistics player={player}/>
                    </div>
                }
            </div>
        )
    }
}