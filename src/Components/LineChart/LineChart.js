import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './LineChart.css';

const gameData = (games) => {
    const data = games.map((game, i) => {
        const gameNum = i + 1;
        const ones = game.filter(x => x === 1).length;
        const reds = game.filter(x => x < 4).length;
        const blues = game.filter(x => x >= 4).length;
        const sixes = game.filter(x => x === 6).length;
        const singleGameDataObj = {
            name: `Game ${gameNum}`,
            Ones: ones,
            Reds: reds,
            Blues: blues,
            Sixes: sixes
        };
        return singleGameDataObj;
    });
    return data
} 

export class GamesLineChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <LineChart
        width= {1500}
        height={500}
        data={gameData(this.props.games)}
        margin={{
          top: 30, right: 50, left: 50, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#ffffff"/>
        <YAxis stroke="#ffffff" />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="Ones" stroke="#e3322b" strokeWidth='5' />
        <Line type="linear" dataKey="Reds" stroke="#e3322b" strokeWidth='2'/>
        <Line type="linear" dataKey="Blues" stroke="#aadeeb" strokeWidth='2'/>
        <Line type="linear" dataKey="Sixes" stroke="#aadeeb" strokeWidth='5' />
      </LineChart>
    );
  }
}
