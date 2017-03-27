import test from 'blue-tape';
import sinon from 'sinon';
import { StateConverter } from '../../src/statemanager/StateConverter';

let state = {
  undoables: {
    present: {
      application: {
        projectGuid: 'abc',
        size: {
          width: 1,
          height: 1
        }
      },
      frames: {
        activity: {
          activeFrame: 'unique0',
          fps: 10
        },
        order: {
          framesOrderArray: ['unique0'],
          modifiedFramesArray: ''
        },
        collection: {
          unique0: {
            name: 'default_0',
            naturalImageData: {
              data: new Uint8ClampedArray([32, 64, 128, 255]),
              width: 1,
              height: 1
            }
          }
        }
      }
    }
  }
}

let converted = {
  guid: 'abc',
  active: 'unique0',
  size: {
    width: 1,
    height: 1
  },
  fps: 10,
  order: ['unique0'],
  frames: {
    unique0: {
      name: 'default_0',
      naturalImageData: {
        // hardcoded; taken from deflate compression of [32, 64, 128, 255] Uint8Array
        data: [ 120, 156, 83, 112, 104, 248, 15, 0, 3, 67, 1, 224 ],
        width: 1,
        height: 1
      }
    }
  }
};

test('StateConverter =>', (expect) => {
  expect.test('::convertToExport', (expect) => {

    let newState = StateConverter.convertToExport(state);

    expect.ok(newState.meta.schemaVersion && newState.app, 'Sould create meta and app entries in converted state');
    expect.deepEqual(newState.app, converted, 'Should convert state to a serializable');
    expect.end();
  });

  expect.test('::convertToImport', (expect) => {

    let newState = StateConverter.convertToImport({app: converted});

    newState.undoables.present.application.projectGuid = 'abc';
    newState.undoables.present.frames.order.modifiedFramesArray = '';

    expect.deepEqual(newState, state, 'Should deserialize converted state to aplicable to redux');
    expect.end();
  });

  expect.test('::createStateFromFramesData', (expect) => {

    let newState = StateConverter.createStateFromFramesData(
      [{
        data: new ImageData(new Uint8ClampedArray([32, 64, 128, 255]), 1, 1),
        delay: 13
      }],
      10,
      1,
      1
    );

    newState.undoables.present.application.projectGuid = 'abc';
    newState.undoables.present.frames.order.modifiedFramesArray = '';

    expect.deepEqual(newState, state, 'Should convert frame data to a state aplicable to redux');
    expect.end();
  });

  expect.end();
});
