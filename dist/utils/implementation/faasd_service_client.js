"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const funcs_1 = tslib_1.__importDefault(require("@fonos/funcs"));
const funcs_2 = tslib_1.__importDefault(require("@fonos/funcs"));
const consola = require("consola");
class FaasdService {
    constructor() {
        this._service = new funcs_1.default();
    }
    async deploy(request) {
        const requestDeploy = {
            name: request.name,
            path: request.baseDir,
            schedule: request.schedule
        };
        const funcs = new funcs_2.default();
        const stream = await funcs.deployFunc(requestDeploy);
        await new Promise((resolve, reject) => {
            stream.onMessage((msg) => {
                consola.info(msg.text);
            });
            stream.onFinish(() => {
                resolve();
            });
            stream.onError((e) => {
                reject(e);
            });
        });
    }
    async get(ref) {
        const result = await this._service.getFunc({ name: ref });
        return result;
    }
    async list(request) {
        const result = await this._service.listFuncs(request);
        return {
            nextPageToken: result.nextPageToken,
            functions: result.funcs
        };
    }
    async delele(ref) {
        const result = await this._service.deleteFunc({
            name: ref
        });
        return result.name;
    }
    async logs(request) {
        const stream = await this._service.getFuncLogs(request);
        await new Promise((resolve, reject) => {
            stream.onMessage((msg) => {
                consola.info(msg.text);
            });
            stream.onFinish(() => {
                resolve();
            });
            stream.onError((e) => {
                reject(e);
            });
        });
    }
}
exports.default = FaasdService;
