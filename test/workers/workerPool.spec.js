import test from 'blue-tape';
import sinon from 'sinon';
import Worker from 'tiny-worker';
import WorkerPool from '../../src/workers/workerPool';

let pool,
    onMessageSpy = sinon.spy();

let worker = Worker.bind(null, () => {
  self.onmessage = ev => {
    onMessageSpy(ev.data);
  };
});

const before = () => {
  pool = new WorkerPool({
    amount: 5,
    worker
  });
};

test('WorkerPool =>', (expect) => {
  expect.test('::constructor', (expect) => {
    before();

    expect.equal(pool.amount, 5, 'Should create amount property');
    expect.ok(pool.Worker, 'Should create Worker property');
    expect.end();
  });

  expect.test('::spawnWorkers', (expect) => {
    before();

    pool.spawnWorkers();

    expect.equal(pool.freeWorkers.length, 5, 'Should create new workers');
    pool.terminateWorkers();
    expect.end();
  });

  expect.test('::executeWhenAvailable', (expect) => {
    before();

    let spy = sinon.spy();

    pool.spawnWorkers();
    pool.executeWhenAvailable(spy, '');

    expect.ok(spy.called, 'Should execute callback');
    expect.equal(pool.freeWorkers.length, 4, 'Should reduce number of free workers');
    pool.terminateWorkers();
    expect.end();
  });

  expect.end();
});
