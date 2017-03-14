import test from 'blue-tape';
import Immutable from '../../src/utils/immutableArray';

let arr, iarr;

const before = () => {
  arr = [1, 2, 3];
  iarr = [];
};

test('Immutable Array =>', (expect) => {
  expect.test('::push', (expect) => {
    before();
    iarr = Immutable.push(arr, 4);
    expect.deepEqual(iarr, [1, 2, 3, 4], 'Should be able to push a value into an array');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::pop', (expect) => {
    before();
    iarr = Immutable.pop(arr);
    expect.deepEqual(iarr, [1, 2], 'Should be able to pop a value from an array');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::shift', (expect) => {
    before();
    iarr = Immutable.shift(arr);
    expect.deepEqual(iarr, [2, 3], 'Should be able to shift a value from an array');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::unshift', (expect) => {
    before();
    iarr = Immutable.unshift(arr, 0);
    expect.deepEqual(iarr, [0, 1, 2, 3], 'Should be able to unshift a value into an array');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::remove', (expect) => {
    before();
    iarr = Immutable.remove(arr, 1);
    expect.deepEqual(iarr, [1, 3], 'Should be able to remove a value from an array');
    iarr = Immutable.remove(arr, 5);
    expect.deepEqual(iarr, [1, 2, 3], 'Should return same array if index is out of bounds');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::insert', (expect) => {
    before();
    iarr = Immutable.insert(arr, 0, 1);
    expect.deepEqual(iarr, [1, 0, 2, 3], 'Should be able to insert a value into an array');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::swapWithPrevious', (expect) => {
    before();
    iarr = Immutable.swapWithPrevious(arr, 1);
    expect.deepEqual(iarr, [2, 1, 3], 'Should be able to swap values of index and index - 1 in an array');
    iarr = Immutable.swapWithPrevious(arr, 0);
    expect.deepEqual(iarr, [1, 2, 3], 'Should return array copy if index is 0 or less');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.test('::swapWithNext', (expect) => {
    before();
    iarr = Immutable.swapWithNext(arr, 1);
    expect.deepEqual(iarr, [1, 3, 2], 'Should be able to swap values of index and index + 1 in an array');
    iarr = Immutable.swapWithNext(arr, 2);
    expect.deepEqual(iarr, [1, 2, 3], 'Should return array copy if index is array.length - 1 or more');
    expect.notEqual(arr, iarr, 'Should not modify initial array');
    expect.end();
  });

  expect.end();
});
