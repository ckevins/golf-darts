import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const colors = ['#e3322b','#e3322b','#e3322b','#aadeeb','#aadeeb','#aadeeb' ]

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

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export class HoleBarChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

  render() {
    const ones = this.props.ones;
    const twos = this.props.twos;
    const threes = this.props.threes;
    const fours = this.props.fours;
    const fives = this.props.fives;
    const sixes = this.props.sixes;
    return (
      <BarChart
        width={1000}
        height={400}
        data={holeData(ones,twos,threes,fours,fives,sixes)}
        margin={{
          top: 50, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="tally" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {
            holeData(ones,twos,threes,fours,fives,sixes).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Bar>
      </BarChart>
    );
  }
}
