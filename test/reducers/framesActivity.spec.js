import test from 'blue-tape';
import sinon from 'sinon';

import { framesActivityInitialState } from '../../src/reducers/frames/initialState';

import framesActivity from '../../src/reducers/frames/framesActivity';
import {
  setCurrentFrame,
  removeFrameData,
  updateFrameGIFData,
  setFPS,
  resetFramesState
} from '../../src/actions/frames';

const initialState = framesActivityInitialState();

test('framesActivity =>', (expect) => {
  expect.test('::Initial state', (expect) => {
    const next = framesActivity(undefined, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return initialState on start');
    expect.end();
  });

  expect.test('::Unhandled action', (expect) => {
    const next = framesActivity(initialState, {
      type: 'RANDOM_ACTION',
      data: ''
    });

    expect.deepEqual(next, initialState, 'Should return same state');
    expect.end();
  });

  expect.test('::setCurrentFrame', (expect) => {
    expect.deepEqual(
      framesActivity({ activeFrame: 'frame_0' }, setCurrentFrame('frame_1')),
      { activeFrame: 'frame_1' },
      'Should set new active frame');
    expect.end();
  });

  expect.test('::removeFrameData', (expect) => {
    const next = framesActivity({ framesGifData: { frame_0: 'some data' } }, removeFrameData('frame_0'));

    expect.notOk(next.framesGifData['frame_0'], 'Should remove frame gif data by provided uuid');
    expect.end();
  });

  expect.test('::updateFrameGIFData', (expect) => {
    const next = framesActivity({ framesGifData: { frame_0: 'some data' } }, updateFrameGIFData('frame_0', 'some data'));

    expect.deepEqual(
      next,
      {
        framesGifData: { frame_0: 'some data' }
      },
      'Should update frames generated gif data');
    expect.end();
  });

  expect.test('::setFPS', (expect) => {
    expect.deepEqual(
      framesActivity({ fps: 2 }, setFPS(10)),
      { fps: 10 },
      'Should update gif fps value');
    expect.end();
  });

  expect.test('::resetFramesState', (expect) => {
    // console.log(initialState);
    // console.log(framesActivity({ framesGifData: { frame_0: 'some data' } }, resetFramesState()));
    expect.deepEqual(
      framesActivity({ framesGifData: { frame_0: 'some data' } }, resetFramesState()),
      initialState,
      'Should reset state to initial');
    expect.end();
  });

  expect.end();
});
