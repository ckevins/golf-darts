import React from 'react';
import './Scores.css';
import { Statistics } from '../Statistics/Statistics';
import {nums} from '../GameInput/GameInput';

// class player {
//     constructor(name, gameScores) {
//         this.name = name;
//         this.gameScores = gameScores;
//     }
//     displayStats(gameScores) {
//         Statistics.cumulativeStats(gameScores);
//         //to include Total Score averages, total number of red scores, total number of blue scores, total number ones, twos, threes, fours, fives, sixes. Under par total & percent, par total & percent, over par total & percent
//         Statistics.individualHoleStats(gameScores);
//     }
// }

// export const submitScores = (nameInput, gameScores) => {
//     if (nameInput instanceof player) {
//         const nameInput = new player(nameInput, gameScores);
//         return nameInput
//     } else {
//         //add scores to this player's gameScores array
//     }
// }

export class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                {
                    name: "Minnie",
                    scores: [[1,2,3,4,5,6,5,4,3,2,1,2,3,4,5,6,5,4],
                            [1,2,3,4,5,6,5,4,3,2,1,2,3,4,5,6,5,3]],
                    totals: [65, 64]
                },
                {
                    name: "Rhodie",
                    scores: [[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                            [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3]],
                    totals: [72, 71]
                },
                {
                    name: "Cello",
                    scores: [[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5],
                            [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]],
                    totals: [73, 72]
                }
            ],
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
                <label for="player-select">Choose a darter:</label>
                <select name="players" id="player-select" onChange={this.selectPlayer} value={this.state.selection}>
                    <option value={-1}>--Please choose a darter--</option>
                    {this.state.players.map((player, i)=> <option value={i}>{player.name}</option>)}
                </select>
                {this.state.selection > -1 && 
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
                                        {s.map((holeScore, i2) => <td key={i2}>{holeScore}</td>)}
                                        <td>{player.totals[i]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}