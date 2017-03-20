const workerPool = {}, messageQueue = [];
let workerIds = [], partsTotal = 0, currentPart = 0;

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
        workerPool[i].worker.addEventListener(event, e => {
          // updating current progress to keep track from outside
          e.data.partsTotal = partsTotal;
          e.data.currentPart = currentPart++;
          callback(e);
        })
      );
  }

  get freeWorkers () {
    return workerIds;
  }

  // these two needed to set initial state to track percentage of work done
  startOver (length) {
    currentPart = 0;
    partsTotal = length;
  }
}
