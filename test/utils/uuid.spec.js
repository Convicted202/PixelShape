import test from 'blue-tape';
import { uniqueId, setInitialCounter } from '../../src/utils/uuid';

test('UUID =>', (expect) => {
  expect.test('::uniqueId', (expect) => {
    setInitialCounter(0);
    expect.equal(uniqueId('unique'), 'unique0', 'Should generate unique id');
    expect.equal(uniqueId('unique'), 'unique1', 'Should update internal counter');
    expect.end();
  });

  expect.end();
});
