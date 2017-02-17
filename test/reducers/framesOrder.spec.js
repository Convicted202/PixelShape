import test from 'blue-tape';
import sinon from 'sinon';

import { framesOrderInitialState } from '../importStubs/framesInitialState.stub';

import framesOrder from '../../src/reducers/frames/framesOrder';
import {
  addFrame,
  updateFrameImageData,
  moveFrameRight,
  moveFrameLeft,
  duplicateFrame,
  removeFrameData,
  setFPS,
  updateFramesSize,
  resetFramesState
} from '../../src/actions/frames';

const initialState = framesOrderInitialState();

test('framesOrder =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = framesOrder(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = framesOrder(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::addFrame', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0'] }, addFrame('frame_1')),
      {
        framesOrderArray: ['frame_0', 'frame_1'],
        modifiedFramesArray: [{ frame_0: 0 }, { frame_1: 1 }]
      },
      'Should append a new frame uuid to the end');
    expect.end();
  });

  expect.test('::updateFrameImageData', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0'] }, updateFrameImageData('frame_0')),
      {
        framesOrderArray: ['frame_0'],
        modifiedFramesArray: [{ frame_0: 0 }]
      },
      'Should create new modifiedFramesArray based on changed frame data');
    expect.end();
  });

  expect.test('::moveFrameRight', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0'] }, moveFrameRight('frame_0')),
      { framesOrderArray: ['frame_0'] },
      'Should do nothing when it is the last frame in the list');

    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1', 'frame_2', 'frame_3'] }, moveFrameRight('frame_1')),
      {
        framesOrderArray: ['frame_0', 'frame_2', 'frame_1', 'frame_3'],
        modifiedFramesArray: [{ frame_2: 1 }, { frame_1: 2 }]
      },
      'Should move frame to the right and create modifiedFramesArray with current and next frames');
    expect.end();
  });

  expect.test('::moveFrameLeft', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0'] }, moveFrameLeft('frame_0')),
      { framesOrderArray: ['frame_0'] },
      'Should do nothing when it is the first frame in the list');

    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1', 'frame_2', 'frame_3'] }, moveFrameLeft('frame_2')),
      {
        framesOrderArray: ['frame_0', 'frame_2', 'frame_1', 'frame_3'],
        modifiedFramesArray: [{ frame_2: 1 }, { frame_1: 2 }]
      },
      'Should move frame to the left and create modifiedFramesArray with current and previous frames');
    expect.end();
  });

  expect.test('::duplicateFrame', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1'] }, duplicateFrame('frame_0')),
      {
        framesOrderArray: ['frame_0', 'frame_2', 'frame_1'],
        modifiedFramesArray: [{ frame_0: 0 }, { frame_2: 1 }]
      },
      'Should insert a new frame in the list and create modifiedFramesArray with current and inserted frames');
    expect.end();
  });

  expect.test('::removeFrameData', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0'] }, removeFrameData('frame_0')),
      { framesOrderArray: ['frame_0'] },
      'Should do nothing when it is the only frame in the list');

    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1'] }, removeFrameData('frame_1')),
      {
        framesOrderArray: ['frame_0'],
        modifiedFramesArray: [{ frame_0: 0 }]
      },
      'Should remove frame and create modifiedFramesArray with previous frame if current was last in the list');

    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1'] }, removeFrameData('frame_0')),
      {
        framesOrderArray: ['frame_1'],
        modifiedFramesArray: [{ frame_1: 0 }]
      },
      'Should remove frame and create modifiedFramesArray with next frame if current was not last in the list');
    expect.end();
  });

  expect.test('::setFPS, ::updateFramesSize', (expect) => {
    const expected = {
      framesOrderArray: ['frame_0', 'frame_1'],
      modifiedFramesArray: [{ frame_0: 0 }, { frame_1: 1 }]
    };

    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1'] }, updateFramesSize()),
      expected,
      'Should mark all frames as modified when image size changes'
    );

    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1'] }, setFPS(10)),
      expected,
      'Should mark all frames as modified when fps changes');
    expect.end();
  });

  expect.test('::resetFramesState', (expect) => {
    expect.deepEqual(
      framesOrder({ framesOrderArray: ['frame_0', 'frame_1'] }, resetFramesState()),
      initialState,
      'Should reset state to initial'
    );
    expect.end();
  });

  expect.end();
});
