import test from 'blue-tape';
import sinon from 'sinon';

import tools from 'reducers/tools';
import {
  setTool,
  setColor,
  setSize
} from 'actions/tools';

const initialState = {
  tool: 'Brush',
  color: '#1B2631',
  size: 1
};

test('tools =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = tools(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = tools(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::addColor', (expect) => {
    expect.deepEqual(
      tools({ tool: 'Brush' }, setTool('Eraser')),
      { tool: 'Eraser' },
      'Should set new tool');
    expect.end();
  });

  expect.test('::setColor', (expect) => {
    expect.deepEqual(
      tools({ color: '#1B2631' }, setColor('#efefef')),
      { color: '#efefef' },
      'Should set new active color');
    expect.end();
  });

  expect.test('::setSize', (expect) => {
    expect.deepEqual(
      tools({ size: 1 }, setSize(5)),
      { size: 5 },
      'Should set new tool size');
    expect.end();
  });

  expect.end();
});
