import React from 'react';
import './rankings.css';
import { getStat } from '../stat-math';

export class Rankings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='rankings'>
                <h2>Rankings</h2>
                <table className='rankings-table'>
                    <thead>
                        <th id='rank-table-header'>Rank</th>
                        <th id='rank-table-header'>Team</th>
                        <th id='rank-table-header'>GP</th>
                        <th id='rank-table-header'>Avg</th>
                        <th id='rank-table-header'>Hole Avg</th>
                        <th id='rank-table-header'>Best</th>
                        <th id='rank-table-header'>Worst</th>
                        <th id='rank-table-header'>{`< Par  %`}</th>
                        <th id='rank-table-header'>{`> Par %`}</th>
                        <th id='rank-table-header'>Ones PR</th>
                        <th id='rank-table-header'>Reds PR</th>
                    </thead>
                    <tbody>
                        {this.props.availablePlayers.map((player, index) => {
                            if(player.games.length > 0) {
                                return (
                                    <tr>
                                        <th id='rank-table-header'>{index +1}</th>
                                        <td id='rank-table-data'>{player.name}</td>
                                        <td id='rank-table-data'>{player.games.length}</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'average').toFixed(2)}</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'all holes average').toFixed(2)}</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'personal best')}</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'personal worst')}</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'under par')[1]}%</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'over par')[1]}%</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'ones record')[0]}</td>
                                        <td id='rank-table-data'>{getStat(player.games, 'reds record')[0]}</td>
                                    </tr>
                                )
                            } else {
                                return
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}