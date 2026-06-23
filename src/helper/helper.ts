import {JobInput} from "../schema/orderSchema";
import fs from "fs/promises";
import path from "path";

const baseFile  = path.resolve(__dirname, '..', 'jobs');
const processing = path.join(baseFile, 'processing.json');
const failed = path.join(baseFile, 'failed.json');
const pending = path.join(baseFile, 'pending.json');
const done = path.join(baseFile, 'done.json');

console.log(pending)


async function readJobFiles(filePath : string)  {
    try {
        const response = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(response || "[]");
    }catch (err : unknown){
        const error =err as NodeJS.ErrnoException;
        if (error.code === 'ENOENT') {
            return [];
        } else if (error.code === 'EACCES') {
            console.error('Permission denied');
            throw err;
        }
    }
}

export async function writeQueue(job : JobInput ):Promise<void> {

    try{
        const data = await readJobFiles(pending);
        data.push(job);
        await fs.writeFile(pending, JSON.stringify(data, null, 2));
    }catch (err){
      throw err;
    }
}
export function readQueue() {

}






