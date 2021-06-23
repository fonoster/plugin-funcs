/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos-plugin-funcs
 *
 * This file is part of Project Fonos
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import IFaasdService from "../interfaces/ifaasd_service";
import {
  DeployFunction,
  GetFunctionResponse,
  ListFunctionRequest,
  ListFunctionResponse,
  LogFunctionRequest
} from "../types";
import FuncService from "@fonos/funcs";
import Funcs from "@fonos/funcs";
import {DeployFuncRequest} from "@fonos/funcs/dist/client/types";
const consola = require("consola");

export default class FaasdService implements IFaasdService {
  _service: FuncService;
  constructor() {
    this._service = new FuncService();
  }
  async deploy(request: DeployFunction) {
    const requestDeploy: DeployFuncRequest = {
      name: request.name,
      path: request.baseDir,
      schedule: request.schedule
    };

    const funcs = new Funcs();
    const stream = await funcs.deployFunc(requestDeploy);

    await new Promise<void>((resolve, reject) => {
      stream.onMessage((msg: any) => {
        consola.info(msg.text);
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
    const result = await this._service.getFunc({name: ref});
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
    const stream = await this._service.getFuncLogs(request);
    await new Promise<void>((resolve, reject) => {
      stream.onMessage((msg: any) => {
        consola.info(msg.text);
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
