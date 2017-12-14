import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment';

import and from 'ramda/src/and';
import append from 'ramda/src/append';
import ascend from 'ramda/src/ascend';
import concat from 'ramda/src/concat';
import find from 'ramda/src/find';
import head from 'ramda/src/head';
import last from 'ramda/src/last';
import map from 'ramda/src/map';
import prop from 'ramda/src/prop';
import propEq from 'ramda/src/propEq';
import propOr from 'ramda/src/propOr';
import reduce from 'ramda/src/reduce';
import reverse from 'ramda/src/reverse';
import sortWith from 'ramda/src/sortWith';
import tail from 'ramda/src/tail';
import values from 'ramda/src/values';

const arrayOfMonths = (startYear, startMonth) => {
  let start = moment(`${startYear}-${startMonth}-01`);
  let end = moment().startOf('month');

  let builder = (list) => {
    let newMoment = moment(last(list)).add(1, 'months');

    if(newMoment.isBefore(end)) {
      return builder(append(newMoment, list));
    } else {
      return append(end, list);
    }
  }

  return builder([start]);
}

const findGeeklist = (date, geeklists) => {
  let year = date.year();
  let month = date.month() + 1; // moment uses 0 based months

  return find(geeklist => {
    return and(propEq('year', year, geeklist),
          propEq('month', month, geeklist));
  }, values(geeklists));
}

const getStat = (stat, date, geeklists) => {
  return propOr(0, stat, propOr({}, 'stats', findGeeklist(date, geeklists)));
}

const getData = (stats, geeklists) => {
  if(!geeklists || geeklists.length === 0) {
    return [];
  }

  let first = head(sortWith([ascend(prop('year')),
                             ascend(prop('month'))],
                            values(geeklists)));

  let months = arrayOfMonths(first.year, first.month);

  return map(date => {
    let obj = reduce((obj, key) => {
      return {
        ...obj,
        [key]: getStat(key, date, geeklists)
      };
    }, {}, stats);

    return {
      ...obj,
      name: date.format('MMM Y'),
    };
  }, months);
}

const capitalize = str => concat(head(str).toUpperCase(), tail(str));

class Chart extends Component {
  render() {
    let { stats, geeklists } = this.props;
    let data = getData(stats, geeklists);

    let lines = map(key => {
      let color = '#'+Math.floor(Math.random()*16777215).toString(16);
      return <Line key={key} name={capitalize(key)} type="monotone" dataKey={key} strokeWidth={3} stroke={color} activeDot={{r: 6}}/>;
    }, reverse(stats));

    return (
      <LineChart width={800} height={400} data={data}
                 margin={{top: 5, right: 30, left: 20, bottom: 5}}
                 padding={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis name="Months" dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        {lines}
      </LineChart>
    );
  }
}

export default Chart;
export { arrayOfMonths, findGeeklist, getStat };
