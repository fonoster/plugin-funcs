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
import "../../config";
import {CommonPB} from "@fonos/funcs";
import {Command, flags as oclifFlags} from "@oclif/command";
const inquirer = require("inquirer");
import FaasdManager from "../../utils/faasd_manager";
import FaasdService from "../../utils/implementation/faasd_service_client";
import {cli} from "cli-ux";

export default class ListCommand extends Command {
  static description = "get a list of fonos functions";
  static flags = {
    size: oclifFlags.integer({
      char: "s",
      default: 25,
      description: "functions of result per page"
    })
  };
  static aliases = ["funcs:ls"];

  async run() {
    const {flags} = this.parse(ListCommand);
    const _faasdManager = new FaasdManager(new FaasdService());
    try {
      const pageSize = flags.size;
      let firstBatch = true;
      let pageToken = "1";
      const view: CommonPB.View = CommonPB.View.BASIC;

      while (true) {
        const result = await _faasdManager.listFunctions({
          pageSize: pageSize,
          pageToken: pageToken,
          view: view
        });
        const list = result.functions;
        pageToken = result.nextPageToken;

        // Dont ask this if is the first time or empty data
        if (list.length > 0 && !firstBatch) {
          const answer: any = await inquirer.prompt([
            {name: "q", message: "More", type: "confirm"}
          ]);
          if (!answer.q) break;
        }

        if (list.length < 1) break;

        cli.table(list, {
          name: {header: "Name", minWidth: 15},
          invocationCount: {header: "Invocation Count", minWidth: 15},
          replicas: {header: "Replicas", minWidth: 15},
          schedule: {header: "Schedule", minWidth: 15}
        });

        firstBatch = false;
        if (!pageToken) break;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
