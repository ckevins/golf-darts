import React from 'react';
import { ScoreSheets } from '../score-sheets/score-sheets';
import { StatsByGame } from '../stats-by-game/stats-by-game';
import { ScoreSpread } from '../score-spread/score-spread';
import { StatsByHole } from '../stats-by-hole/stats-by-hole';
import './statistics.css';


export class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerSelection: -1,
            statSelection: "1"
        };
        this.selectPlayer = this.selectPlayer.bind(this);
        this.selectStat = this.selectStat.bind(this);
        this.printStat = this.printStat.bind(this);
        this.checkPlayerForGames = this.checkPlayerForGames.bind(this);
    }

    selectPlayer(event) {
        this.setState ({playerSelection: event.target.value});
    }

    selectStat(event) {
        this.setState ({statSelection: event.target.value})
    }

    printStat(player) {
        if (this.state.statSelection === "4") {
            return <ScoreSheets player={player}/>
        } else if (this.state.statSelection === "1") {
            return <StatsByGame player={player}/>
        } else if (this.state.statSelection === "2") {
            return <ScoreSpread player={player}/>
        } else if (this.state.statSelection === "3") {
            return <StatsByHole player={player}/>
        }
    }

    checkPlayerForGames(player) {
        if (this.state.playerSelection !== -1 && player.games.length === 0) {
            return (
                <p>This team has not played any games yet. Go play some darts!</p>
            )
        } else if (this.state.playerSelection !== -1 && player.games !== []) {
            return (
                <div>
                    <label>View:</label>
                    <select name="stats-select" id="stats-select" onChange={this.selectStat} value={this.state.statSelection}>
                        <option value={1}>Stats By Game</option>
                        <option value={2}>Score Spread</option>
                        <option value={3}>Stats By Hole</option>
                        <option value={4}>Score Sheet</option>
                    </select>
                    {this.printStat(player)}
                </div>
            )
        } else {
            return (
                <p>No team selected.</p>
            )
        }
    }

    render() {
        const player = this.props.availablePlayers[this.state.playerSelection];
        return (
            <div className="score-sheet-div">
                <h2>Statistics</h2>
                <label className="select">Team:</label>
                <select name="players" id="score-sheet-player-select" onChange={this.selectPlayer} value={this.state.playerSelection}>
                    <option value={-1}>--Choose a team--</option>
                    {this.props.availablePlayers.map((player, i)=> <option key={i} value={i}>{player.name}</option>)}
                </select>
                {this.checkPlayerForGames(player)}
            </div>
        )
    }
}