import test from 'blue-tape';
import {
  getType,
  isObject,
  isArray,
  copyObj
} from '../../src/utils/helpers';

test('Helpers =>', (expect) => {
  expect.test('::getType', (expect) => {
    expect.equal(getType({}), 'Object', 'Should get type of an Object');
    expect.equal(getType([]), 'Array', 'Should get type of an Array');
    expect.equal(getType(1), 'Number', 'Should get type of a Number');
    expect.equal(getType('foo'), 'String', 'Should get type of a String');
    expect.equal(getType(true), 'Boolean', 'Should get type of a Boolean')
    expect.end();
  });

  expect.test('::isObject', (expect) => {
    expect.ok(isObject({}) && !isObject([]), 'Should get type of an Object');
    expect.end();
  });

  expect.test('::isArray', (expect) => {
    expect.ok(isArray([]) && !isArray({}), 'Should get type of an Array');
    expect.end();
  });

  expect.test('::copyObj', (expect) => {
    const obj = {
      a: {
        b: ['a', 'b'],
        c: {
          d: 1
        }
      }
    };

    expect.deepEqual(copyObj(obj), obj, 'Should deep copy an object');
    expect.end();
  });

  expect.end();
});
