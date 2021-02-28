import React from 'react';
import './statistics.css';
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

export class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            holeSelection: 0
        };
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
        const hole = nums[this.state.holeSelection];
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
                <table id='rank-list-table'>
                    <tr>
                        <th>Best Hole</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8592;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>&#8594;</th>
                        <th>Worst Hole</th>
                    </tr>
                    <tr>
                        {getRankList(nums, games)}
                    </tr>
                </table>
                <h3>Hole:</h3>
                <select name="holes" id="hole-select" onChange={this.selectHole} value={this.state.selection}>
                    <option value={0}>1</option>
                    {numsSkipOne.map((holeNumber, i)=> <option value={i+1}>{holeNumber}</option>)}
                </select>
                {this.checkHoleSelection(hole, games)}
            </div>
        )
    }
}
