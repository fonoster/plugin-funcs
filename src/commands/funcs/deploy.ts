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
import {Command, flags as oclifFlags} from "@oclif/command";
import FaasdManager from "../../utils/faasd_manager";
import FaasdService from "../../utils/implementation/faasd_service_client";
import {DeployFunction} from "../../utils/types";

export default class DeployCommand extends Command {
  static description = "deploy a fonos function";

  static flags = {
    schedule: oclifFlags.string({
      char: "s",
      description: "function schedule",
      required: false
    })
  };

  async run() {
    const {flags} = this.parse(DeployCommand);

    console.log("This utility will help you deploy a Fonos function");
    const _faasdManager = new FaasdManager(new FaasdService());
    const pathPackageFunction = `${process.cwd()}/function/package.json`;

    try {
      const name = require(pathPackageFunction).name;

      const request = {
        name: name,
        baseDir: process.cwd()
      } as DeployFunction;

      if (flags.schedule) {
        request.schedule = flags.schedule;
      }

      await _faasdManager.deployFunction({
        name: name,
        baseDir: process.cwd()
      });
    } catch (e) {
      if (e instanceof Error) console.log("Can't load function!");
      else throw e;
    }
  }
}
