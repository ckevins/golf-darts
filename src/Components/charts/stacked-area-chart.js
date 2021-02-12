import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import './charts.css';

const gameData = (games) => {
    const data = games.map((game, i) => {
        const gameNum = i + 1;
        const ones = game.filter(x => x === 1).length;
        const reds = game.filter(x => x < 4).length;
        const blues = game.filter(x => x >= 4).length;
        const sixes = game.filter(x => x === 6).length;
        const singleGameDataObj = {
            name: `G${gameNum}`,
            Ones: ones,
            Reds: reds-ones,
            Blues: blues-sixes,
            Sixes: sixes
        };
        return singleGameDataObj;
    });
    return data
} 


export class GameStackedAreaChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c1rLyqj1/';

  render() {
    return (
      <AreaChart
        className='area-chart'
        width={1200}
        height={400}
        data={gameData(this.props.games)}
        margin={{
            top: 30, right: 50, left: 50, bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} stroke="#ffffff"/>
        <YAxis tickLine={false} stroke="#ffffff" domain={[0,18]} tickCount={8}/>
        <Tooltip />
        <Area type="linear" dataKey="Ones" stackId="1" stroke="#e3322b" fill="#e3322b" />
        <Area type="linear" dataKey="Reds" stackId="1" stroke="#ffbcba" fill="#ffbcba" />
        <Area type="linear" dataKey="Blues" stackId="1" stroke="#aadeeb" fill="#aadeeb" />
        <Area type="linear" dataKey="Sixes" stackId="1" stroke="#0032e6" fill="#0032e6" />
      </AreaChart>
    );
  }
}
