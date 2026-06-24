import {JobInput} from "../schema/checkoutSchema";
import fs from "fs/promises";
import path from "path";
import {spawn} from "node:child_process";

const baseFile  = path.resolve(__dirname, '..', 'jobs');
const processing = path.join(baseFile, 'processing.json');
const failed = path.join(baseFile, 'failed.json');
const pending = path.join(baseFile, 'pending.json');
const done = path.join(baseFile, 'done.json');


const pythonFile = path.resolve(process.cwd(), "..", "main.py");
type Card = {
    card: string;
    expiry_date: string;
    cvv: number;
};

console.log()
export function validateCreditCard(currCard : Card) : Promise<boolean> {
   return new Promise((resolve, reject) => {
       let body = "";
       let validated = false;
       const pythonPath =
           "/Users/user/Desktop/Documents/file-job-queue/.venv/bin/python3";

       const child = spawn(pythonPath, [pythonFile], {
           cwd: path.dirname(pythonFile),

       });
       child.stdout.on("data", (data: Buffer) => {
           body += data.toString();
       });
       child.stderr.on("data", (chunk: Buffer) => {
           console.error("Python error:", chunk.toString());

       });
       child.on("error", (err) => {
           console.error("Failed to start Python:", err);

       });

       child.on("close", (exitCode) => {
           try{
               const cards = JSON.parse(body.trim());
               const exists = cards.some((x: Card) => x.card === currCard.card)
               resolve(exists);
           }catch{
               resolve(false);
           }

       });


   })


}



export async function readJobFiles(filePath : string)  {
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






