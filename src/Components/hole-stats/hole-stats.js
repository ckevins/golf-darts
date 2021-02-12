import React from 'react';
import './hole-stats.css';
import { getHoleStats } from '../statistics/statistics';
import { checkClass } from '../statistics/statistics';
import { HoleBarChart } from '../charts/hole-bar-chart/hole-bar-chart';
import { HolePieChart } from '../charts/hole-pie-chart/hole-pie-chart';

export class HoleStats extends React.Component {
    render () {
        const holeArray = getHoleStats(this.props.selection, this.props.games)
        return (
            <div>
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
    }
}