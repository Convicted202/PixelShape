import test from 'blue-tape';
import sinon from 'sinon';

import { framesCollectionInitialState, defaults } from '../../src/reducers/frames/initialState';

import framesCollection from '../../src/reducers/frames/framesCollection';
import {
  addFrame,
  updateFrameImageData,
  duplicateFrame,
  updateFrameName,
  removeFrameData,
  resetFramesState
} from '../../src/actions/frames';

const initialState = framesCollectionInitialState();

const uuid = Object.keys(initialState)[0];

test('framesCollection =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = framesCollection(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = framesCollection(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::addFrame', (expect) => {
    const action = addFrame(32, 32),
          next = framesCollection(initialState, action);

    expect.equal(Object.keys(next).length, 2, 'Should add new frame');
    expect.equal(next[action.id].name, defaults.frameName + action.id, 'Should add name to a new frame');
    expect.ok(next[action.id].naturalImageData, 'Should create image data object for a new frame');
    expect.end();
  });

  expect.test('::updateFrameImageData', (expect) => {
    const action = updateFrameImageData(uuid, new ImageData(5, 5)),
          next = framesCollection(initialState, action);

    expect.deepEqual(next[uuid].naturalImageData, new ImageData(5, 5), 'Should update frames image data');
    expect.end();
  });

  expect.test('::duplicateFrame', (expect) => {
    const action = duplicateFrame(uuid),
          next = framesCollection(initialState, action);

    expect.deepEqual(next[uuid].naturalImageData, next[action.uuid].naturalImageData, 'Should duplicate image data to construct a new frame');
    expect.end();
  });

  expect.test('::updateFrameName', (expect) => {
    const action = updateFrameName(uuid, 'newborn'),
          next = framesCollection(initialState, action);

    expect.equal(next[uuid].name, 'newborn', 'Should change name of selected frame');
    expect.end();
  });

  expect.test('::removeFrameData', (expect) => {
    const action = removeFrameData(uuid),
          next = framesCollection(initialState, action);

    expect.false(next[uuid], 'Should remove frame entry');
    expect.end();
  });

  expect.test('::resetFramesState', (expect) => {
    const action = resetFramesState(uuid),
          next = framesCollection(initialState, action);

    expect.deepEqual(next, initialState, 'Should completely reset collection to initial');
    expect.end();
  });

  expect.end();
});
