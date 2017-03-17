const workerPool = {}, messageQueue = [];
let workerIds = [];

export default class WorkerPool {
  constructor ({ amount, worker }) {
    this.amount = amount || 5;
    this.Worker = worker;
  }

  spawnWorkers () {
    workerIds = [...Array(this.amount)].map((i, v) => {
      let webWorker = new this.Worker();

      workerPool[v] = { worker: webWorker };

      webWorker.addEventListener('message', () => {
        // console.log(`Freed worker #${v}`);
        workerIds.push(v);

        if (messageQueue.length) this.postMessage(messageQueue.pop());

        if (this.freeWorkers.length === this.amount - 1) console.log('done!');
      });

      return v;
    });
  }

  executeWhenAvailable (callback, data) {
    if (workerIds.length) return callback(workerIds.pop());

    return messageQueue.push(data);
  }

  postMessage (data) {
    setTimeout(() =>
      this.executeWhenAvailable(id => {
        let worker = workerPool[id].worker;

        // console.log("postMessage with worker #" + id);
        worker.postMessage(data);
      }, data),
      0
    );
  }

  addEventListener (event, callback) {
    Object.keys(workerPool)
      .forEach(i =>
        workerPool[i].worker.addEventListener(event, callback)
      );
  }

  get freeWorkers () {
    return workerIds;
  }
}
