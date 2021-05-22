import IFaasdService from "../interfaces/ifaasdservice";
import { DeployFunction, GetFunctionResponse, ListFunctionRequest, ListFunctionResponse, LogFunctionRequest } from "../types";
import FuncService from "@fonos/funcs";
import Funcs from "@fonos/funcs";
import logger from "@fonos/logger";
import { DeployFuncRequest } from "@fonos/funcs/dist/types";
export default class FaasdService implements IFaasdService {
  _service: FuncService;
  constructor() {
    this._service = new FuncService();
  }
  async deploy(request: DeployFunction) {
    const requestDeploy: DeployFuncRequest = {
      name: request.name,
      path: request.baseDir
    };

    const funcs = new Funcs();
    const stream = await funcs.deployFunc(requestDeploy);

    await new Promise<void>((resolve, reject) => {
      stream.onMessage((msg: any) => {
        logger.info(msg.text);
      });
      stream.onFinish(() => {
        resolve();
      });
      stream.onError((e: Error) => {
        reject(e);
      });
    });
  }

  async get(ref: string): Promise<GetFunctionResponse> {
    let result = await this._service.getFunc({ name: ref });
    return result;
  }
  async list(request: ListFunctionRequest): Promise<ListFunctionResponse> {
    const result = await this._service.listFuncs(request);
    return {
      nextPageToken: result.nextPageToken,
      functions: result.funcs
    };
  }

  async delele(ref: string): Promise<string> {
    const result = await this._service.deleteFunc({
      name: ref
    });
    return result.name;
  }

  async logs(request: LogFunctionRequest) {
    let stream = await this._service.getFuncLogs(request);
    await new Promise<void>((resolve, reject) => {
      stream.onMessage((msg: any) => {
        logger.info(msg.text);
      });
      stream.onFinish(() => {
        resolve();
      });
      stream.onError((e: Error) => {
        reject(e);
      });
    });
  }
}