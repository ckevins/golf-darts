import React from 'react';
import './rankings.css';

export class Rankings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Rankings</h2>
                <table className='rankings-table'>
                    <thead>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Games</th>
                        <th>Average</th>
                        <th>Best</th>
                        <th>Worst</th>
                        <th>{`< Par`}</th>
                        <th>{`> Par`}</th>
                        <th>Most Ones</th>
                        <th>Most Reds</th>
                        <th>Hole Avg</th>
                    </thead>
                    <tbody>
                        {this.props.availablePlayers.map((player, index) => {
                            return (
                                <tr>
                                    <td>{index +1}</td>
                                    <td>{player.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}