"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FaasdManager {
    constructor(service) {
        this._faasdService = service;
    }
    async deployFunction(request) {
        await this._faasdService.deploy(request);
    }
    async getFunction(ref) {
        return await this._faasdService.get(ref);
    }
    async deleteFunction(ref) {
        return await this._faasdService.delele(ref);
    }
    async listFunctions(request) {
        return await this._faasdService.list(request);
    }
    async logFunction(request) {
        return await this._faasdService.logs(request);
    }
}
exports.default = FaasdManager;
