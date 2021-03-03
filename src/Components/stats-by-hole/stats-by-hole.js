import React from 'react';
import { nums,
    numsSkipOne,
    getRankList} from '../stat-math';
import { HoleStats } from '../hole-stats/hole-stats';


export class StatsByHole extends React.Component {
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
                <br></br>
                <h3>Hole:</h3>
                <select name="holes" id="hole-select" onChange={this.selectHole} value={this.state.selection}>
                    <option value={0}>1</option>
                    {numsSkipOne.map((holeNumber, i)=> <option value={i+1}>{holeNumber}</option>)}
                </select>
                {this.checkHoleSelection(hole, games)}
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
            </div>
        )
    }
}
