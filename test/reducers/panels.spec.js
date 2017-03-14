import test from 'blue-tape';
import sinon from 'sinon';

import panels from '../../src/reducers/panels';
import {
  toggleToolbar,
  toggleSidebar,
  toggleFramebar
} from '../../src/actions/panels';

const initialState = {
  toolbar: true,
  sidebar: true,
  framebar: true
};

test('panels =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = panels(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = panels(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::Toggle toolbar', (expect) => {
    expect.deepEqual(panels({ toolbar: false }, toggleToolbar()), { toolbar: true }, 'Should toggle toolbar to true');
    expect.deepEqual(panels({ toolbar: true }, toggleToolbar()), { toolbar: false }, 'Should toggle toolbar to false');
    expect.end();
  });

  expect.test('::Toggle sidebar', (expect) => {
    expect.deepEqual(panels({ sidebar: false }, toggleSidebar()), { sidebar: true }, 'Should toggle sidebar to true');
    expect.deepEqual(panels({ sidebar: true }, toggleSidebar()), { sidebar: false }, 'Should toggle sidebar to false');
    expect.end();
  });

  expect.test('::Toggle framebar', (expect) => {
    expect.deepEqual(panels({ framebar: false }, toggleFramebar()), { framebar: true }, 'Should toggle framebar to true');
    expect.deepEqual(panels({ framebar: true }, toggleFramebar()), { framebar: false }, 'Should toggle framebar to false');
    expect.end();
  });

  expect.end();
});
