import React from 'react';
import './hole-stats.css'
import { getHoleStats } from '../statistics/statistics';
import { checkClass } from '../statistics/statistics';
import { HoleBarChart } from '../charts/hole-bar-chart';
import { HolePieChartSingle } from '../charts/hole-pie-chart-single';

export class HoleStats extends React.Component {
    render () {
        const holeArray = getHoleStats(this.props.selection, this.props.games)
        return (
            <div className='hole-stats'>
                <h3 className={checkClass(holeArray[0])}>Avg: {holeArray[0]}</h3>
                <div className='hole-charts'>
                    <HoleBarChart
                        ones={holeArray[1]}
                        twos={holeArray[2]}
                        threes={holeArray[3]} 
                        fours={holeArray[4]}
                        fives={holeArray[5]}
                        sixes={holeArray[6]}
                    />
                    <HolePieChartSingle
                        ones={holeArray[1]}
                        twos={holeArray[2]}
                        threes={holeArray[3]} 
                        fours={holeArray[4]}
                        fives={holeArray[5]}
                        sixes={holeArray[6]}
                    />
                </div>
            </div>
        )
    }
}