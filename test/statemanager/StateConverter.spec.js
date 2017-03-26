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
          activeFrame: 'xyz',
          fps: 10
        },
        order: {
          framesOrderArray: ['a1'],
          modifiedFramesArray: ''
        },
        collection: {
          a1: {
            naturalImageData: {
              data: new Uint8ClampedArray([0, 0, 0, 0]),
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
  active: 'xyz',
  size: {
    width: 1,
    height: 1
  },
  fps: 10,
  order: ['a1'],
  frames: {
    a1: {
      naturalImageData: {
        data: [0, 0, 0, 0],
        width: 1,
        height: 1
      }
    }
  }
}

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

  expect.end();
});
