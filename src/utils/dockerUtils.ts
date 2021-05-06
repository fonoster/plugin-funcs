const Docker = require('dockerode')
import Dockerode from 'dockerode';
import { threadId } from 'worker_threads';
import { constants } from './constants'

export default class DockerUtils {
    dockerInstance: Dockerode;
    logs: Function
    constructor(log: Function) {        
        this.logs = log;
        this.dockerInstance = new Docker({ host: 'http://localhost', port: 2375 });;
    }

    async buildImage(dirName: string, tag: string) {
        return new Promise((resolve, reject) => {
            this.dockerInstance.buildImage({
                context: dirName,
                src: ['Dockerfile', 'function']
            }, { t: constants.REPO + tag, q: true }, function (err:Error, response: any) {
                console.log(err);
                if (err) reject(err);

                response.pipe(process.stdout, { end: true, });

                response.on('end', function () {
                    resolve('done');
                });
            });
        })

    }

    async pushImage(tag: string) {
        return new Promise(async(resolve, reject) => {
            const image = await this.dockerInstance.getImage(constants.REPO + tag);
            const streamPush = await image.push({ authconfig: constants.AUTH_REPO });
            streamPush.pipe(process.stdout, { end: true, })
            streamPush.on('end', function () {
                resolve('done');
            })
        })

    }
}