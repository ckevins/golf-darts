import React from 'react';
import _, { get } from 'lodash';
import './Statistics.css'; 
import { nums } from '../GameInput/GameInput';
import { GamesLineChart } from '../LineChart/LineChart';

const totaller = (scores) => {
    const totalsArray = scores.map(array => {
        const total = array.reduce((a,b)=> a+b);
        return total;
        });
    return totalsArray
}

const getAverage = (scores) => {
    const totalSum = totaller(scores).reduce((a,b)=> a+b);
    const average = totalSum / scores.length;
    return average;
}

const getPersonalBest = (scores) => {
    const personalBest = Math.min(...totaller(scores));
    return personalBest;
}

const getPersonalWorst = (scores) => {
    const personalWorst = Math.max(...totaller(scores));
    return personalWorst;
} 

const getUnderParTotal = (scores) => {
    const gamesUnderPar = totaller(scores).filter(x => x < 72).length;
    return gamesUnderPar;
}

const getUnderParPercentage = (scores) => {
    return ((getUnderParTotal(scores)/scores.length)*100).toFixed(0);
}

const getOverParTotal = (scores) => {
    const gamesOverPar = totaller(scores).filter(x => x >= 72).length;
    return gamesOverPar;
}

const getOverParPercentage = (scores) => {
    return ((getOverParTotal(scores)/scores.length)*100).toFixed(0);
}

const getOnesRecord = (scores) => {
    const count = scores.map((game) => {
        return game.filter(x => x === 1).length
    });
    return Math.max(...count);
}

const getOnesRecordIndex = (scores) => {
    const count = scores.map((game) => {
        return game.filter(x => x === 1).length
    });
    return count.indexOf(Math.max(...count)) + 1;
}

const getRedsRecord = (scores) => {
    const count = scores.map((game) => {
        return game.filter(x => x < 4).length
    });
    return Math.max(...count);
}

const getRedsRecordIndex = (scores) => {
    const count = scores.map((game) => {
        return game.filter(x => x < 4).length
    });
    return count.indexOf(Math.max(...count)) + 1;
}

const getOnes = (scores) => {
    const count = scores.map((game) => {
        return game.filter(x => x === 1).length
    });
    const total = _.sum(count);
    return total;
}

const getTwos = (scores) => {
    const count = scores.map((game, i) => {
        return game.filter(x => x === 2).length
    });
    const total = _.sum(count);
    return total;
}

const getThrees = (scores) => {
    const count = scores.map((game, i) => {
        return game.filter(x => x === 3).length
    });
    const total = _.sum(count);
    return total;
}

const getFours = (scores) => {
    const count = scores.map((game, i) => {
        return game.filter(x => x === 4).length
    });
    const total = _.sum(count);
    return total;
}

const getFives = (scores) => {
    const count = scores.map((game, i) => {
        return game.filter(x => x === 5).length
    });
    const total = _.sum(count);
    return total;
}

const getSixes = (scores) => {
    const count = scores.map((game, i) => {
        return game.filter(x => x === 6).length
    });
    const total = _.sum(count);
    return total;
}

const getReds = (scores) => {
    const count = scores.map(game => {
        return game.filter(x => x < 4).length
    })
    const total = _.sum(count);
    return total;
}

const getBlues = (scores) => {
    const count = scores.map(game => {
        return game.filter(x => x >= 4).length
    })
    const total = _.sum(count);
    return total;
}

const getPercentage = (tally, scores) => {
    return (tally/(scores.length*18)) *100;
}

const getHoleStats = (hole, scores) => {
    const thisHoleScores = scores.map(game => game[hole-1]);
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
    console.log(averagesObjArray)
    const ranking = _.sortBy(averagesObjArray, ["average", "hole"]);
    console.log(ranking);
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

const getOverallHoleAvg = (scores) => {
    const avg = getAverage(scores);
    return (avg/18);
}

export class Statistics extends React.Component {
    render () {
        const scores = this.props.player.scores;
        return (
            <div className="stats">
                <h2>Game Total Statistics</h2> 
                <br></br>
                <p>Games Played: {scores.length}</p>
                <p>Total Score Average: {getAverage(scores).toFixed(2)}</p>
                <p>Personal Best: {getPersonalBest(scores)}</p>
                <p>Personal Worst: {getPersonalWorst(scores)}</p>
                <p>Games Under Par: {getUnderParTotal(scores)}, {getUnderParPercentage(scores)}% of games played</p>
                <p>Games Over Par: {getOverParTotal(scores)}, {getOverParPercentage(scores)}% of games played</p>
                <p>Most Ones in a single game: {getOnesRecord(scores)} (Game {getOnesRecordIndex(scores)})</p>
                <p>Most Red Scores in a single game: {getRedsRecord(scores)} (Game {getRedsRecordIndex(scores)})</p>
                <br></br>
                <GamesLineChart 
                    games={scores}/>
                <br></br>
                <h2>Total Hole Statistics</h2>
                <p>Overall Hole Average: {getOverallHoleAvg(scores).toFixed(2)}</p>
                <p>Turkeys: x</p>
                <table>
                    <tr>
                        <th></th>
                        <th>Ones</th>
                        <th>Twos</th>
                        <th>Threes</th>
                        <th>Fours</th>
                        <th>Fives</th>
                        <th>Sixes</th>
                        <th>Red Scores</th>
                        <th>Blue Scores</th>
                    </tr>
                    <tr>
                        <th>Total:</th>
                        <td>{getOnes(scores)}</td>
                        <td>{getTwos(scores)}</td>
                        <td>{getThrees(scores)}</td>
                        <td>{getFours(scores)}</td>
                        <td>{getFives(scores)}</td>
                        <td>{getSixes(scores)}</td>
                        <td>{getReds(scores)}</td>
                        <td>{getBlues(scores)}</td>
                    </tr>
                    <tr>
                        <th>Percentage:</th>
                        <td>{getPercentage(getOnes(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getTwos(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getThrees(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getFours(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getFives(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getSixes(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getReds(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getBlues(scores), scores).toFixed(1)}%</td>
                    </tr>
                </table>
                <h2>Individual Hole Statistics</h2>
                <table>
                    <tr>
                        <th>Best Hole</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>-</th>
                        <th>Worst Hole</th>
                    </tr>
                    <tr>
                        {getRankList(nums, scores)}
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Hole</th>
                        <th>Avg.</th>
                        <th>Ones</th>
                        <th>Twos</th>
                        <th>Threes</th>
                        <th>Fours</th>
                        <th>Fives</th>
                        <th>Sixes</th>
                    </tr>
                    {nums.map(hole => {
                        const holeArray = getHoleStats(hole, scores);
                        return (
                            <tr>
                                <th>{hole}</th>
                                <td className={checkClass(holeArray[0])}>{holeArray[0]}</td>
                                <td>{holeArray[1]}</td>
                                <td>{holeArray[2]}</td>
                                <td>{holeArray[3]}</td>
                                <td>{holeArray[4]}</td>
                                <td>{holeArray[5]}</td>
                                <td>{holeArray[6]}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}
