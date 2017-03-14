import test from 'blue-tape';
import { uniqueId, setInitialCounter, uuid } from '../../src/utils/uuid';

test('UUID =>', (expect) => {
  expect.test('::uniqueId', (expect) => {
    setInitialCounter(0);
    expect.equal(uniqueId('unique'), 'unique0', 'Should generate unique id');
    expect.equal(uniqueId('unique'), 'unique1', 'Should update internal counter');
    expect.equal(uniqueId(), 'unique2', 'Should apply default prefix');
    expect.end();
  });

  expect.test('::uuid', (expect) => {
    const id = uuid(),
          reg = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

    expect.ok(reg.test(id), 'Should generate uuid');
    expect.end();
  });

  expect.end();
});
