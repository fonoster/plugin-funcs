import IFaasdService from "./interfaces/ifaasdservice";
import { DeployFunction, GetFunctionResponse, ListFunctionRequest, ListFunctionResponse, LogFunctionRequest } from "./types"
export default class FaasdManager {
    _faasdService: IFaasdService;
    constructor(service: IFaasdService) {
        this._faasdService = service;
    }

    async deployFunction(request: DeployFunction) {
        await this._faasdService.deploy(request);
    }

    async getFunction(ref: string): Promise<GetFunctionResponse> {
        return await this._faasdService.get(ref);
    }

    async deleteFunction(ref: string) {
       return await this._faasdService.delele(ref);
    }

    async listFunctions(request: ListFunctionRequest): Promise<ListFunctionResponse> {
        return await this._faasdService.list(request);
    }

    async logFunction(request: LogFunctionRequest) {
        return await this._faasdService.logs(request);
    }
}