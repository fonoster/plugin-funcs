import { DeployFunction, GetFunctionResponse, ListFunctionRequest, ListFunctionResponse, LogFunctionRequest } from "../types";
export default interface IFaasdService {
    deploy(request: DeployFunction): void;
    get(ref: string): Promise<GetFunctionResponse>;
    list(request: ListFunctionRequest): Promise<ListFunctionResponse>;
    delele(ref: string): Promise<string>;
    logs(request: LogFunctionRequest): void;
}
