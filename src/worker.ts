import fs from "fs/promises";
import path from "path";
import process from "process";
import {readJobFiles} from "./helper/helper";
import {JobInput} from "./schema/checkoutSchema";
import EventEmitter from 'events';

export const event = new EventEmitter();


const baseFile  = path.resolve(process.cwd(), "jobs");
const pending = path.join(baseFile, 'pending.json');
const processing = path.join(baseFile, 'processing.json');
const done = path.join(baseFile, 'done.json');



async function processQueue() :Promise<JobInput | null > {
    try {
        const response = await readJobFiles(pending);

        const job = response.shift();
        await fs.writeFile(pending, JSON.stringify(response, null, 2));
        if(!job) return null;



        const processingFile = await readJobFiles(processing);
        job.status = "processing";
        processingFile.push(job);
        await fs.writeFile(processing, JSON.stringify(processingFile, null, 2));
        await fs.writeFile(pending, JSON.stringify(response, null, 2));
        return job;
    }catch(err){
        throw err as NodeJS.ErrnoException;
    }
}

export  function startWorker()  {
    // move from processing → done or failed
    event.on("done::processing", async (job) => {
        try{
            const jobId = job.jobId;
            const customerName = job.payload.firstName + " " + job.payload.lastName;
            console.log(`Processing job ${job.jobId} with customerName ${customerName}`);
            const data = await readJobFiles(done)
            job.status = "completed"
            data.push(job);
            await fs.writeFile(done, JSON.stringify(data, null, 2));

            // remove from processing.json

            setTimeout(async () => {
                const processingFile = await readJobFiles(processing );
                const remainingData = processingFile.filter((j : JobInput) => j.jobId !==  jobId )
                await fs.writeFile(processing, JSON.stringify(remainingData, null, 2));
                console.log(`Job ${job.jobId} completed`);
            }, 20000)

        }catch(err){
            event.emit('error', err)
        }
    })

    event.on('error', (err) => { console.error('Worker error:', err) })

    setInterval(async () => {
        const job  = await processQueue();
        if(!job){
            return;
        }
        event.emit("done::processing", job);
    }, 30000)

}




