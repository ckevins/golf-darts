import React from 'react';
import _ from 'lodash';
import './statistics.css'; 
import { nums } from '../game-input/game-input';
import { GameStackedAreaChart } from '../charts/stacked-area-chart/stacked-area-chart';
import { HoleBarChart } from '../charts/hole-bar-chart/hole-bar-chart';
import { HolePieChart } from '../charts/hole-pie-chart/hole-pie-chart';

const totaller = (scores) => {
    const totalsArray = scores.map(array => {
        const total = array.reduce((a,b)=> a+b);
        return total;
        });
    return totalsArray
}

const getStat = (games, stat) => {
    const average = (totaller(games).reduce((a,b)=>a+b)) / games.length;
    switch(stat) {
        case 'average':
            return average
            break;
        case 'personal best':
            return Math.min(...totaller(games));
            break;
        case 'personal worst':
            return Math.max(...totaller(games));
            break;
        case 'under par':
            const gamesUnderPar = totaller(games).filter(x => x < 72).length;
            const underPercentage = ((gamesUnderPar / games.length) * 100).toFixed(0);
            return [gamesUnderPar, underPercentage];
            break;
        case 'over par':
            const gamesOverPar = totaller(games).filter(x => x >= 72).length;
            const overPercentage = ((gamesOverPar / games.length) * 100).toFixed(0);
            return [gamesOverPar, overPercentage];
            break;
        case 'ones record':
            const onesCounter = games.map(game => {
                return game.filter(x => x === 1).length
            });
            const onesRecord = Math.max(...onesCounter);
            const onesRecordGame = (onesCounter.indexOf(onesRecord)) + 1;
            return [onesRecord, onesRecordGame];
            break;
        case 'reds record':
            const redsCounter = games.map(game => {
                return game.filter(x => x < 4).length;
            });
            const redsRecord = Math.max(...redsCounter);
            const redsRecordGame = (redsCounter.indexOf(redsRecord)) + 1;
            return [redsRecord, redsRecordGame];
            break;
        case 'all holes average':
            return average/18;
            break;
        default:
            return
    }
}

const getThisScore = (games, scoreValue) => {
    switch (scoreValue) {
        case 'reds':
            const redCount = _.sum(games.map(game => game.filter(x => x < 4).length));
            const redPercentage = (redCount/(games.length*18)) * 100;
            return [redCount, redPercentage]
            break;
        case 'blues':
            const blueCount = _.sum(games.map(game => game.filter(x => x >= 4).length));
            const bluePercentage = (blueCount/(games.length*18)) * 100;
            return [blueCount, bluePercentage]
            break;
        default:
            const thisScoreCount = _.sum(games.map(game => game.filter(x => x === scoreValue).length));
            const thisScorePercentage = (thisScoreCount/(games.length*18)) * 100;
            return [thisScoreCount, thisScorePercentage]
    }
}

const getHoleStats = (hole, games) => {
    const thisHoleScores = games.map(game => game[hole-1]);
    const thisHoleAvg = (_.sum(thisHoleScores)/thisHoleScores.length).toFixed(2);
    const thisHoleOnes = thisHoleScores.filter(x => x === 1).length;
    const thisHoleTwos = thisHoleScores.filter(x => x === 2).length;
    const thisHoleThrees = thisHoleScores.filter(x => x === 3).length;
    const thisHoleFours = thisHoleScores.filter(x => x === 4).length;
    const thisHoleFives = thisHoleScores.filter(x => x === 5).length;
    const thisHoleSixes = thisHoleScores.filter(x => x === 6).length;
    const holeArray = [thisHoleAvg, thisHoleOnes, thisHoleTwos, thisHoleThrees, thisHoleFours, thisHoleFives, thisHoleSixes];
    return holeArray;
}

const getRankList = (nums, scores) => {
    const allHolesArray = nums.map(hole => getHoleStats(hole, scores));
    const averagesObjArray = allHolesArray.map((hole,i) => {
        const avg = hole[0];
        return {
            "average": avg, 
            "hole": i+1
        }
    });
    const ranking = _.sortBy(averagesObjArray, ["average", "hole"]);
    return ranking.map(rank => {
        return <td>{rank.hole}</td>;
    });
}

const checkClass = (holeScore) => {
    if (holeScore < 4) {
        return "red"
    } else {
        return "blue"
    }
}

//StackedAreaChart looks dumb if only one score is saved; this makes sure that it only shows with more than one.
const checkForStackedAreaChart = (games) => {
    if(games.length > 1) {
        return (
            <div className="stacked-area-chart">
                <GameStackedAreaChart 
                games={games}/>
            </div>
        )
    } else {
        return
    }
}

export class Statistics extends React.Component {
    render () {
        const games = this.props.player.games;
        return (
            <div className="stats">
                <table id="gameTotalTable">
                    <tr>
                        <th>Games Played:</th>
                        <td>{games.length}</td>
                    </tr>
                    <tr>
                        <th>Total Score Average:</th>
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
                        <th>Overall Hole Average:</th>
                        <td>{getStat(games, 'all holes average').toFixed(2)}</td>
                    </tr>
                </table>
                {checkForStackedAreaChart(games)}
                <table>
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
                </table>
                <HolePieChart
                    ones={getThisScore(games,1)[0]}
                    twos={getThisScore(games,2)[0]}
                    threes={getThisScore(games,3)[0]} 
                    fours={getThisScore(games,4)[0]}
                    fives={getThisScore(games,5)[0]}
                    sixes={getThisScore(games,6)[0]}
                />
                <table>
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
                {nums.map(hole => {
                    const holeArray = getHoleStats(hole, games);
                    return (
                        <div>
                            <h3>Hole {hole}</h3>
                            <h4 className={checkClass(holeArray[0])}>Avg: {holeArray[0]}</h4>
                            <HoleBarChart
                                className="bar-chart"
                                ones={holeArray[1]}
                                twos={holeArray[2]}
                                threes={holeArray[3]} 
                                fours={holeArray[4]}
                                fives={holeArray[5]}
                                sixes={holeArray[6]}
                            />
                            <HolePieChart
                                ones={holeArray[1]}
                                twos={holeArray[2]}
                                threes={holeArray[3]} 
                                fours={holeArray[4]}
                                fives={holeArray[5]}
                                sixes={holeArray[6]}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}
