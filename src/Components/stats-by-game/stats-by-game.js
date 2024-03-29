import React from 'react';
import './stats-by-game.css';
import { nums,
    numsSkipOne,
    getStat,
    getThisScore,
    getRankList} from '../stat-math';
import { GameStackedAreaChart } from '../charts/stacked-area-chart';
import { HolePieChart } from '../charts/hole-pie-chart';
import { HoleStats } from '../hole-stats/hole-stats';


//StackedAreaChart looks dumb if only one score is saved; this makes sure that it only shows with more than one.
const checkForStackedAreaChart = (games) => {
    if(games.length > 1) {
        return (
            <div>
                <GameStackedAreaChart 
                games={games}/>
            </div>
        )
    } else {
        return
    }
}

export class StatsByGame extends React.Component {
    constructor(props) {
        super(props);
        this.selectHole = this.selectHole.bind(this);
        this.checkHoleSelection = this.checkHoleSelection.bind(this);
    }
    
    selectHole(event) {
        this.setState( {holeSelection: event.target.value} );
    }

    checkHoleSelection(hole, games) {
        if(this.state.holeSelection === 0){
            return <HoleStats selection={1} games={games}/>
        } else {
            return <HoleStats selection={hole} games={games}/>
        }
    }

    render () {
        const games = this.props.player.games;
        return (
            <div className="stats">
                <table id="game-total-table">
                    <tr>
                        <th>Games Played:</th>
                        <td>{games.length}</td>
                    </tr>
                    <tr>
                        <th>Total Average:</th>
                        <td>{getStat(games, 'average').toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Personal Best:</th>
                        <td>{getStat(games, 'personal best')}</td>
                    </tr>
                    <tr>
                        <th>Personal Worst:</th>
                        <td>{getStat(games, 'personal worst')}</td>
                    </tr>
                    <tr>
                        <th>Games Under Par:</th>
                        <td>{getStat(games, 'under par')[0]} ({getStat(games, 'under par')[1]}%)</td>
                    </tr>
                    <tr>
                        <th>Games Over Par:</th>
                        <td>{getStat(games, 'over par')[0]} ({getStat(games, 'over par')[1]}%)</td>
                    </tr>
                    <tr>
                        <th>Most Ones:</th>
                        <td>{getStat(games, 'ones record')[0]} (Game {getStat(games, 'ones record')[1]})</td>
                    </tr>
                    <tr>
                        <th>Most Reds:</th>
                        <td>{getStat(games, 'reds record')[0]} (Game {getStat(games, 'reds record')[1]})</td>
                    </tr>
                    <tr>
                        <th>Hole Average:</th>
                        <td>{getStat(games, 'all holes average').toFixed(2)}</td>
                    </tr>
                </table>
                {checkForStackedAreaChart(games)}
            </div>
        )
    }
}
