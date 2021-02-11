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

//StackedAreaChart looks dumb if only one score is saved; this makes sure that it only shows with more than one.
const checkForStackedAreaChart = (scores) => {
    if(scores.length > 1) {
        return (
            <div className="stacked-area-chart">
                <GameStackedAreaChart 
                games={scores}/>
            </div>
        )
    } else {
        return
    }
}

export class Statistics extends React.Component {
    render () {
        const scores = this.props.player.games;
        return (
            <div className="stats">
                <table id="gameTotalTable">
                    <tr>
                        <th>Games Played:</th>
                        <td>{scores.length}</td>
                    </tr>
                    <tr>
                        <th>Total Score Average:</th>
                        <td>{getAverage(scores).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Personal Best:</th>
                        <td>{getPersonalBest(scores)}</td>
                    </tr>
                    <tr>
                        <th>Personal Worst:</th>
                        <td>{getPersonalWorst(scores)}</td>
                    </tr>
                    <tr>
                        <th>Games Under Par:</th>
                        <td>{getUnderParTotal(scores)} ({getUnderParPercentage(scores)}%)</td>
                    </tr>
                    <tr>
                        <th>Games Over Par:</th>
                        <td>{getOverParTotal(scores)} ({getOverParPercentage(scores)}%)</td>
                    </tr>
                    <tr>
                        <th>Most Ones:</th>
                        <td>{getOnesRecord(scores)} (Game {getOnesRecordIndex(scores)})</td>
                    </tr>
                    <tr>
                        <th>Most Reds:</th>
                        <td>{getRedsRecord(scores)} (Game {getRedsRecordIndex(scores)})</td>
                    </tr>
                    <tr>
                        <th>Overall Hole Average:</th>
                        <td>{getOverallHoleAvg(scores).toFixed(2)}</td>
                    </tr>
                </table>
                {checkForStackedAreaChart(scores)}
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
                        <td>{getOnes(scores)}</td>
                        <td>{getTwos(scores)}</td>
                        <td>{getThrees(scores)}</td>
                        <td>{getFours(scores)}</td>
                        <td>{getFives(scores)}</td>
                        <td>{getSixes(scores)}</td>
                    </tr>
                    <tr>
                        <th>Percentage:</th>
                        <td>{getPercentage(getOnes(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getTwos(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getThrees(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getFours(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getFives(scores), scores).toFixed(1)}%</td>
                        <td>{getPercentage(getSixes(scores), scores).toFixed(1)}%</td>
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
                        <td>{getReds(scores)}</td>
                        <td>
                        </td>
                        <td></td>
                        <td>{getBlues(scores)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Percentage:</td>
                        <td></td>
                        <td>{getPercentage(getReds(scores), scores).toFixed(1)}%</td>
                        <td></td>
                        <td></td>
                        <td>{getPercentage(getBlues(scores), scores).toFixed(1)}%</td>
                        <td></td>
                    </tr>
                </table>
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
                        {getRankList(nums, scores)}
                    </tr>
                </table>
                {nums.map(hole => {
                    const holeArray = getHoleStats(hole, scores);
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
