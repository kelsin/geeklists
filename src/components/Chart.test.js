import { arrayOfMonths, findGeeklist, getStat } from './Chart';
import moment from 'moment';
import timekeeper from 'timekeeper';
import zip from 'ramda/src/zip';
import all from 'ramda/src/zip';

var now = moment('2017-02-01');
timekeeper.freeze(now.toDate());

var start = moment('2016-10-01');

let one = { year: 2017, month: 1, stats: { field: 5 } };
let two = { year: 2017, month: 2, stats: { field: 6 } };

var expected = [
  start,
  moment(start).add(1, 'month'),
  moment(start).add(2, 'month'),
  moment(start).add(3, 'month'),
  moment(start).add(4, 'month')
];

it('arrayOfMonths should return an array of dates', () => {
  let result = arrayOfMonths(2016, 10);

  let isSame = all(([a, b]) => a.isSame(b),
                   zip(result, expected));

  expect(isSame).toBeTruthy();

  timekeeper.reset();
});

it('findGeeklist should find the right geeklist', () => {

  expect(findGeeklist(now, {one,two})).toEqual(two);
});

it('getStat should return the proper stat', () => {
  expect(getStat('field', now, { one, two })).toEqual(6);
});
