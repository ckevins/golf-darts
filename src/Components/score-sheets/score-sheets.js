import React from 'react';
import {nums} from '../game-input/game-input';
import './score-sheets.css';

export class ScoreSheets extends React.Component {
    constructor(props) {
        super(props);
        this.checkClass = this.checkClass.bind(this);
        this.checkTotalClass = this.checkTotalClass.bind(this);
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

    checkTotalClass (total) {
        if (total < 72) {
            return "red"
        } else {
            return "blue"
        }
    }

    render() {
        const player = this.props.player;
        return (
            <div className='printed-stats'>
                <br></br>
                <h4>Score Sheet</h4>
                <table>
                    <thead>
                        <tr>
                            <th>{player.name}</th>
                            {nums.map(n=> <th key={n}>{n}</th>)}
                            <th>Total</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {player.games.map((s,i)=>{
                            return (
                                <tr key={i}>
                                    <th id='game'>Game {i+1}</th>
                                    {s.map((holeScore, i2) => <td key={i*18+i2} className={this.checkClass(holeScore)} id='score-cells'>{holeScore}</td>)}
                                    <td className={this.checkTotalClass((s.reduce((a,b) => a + b)))} id='total' key={`${i} total`}>{s.reduce((a,b) => a + b)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}