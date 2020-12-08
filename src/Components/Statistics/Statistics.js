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

export class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <div>
                <h1>Game Total Statistics</h1>
                <p>Total Score Average: {getAverage(this.props.player.scores)}</p>
                <p>Personal Best: {getPersonalBest(this.props.player.scores)}</p>
            </div>
        )
    }
}
