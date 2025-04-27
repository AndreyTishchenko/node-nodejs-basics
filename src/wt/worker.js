import { workerData, parentPort } from "worker_threads";
// n should be received from main thread
function nthFibonacci(n) {
    let a = 0, b = 1, temp;
    for (let i = 0; i < n; i++) {
      temp = a;
      a = b;
      b = temp + b;
    }
    return a;
}

const sendResult = () => {
    parentPort.on('message', (value) => {parentPort.postMessage(nthFibonacci(value))}) ;
};

sendResult();