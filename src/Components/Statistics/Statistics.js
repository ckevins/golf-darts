import React from 'react';
import _ from 'lodash';
import './Statistics.css'; 

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

const getOnes = (scores) => {
    const count = scores.map((game, i) => {
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

export class Statistics extends React.Component {
    render () {
        const scores = this.props.player.scores;
        return (
            <div className="stats">
                <h2>Game Total Statistics</h2> 
                <br></br>
                <p>Games Played: {scores.length}</p>
                <p>Total Score Average: {getAverage(scores)}</p>
                <p>Personal Best: {getPersonalBest(scores)}</p>
                <p>Personal Worst: {getPersonalWorst(scores)}</p>
                <p>Games Under Par: {getUnderParTotal(scores)}, {getUnderParPercentage(scores)}% of games played</p>
                <p>Games Over Par: {getOverParTotal(scores)}, {getOverParPercentage(scores)}% of games played</p>
                <br></br>
                <h2>Total Hole Statistics</h2>
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
                        <th>Turkeys</th>
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
                        <td>?</td>
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
                        <td>n/a</td>
                    </tr>
                </table>
            </div>
        )
    }
}
