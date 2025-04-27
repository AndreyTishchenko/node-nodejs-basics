import { Worker } from "worker_threads";
import path from 'path';
import * as os from 'os';

const performCalculations = async () => {
    let increment = 10;

    const cpusNumber = os.cpus().length;

    const absolutePath = path.dirname(new URL(import.meta.url).pathname);

    const workerPath = path.resolve(absolutePath, 'worker.js');

    for (let i = 0; i < cpusNumber; i++) {
        const worker = new Worker(workerPath);
        worker.postMessage(increment++);

        worker.on('message', (messageContent) => {
            console.log(`Worker ${i + 1} result:`, messageContent);
        });
    }
};

await performCalculations();
