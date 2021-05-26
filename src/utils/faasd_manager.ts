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
import IFaasdService from "./interfaces/ifaasd_service";
import {
  DeployFunction,
  GetFunctionResponse,
  ListFunctionRequest,
  ListFunctionResponse,
  LogFunctionRequest
} from "./types";
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

  async listFunctions(
    request: ListFunctionRequest
  ): Promise<ListFunctionResponse> {
    return await this._faasdService.list(request);
  }

  async logFunction(request: LogFunctionRequest) {
    return await this._faasdService.logs(request);
  }
}
