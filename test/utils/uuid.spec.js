import test from 'blue-tape';
import uniqueId from 'utils/uuid';

test('UUID =>', (expect) => {
  expect.test('::uniqueId', (expect) => {
    expect.equal(uniqueId('unique'), 'unique0', 'Should generate unique id');
    expect.equal(uniqueId('unique'), 'unique1', 'Should update internal counter');
    expect.end();
  });

  expect.end();
});
