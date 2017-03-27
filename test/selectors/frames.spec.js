import test from 'blue-tape';
import sinon from 'sinon';

import {
  getFrames,
  getGifFramesData,
  getModifiedFramesArray,
  getFPS,
  getCurrentFrameUUID,
  getCurrentFrame,
  getAllFrames,
  getFramesOrder,
  getCurrentFrameName,
  getFramesAmount,
  getCurrentFrameIndex,
  getPreviousFrameUUID,
  getNextFrameUUID
} from '../../src/selectors/frames';

import {
  framesOrderInitialState,
  framesCollectionInitialState,
  framesActivityInitialState
} from '../../src/reducers/frames/initialState';

const state = {
  undoables: {
    present: {
      frames: {
        activity: framesActivityInitialState(),
        collection: framesCollectionInitialState(),
        order: framesOrderInitialState()
      }
    }
  }
};

const uuid = state.undoables.present.frames.order.framesOrderArray[0];

test('frames =>', (expect) => {
  expect.test('::getFrames', (expect) => {
    const next = getFrames(state);

    expect.deepEqual(next, state.undoables.present.frames, 'Should return substate with frames only');
    expect.end();
  });

  expect.test('::getGifFramesData', (expect) => {
    const next = getGifFramesData(state);

    expect.deepEqual(next, {}, 'Should return current generated gif data');
    expect.end();
  });

  expect.test('::getModifiedFramesArray', (expect) => {
    const next = getModifiedFramesArray(state);

    expect.deepEqual(next, [{ [uuid]: 0 }], 'Should return current array of modified frames in prescribed pattern');
    expect.end();
  });

  expect.test('::getFPS', (expect) => {
    const next = getFPS(state);

    expect.equal(next, 2, 'Should return current fps');
    expect.end();
  });

  expect.test('::getCurrentFrameUUID', (expect) => {
    const next = getCurrentFrameUUID(state);

    expect.equal(next, uuid, 'Should return current active frame');
    expect.end();
  });

  expect.test('::getCurrentFrame', (expect) => {
    const next = getCurrentFrame(state);

    expect.ok(next.name && next.naturalImageData, 'Should contain frame specific information in collection');
    expect.end();
  });

  expect.test('::getAllFrames', (expect) => {
    const next = getAllFrames(state);

    expect.deepEqual(Object.keys(next), [ uuid ], 'Should return all frames');
    expect.end();
  });

  expect.test('::getFramesOrder', (expect) => {
    const next = getFramesOrder(state);

    expect.deepEqual(next, [ uuid ], 'Should return all ordered frames');
    expect.end();
  });

  expect.test('::getCurrentFrameName', (expect) => {
    const next = getCurrentFrameName(state);

    expect.equal(next, 'default_0', 'Should return current frame name');
    expect.end();
  });

  expect.test('::getFramesAmount', (expect) => {
    const next = getFramesAmount(state);

    expect.equal(next, 1, 'Should return frames count');
    expect.end();
  });

  expect.test('::getCurrentFrameIndex', (expect) => {
    const next = getCurrentFrameIndex(state);

    expect.equal(next, 0, 'Should return current frame index');
    expect.end();
  });

  expect.test('::getPreviousFrameUUID', (expect) => {
    const next = getPreviousFrameUUID(state);

    expect.equal(next, uuid, 'Should return previous frame UUID, or self if no previous exists');
    expect.end();
  });

  expect.test('::getNextFrameUUID', (expect) => {
    const next = getNextFrameUUID(state);

    expect.equal(next, uuid, 'Should return next frame UUID, or self if no previous exists');
    expect.end();
  });

  expect.end();
});
