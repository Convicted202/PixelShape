import test from 'blue-tape';
import sinon from 'sinon';

import palette from 'reducers/palette';
import {
  addColor,
  setTempColor,
  resetUserColors
} from 'actions/palette';

const initialState = {
  tempColor: '',
  colors: []
};

test('palette =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = palette(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = palette(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::addColor', (expect) => {
    expect.deepEqual(
      palette({ colors: [] }, addColor('#efefef')),
      { colors: [{color:'#efefef'}] },
      'Should add a new color to the list');
    expect.end();
  });

  expect.test('::setTempColor', (expect) => {
    expect.deepEqual(
      palette({ tempColor: null }, setTempColor('#efefef')),
      { tempColor: '#efefef' },
      'Should set intermidiate color');
    expect.end();
  });

  expect.test('::resetUserColors', (expect) => {
    expect.deepEqual(
      palette({ colors: [], tempColor: '#000000' }, resetUserColors()),
      initialState,
      'Should be able to reset state');
    expect.end();
  });

  expect.end();
});
