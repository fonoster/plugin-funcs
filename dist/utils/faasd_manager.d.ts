import IFaasdService from "./interfaces/ifaasd_service";
import { DeployFunction, GetFunctionResponse, ListFunctionRequest, ListFunctionResponse, LogFunctionRequest } from "./types";
export default class FaasdManager {
    _faasdService: IFaasdService;
    constructor(service: IFaasdService);
    deployFunction(request: DeployFunction): Promise<void>;
    getFunction(ref: string): Promise<GetFunctionResponse>;
    deleteFunction(ref: string): Promise<string>;
    listFunctions(request: ListFunctionRequest): Promise<ListFunctionResponse>;
    logFunction(request: LogFunctionRequest): Promise<void>;
}
