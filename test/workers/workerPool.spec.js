import test from 'blue-tape';
import sinon from 'sinon';
import Worker from 'tiny-worker';
import WorkerPool from '../../src/workers/workerPool';

let pool,
    onMessageSpy = sinon.spy();

let worker = function() {
  return new Worker(function () {
    self.onmessage = ev => {
      postMessage(ev);
    };
  });
}

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

  expect.test('::addEventListener, ::postMessage, ::startOver', (expect) => {
    const fn = () => new Promise((resolve, reject) => {
      before();

      pool.spawnWorkers();

      pool.startOver(5);

      pool.addEventListener('message', (e) => {
        resolve(e.data);
      });

      pool.postMessage("Communicating");
    });

    return fn().then(e => {
      expect.deepEqual(e, { data: 'Communicating', partsTotal: 5, currentPart: 0 }, 'Should be able to communicate with a free worker')
      pool.terminateWorkers();
    });
  });

  expect.end();
});
