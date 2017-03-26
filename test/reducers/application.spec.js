import test from 'blue-tape';
import sinon from 'sinon';

import application from '../../src/reducers/application';
import {
  updateSize,
  setSurfaceConstraints,
  setExpandAnchor,
  toggleResetPalette,
  toggleGrid,
  toggleStretch,
  toggleIncludeGif,
  toggleIncludeSpritesheet,
  toggleIncludeProject,
  toggleIncludePalette
} from '../../src/actions/application';

const initialState = {
  projectGuid: 'guid',
  size: {
    width: 32,
    height: 32
  },
  pixelSize: 20,
  optimalPixelSize: 20,
  surfaceConstraints: {
    width: 2000,
    height: 2000
  },
  resetPalette: false,
  grid: false,
  stretch: false,
  anchor: 'oo',
  downloadOptions: {
    includeGif: true,
    includeSpritesheet: true,
    includeProject: true,
    includePalette: true
  }
};

test('application =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = application(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    next.projectGuid = 'guid';

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = application(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::updateSize', (expect) => {
    const next = application(initialState, updateSize(20, 20));

    expect.deepEqual(next.size, { width: 20, height: 20 }, 'Should update app image size');
    expect.end();
  });

  expect.test('::setSurfaceConstraints', (expect) => {
    const next = application(initialState, setSurfaceConstraints(620, 440));

    expect.equal(next.pixelSize, 10, 'Should update pixel size on constraints change');
    expect.deepEqual(next.surfaceConstraints, { width: 620, height: 440 }, 'Should update drawing area constraints');
    expect.end();
  });

  expect.test('::toggleResetPalette', (expect) => {
    const next = application(initialState, toggleResetPalette());

    expect.ok(next.resetPalette, 'Should toggle resetPalette toggle');
    expect.end();
  });

  expect.test('::toggleGrid', (expect) => {
    const next = application(initialState, toggleGrid());

    expect.ok(next.grid, 'Should toggle grid toggle');
    expect.end();
  });

  expect.test('::toggleStretch', (expect) => {
    const next = application(initialState, toggleStretch());

    expect.ok(next.stretch, 'Should toggle stretch toggle');
    expect.end();
  });

  expect.test('::setExpandAnchor', (expect) => {
    const next = application(initialState, setExpandAnchor('NE'));

    expect.equal(next.anchor,'NE', 'Should set new stretching anchor');
    expect.end();
  });

  expect.test('::toggleIncludeGif', (expect) => {
    const next = application(initialState, toggleIncludeGif());

    expect.false(next.downloadOptions.includeGif, 'Should toggle includeGif toggle');
    expect.end();
  });

  expect.test('::toggleIncludeSpritesheet', (expect) => {
    const next = application(initialState, toggleIncludeSpritesheet());

    expect.false(next.downloadOptions.includeSpritesheet, 'Should toggle includeSpritesheet toggle');
    expect.end();
  });

  expect.test('::toggleIncludeProject', (expect) => {
    const next = application(initialState, toggleIncludeProject());

    expect.false(next.downloadOptions.includeProject, 'Should toggle includeProject toggle');
    expect.end();
  });

  expect.test('::toggleIncludePalette', (expect) => {
    const next = application(initialState, toggleIncludePalette());

    expect.false(next.downloadOptions.includePalette, 'Should toggle includePalette toggle');
    expect.end();
  });

  expect.end();
});
