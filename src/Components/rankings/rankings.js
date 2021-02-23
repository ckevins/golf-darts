import React from 'react';
import './rankings.css';
import { getStat } from '../stat-math';


export class Rankings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: []
        }
        this.sortByTeam = this.sortByTeam.bind(this);
        this.sortByGP = this.sortByGP.bind(this);
        this.sortByAverage = this.sortByAverage.bind(this);
        this.sortByBest = this.sortByBest.bind(this);
        this.sortByWorst = this.sortByWorst.bind(this);
        this.sortByUnder = this.sortByUnder.bind(this);
        this.sortByOver = this.sortByOver.bind(this);
        this.sortByOnes = this.sortByOnes.bind(this);
        this.sortByReds = this.sortByReds.bind(this);
    }

    sortByTeam () {
        const sortByTeam = this.state.players.sort(function(a,b){
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });
        this.setState( {players: sortByTeam} );
    }

    sortByGP () {
        const sortByGP = this.state.players.sort(function(a,b){
            return b.gamesPlayed - a.gamesPlayed;
        });
        this.setState( {players: sortByGP} );
    }

    sortByAverage () {
        const sortedByAvg = this.state.players.sort(function(a,b) {
            return a.average - b.average;
        });
        this.setState( {players: sortedByAvg} )
    }
    
    sortByBest () {
        const sortedByBest = this.state.players.sort(function(a,b) {
            return a.best - b.best;
        });
        this.setState( {players: sortedByBest} )
    }

    sortByWorst () {
        const sortedByWorst = this.state.players.sort(function(a,b) {
            return a.worst - b.worst;
        });
        this.setState( {players: sortedByWorst} )
    }

    sortByUnder () {
        const sortedByUnder = this.state.players.sort(function(a,b) {
            return b.under - a.under;
        });
        this.setState( {players: sortedByUnder} )
    }

    sortByOver () {
        const sortedByOver = this.state.players.sort(function(a,b) {
            return b.over - a.over;
        });
        this.setState( {players: sortedByOver} )

    }

    sortByOnes () {
        const sortByOnes = this.state.players.sort(function(a,b) {
            return b.ones-a.ones;
        });
        this.setState( {players: sortByOnes} )
    }

    sortByReds () {
        const sortByReds = this.state.players.sort(function(a,b) {
            return b.reds-a.reds;
        });
        this.setState( {players: sortByReds} )
    }

    componentDidMount() {
        const players = this.props.availablePlayers.map((player, index) => {
            if(player.games.length > 0) {
                return {
                    name: player.name,
                    gamesPlayed: player.games.length,
                    average: getStat(player.games, 'average').toFixed(1),
                    holeAverage: getStat(player.games, 'all holes average').toFixed(2),
                    best: getStat(player.games, 'personal best'),
                    worst: getStat(player.games, 'personal worst'),
                    under: getStat(player.games, 'under par')[1],
                    over: getStat(player.games, 'over par')[1],
                    ones: getStat(player.games, 'ones record')[0],
                    reds: getStat(player.games, 'reds record')[0]
                }
            } else {
                return {
                    name: player.name,
                    gamesPlayed: 0,
                    average: Number.POSITIVE_INFINITY,
                    holeAverage: Number.POSITIVE_INFINITY,
                    best: Number.POSITIVE_INFINITY,
                    worst: Number.POSITIVE_INFINITY,
                    under: 0,
                    over: 0,
                    ones: 0,
                    reds: 0
                }
            }
        });
        const sortedByAvg = players.sort(function(a,b) {
            return a.average-b.average;
        });
        this.setState( {players: sortedByAvg} );
    }

    render() {
        return (
            <div className='rankings'>
                <h2>Rankings</h2>
                <table className='rankings-table'>
                    <tr>
                        <th id='rank-table-rank-column'><button id='rank-button' onClick={this.sortByAverage}>Rank</button></th>
                        <th id='rank-table-team-column'><button onClick={this.sortByTeam}>Team</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByGP}>GP</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByAverage}>Avg</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByAverage}>Hole Avg</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByBest}>Best</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByUnder}>Under Par %</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByOnes}>Ones PR</button></th>
                        <th id='rank-table-header'><button onClick={this.sortByReds}>Reds PR</button></th>
                    </tr>
                    {this.state.players.map((player,index) => {
                        return (
                            <tr>
                                <th id='rank-number'>{index +1}</th>
                                <td id='rank-table-data'>{player.name}</td>
                                <td id='rank-table-data'>{player.gamesPlayed}</td>
                                <td id='rank-table-data'>{player.average === Number.POSITIVE_INFINITY ? 'N/A' : player.average}</td>
                                <td id='rank-table-data'>{player.holeAverage === Number.POSITIVE_INFINITY ? 'N/A' : player.holeAverage}</td>
                                <td id='rank-table-data'>{player.best === Number.POSITIVE_INFINITY ? 'N/A' : player.best}</td>
                                <td id='rank-table-data'>{player.under === Number.POSITIVE_INFINITY ? 'N/A' : player.under}%</td>
                                <td id='rank-table-data'>{player.ones}</td>
                                <td id='rank-table-data'>{player.reds}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}
