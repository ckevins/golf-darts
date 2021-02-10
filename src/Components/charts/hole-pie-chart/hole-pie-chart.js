import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell,
} from 'recharts';

const holeData = (ones, twos, threes, fours, fives, sixes) => {
    return [
      {name: 'Ones', tally: ones},
      {name: 'Twos', tally: twos},
      {name: 'Threes', tally: threes},
      {name: 'Fours', tally: fours},
      {name: 'Fives', tally: fives},
      {name: 'Sixes', tally: sixes}
    ]
  }

const COLORS = ['#e3322b','#ff706b', '#ffbcba', '#aadeeb', '#02b8e6', '#0032e6'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} fontSize={"0.6em"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export class HolePieChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    const ones = this.props.ones;
    const twos = this.props.twos;
    const threes = this.props.threes;
    const fours = this.props.fours;
    const fives = this.props.fives;
    const sixes = this.props.sixes;
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={holeData(ones,twos,threes,fours,fives,sixes)}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="tally"
        >
          {
            holeData(ones,twos,threes,fours,fives,sixes).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  }
}
