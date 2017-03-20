import test from 'blue-tape';
import sinon from 'sinon';

import {
  getTool,
  getToolSettings,
  getCurrentColor
} from '../../src/selectors/tools';

const state = {
  tools: {
    tool: 'Brush',
    color: '#1B2631',
    size: 1
  }
};

test('tools =>', (expect) => {
  expect.test('::getTool', (expect) => {
    const next = getTool(state);

    expect.equal(next, 'Brush', 'Should return current selected tool name');
    expect.end();
  });

  expect.test('::getToolSettings', (expect) => {
    const next = getToolSettings(state);

    expect.deepEqual(next, state.tools, 'Should return current selected tool');
    expect.end();
  });

  expect.test('::getCurrentColor', (expect) => {
    const next = getCurrentColor(state);

    expect.equal(next, '#1B2631', 'Should return current tool color');
    expect.end();
  });

  expect.end();
});
