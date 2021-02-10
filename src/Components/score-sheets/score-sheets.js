import React from 'react';
import './score-sheets.css';
import { Statistics } from '../statistics/statistics';
import {nums} from '../game-input/game-input';

export class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: -1
        };
        this.selectPlayer = this.selectPlayer.bind(this);
        this.checkScores = this.checkScores.bind(this);
        this.checkClass = this.checkClass.bind(this);
    }
    selectPlayer(event) {
        this.setState ({selection: event.target.value});
    }
    
    checkScores(player) {
        if (this.state.selection > -1 && player.scores.length === 0) {
            return (
                <div>
                    <message>This player does not have any submitted scores yet. Play some darts!</message>
                </div>
            );
        } else if (this.state.selection > -1 && player.scores !== []) {
            return (
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
                                        {s.map((holeScore, i2) => <td key={i*18+i2} className={this.checkClass(holeScore)}>{holeScore}</td>)}
                                        <td>{s.reduce((a,b) => a + b)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Statistics player={player}/>
                </div>
            )
        } else {
            return <p>No player selected.</p>
        }
    }

    checkClass (holeScore) {
        if (holeScore === 1) {
            return "one"
        } else if (holeScore < 4) {
            return "red"
        } else if (holeScore === 6) {
            return "six"
        } else {
            return "blue"
        }
    }

    render() {
        const player = this.props.availablePlayers[this.state.selection];
        return (
            <div className="print">
                <h2>Score Sheets & Statistics</h2>
                <label className="select" for="player-select">Choose a darter:</label>
                <br></br>
                <select name="players" id="player-select" onChange={this.selectPlayer} value={this.state.selection}>
                    <option value={-1}>--Please choose a darter--</option>
                    {this.props.availablePlayers.map((player, i)=> <option value={i}>{player.name}</option>)}
                </select>
                {this.checkScores(player)}
            </div>
        )
    }
}