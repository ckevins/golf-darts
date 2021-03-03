import React from 'react';
import { nums,
    getThisScore,
    } from '../stat-math';
import { HolePieChart } from '../charts/hole-pie-chart';



export class ScoreSpread extends React.Component {
    render () {
        const games = this.props.player.games;
        return (
            <div className="stats">
                <br></br>
                <h3>Score Spread</h3>
                <table id='all-holes-table'>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Ones</th>
                        <th>Twos</th>
                        <th>Threes</th>
                        <th>Fours</th>
                        <th>Fives</th>
                        <th>Sixes</th>
                    </tr>
                    <tr>
                        <th>Total:</th>
                        <td>{getThisScore(games, 1)[0]}</td>
                        <td>{getThisScore(games, 2)[0]}</td>
                        <td>{getThisScore(games, 3)[0]}</td>
                        <td>{getThisScore(games, 4)[0]}</td>
                        <td>{getThisScore(games, 5)[0]}</td>
                        <td>{getThisScore(games, 6)[0]}</td>
                    </tr>
                    <tr>
                        <th>Percentage:</th>
                        <td>{getThisScore(games, 1)[1].toFixed(1)}%</td>
                        <td>{getThisScore(games, 2)[1].toFixed(1)}%</td>
                        <td>{getThisScore(games, 3)[1].toFixed(1)}%</td>
                        <td>{getThisScore(games, 4)[1].toFixed(1)}%</td>
                        <td>{getThisScore(games, 5)[1].toFixed(1)}%</td>
                        <td>{getThisScore(games, 6)[1].toFixed(1)}%</td>
                    </tr>
                    <br></br>
                    <tr>
                        <th></th>
                        <td></td>
                        <th>Red Scores</th>
                        <td></td>
                        <td></td>
                        <th>Blue Scores</th>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td></td>
                        <td>{getThisScore(games, 'reds')[0]}</td>
                        <td>
                        </td>
                        <td></td>
                        <td>{getThisScore(games, 'blues')[0]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Percentage:</td>
                        <td></td>
                        <td>{getThisScore(games, 'reds')[1].toFixed(1)}%</td>
                        <td></td>
                        <td></td>
                        <td>{getThisScore(games, 'blues')[1].toFixed(1)}%</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <HolePieChart
                    id='all-scores-pie-chart'
                    ones={getThisScore(games,1)[0]}
                    twos={getThisScore(games,2)[0]}
                    threes={getThisScore(games,3)[0]} 
                    fours={getThisScore(games,4)[0]}
                    fives={getThisScore(games,5)[0]}
                    sixes={getThisScore(games,6)[0]}
                />
            </div>
        )
    }
}
