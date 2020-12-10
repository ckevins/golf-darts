import React from 'react';
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

export class Statistics extends React.Component {
    render () {
        const scores = this.props.player.scores;
        return (
            <div className="stats">
                <h2>Game Total Statistics</h2> 
                <p>Games Played: {scores.length}</p>
                <p>Total Score Average: {getAverage(scores)}</p>
                <p>Personal Best: {getPersonalBest(scores)}</p>
                <p>Personal Worst: {getPersonalWorst(scores)}</p>
                <p>Games Under Par: {getUnderParTotal(scores)}</p>
                <p>Games Under Par %: {getUnderParPercentage(scores)}%</p>
                <p>Games Over Par: {getOverParTotal(scores)}</p>
                <p>Games Over Par %: {getOverParPercentage(scores)}%</p>
            </div>
        )
    }
}
