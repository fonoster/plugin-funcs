const fs = require('fs')
const https = require('https')
export default class RequestHelper{
    constructor(){

    }
    static async download(url:string, dest:string, cb:Function) {
        return new Promise((resolve,reject) =>{
            const file = fs.createWriteStream(dest);
            const request = https.get(url, function (response:any) {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(cb);
                    resolve("done");
                    // close() is async, call cb after close completes.
                });
            }).on('error', function (err:any) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (cb) cb(err.message);
            });
        })
       
    };
}