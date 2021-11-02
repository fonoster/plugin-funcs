/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/plugin-funcs
 *
 * This file is part of Fonoster
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
import "../../config";
import {Command, flags as oclifFlags} from "@oclif/command";
import {CLIError} from "@oclif/errors";
import FaasdManager from "../../utils/faasd_manager";
import FaasdService from "../../utils/implementation/faasd_service_client";
import {DeployFunction} from "../../utils/types";
import * as fs from "fs";
export default class DeployCommand extends Command {
  static description = "deploy Fonoster Function";

  static flags = {
    schedule: oclifFlags.string({
      char: "s",
      description: "function schedule",
      required: false
    })
  };

  async run() {
    const {flags} = this.parse(DeployCommand);

    console.log("Deploying Function to cloud backend");
    const _faasdManager = new FaasdManager(new FaasdService());
    const pathPackageFunction = `${process.cwd()}/function/package.json`;
    try {
      if (!fs.existsSync(pathPackageFunction)) {
        throw new CLIError(
          "Could not find package.json. Be sure to be inside the functions directory."
        );
      }
      const name = require(pathPackageFunction).name;

      const request = {
        name: name,
        baseDir: process.cwd()
      } as DeployFunction;

      if (flags.schedule) {
        request.schedule = flags.schedule;
      }

      await _faasdManager.deployFunction(request);
    } catch (e) {
      throw new CLIError(e);
    }
  }
}
