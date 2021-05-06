var ncp = require('ncp').ncp;
var fs = require('fs');
const fs_extra = require('fs-extra');

export default class FileHelper{
    constructor(){

    }

    static copySync(srcDir: string, destDir:string): boolean{
        ncp(srcDir, destDir, function (err: Error) {
            if (err) {
              return console.error(err);
            }
            return true;
        });
        return true
    }

    static createDirectory(srcDir:string){
        fs_extra.ensureDirSync(srcDir);

    }
}