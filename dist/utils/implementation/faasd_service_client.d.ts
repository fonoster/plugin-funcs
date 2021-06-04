import IFaasdService from "../interfaces/ifaasd_service";
import { DeployFunction, GetFunctionResponse, ListFunctionRequest, ListFunctionResponse, LogFunctionRequest } from "../types";
import FuncService from "@fonos/funcs";
export default class FaasdService implements IFaasdService {
    _service: FuncService;
    constructor();
    deploy(request: DeployFunction): Promise<void>;
    get(ref: string): Promise<GetFunctionResponse>;
    list(request: ListFunctionRequest): Promise<ListFunctionResponse>;
    delele(ref: string): Promise<string>;
    logs(request: LogFunctionRequest): Promise<void>;
}
