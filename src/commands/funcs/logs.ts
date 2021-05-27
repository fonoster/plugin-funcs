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
import {cli} from "cli-ux";
import FaasdManager from "../../utils/faasd_manager";
import FaasdService from "../../utils/implementation/faasd_service_client";
export default class DeleteCommand extends Command {
  static description = "get function logs";

  static args = [{name: "name"}];

  static flags = {
    tail: oclifFlags.integer({
      char: "t",
      description: "tail result",
      default: 10
    }),
    follow: oclifFlags.boolean({
      char: "f",
      description: "logs stream",
      default: false
    })
  };

  async run() {
    const {flags, args} = this.parse(DeleteCommand);
    const _faasdManager = new FaasdManager(new FaasdService());
    try {
      cli.action.start("getting function logs");
      await _faasdManager.logFunction({
        follow: flags.follow,
        name: args.name,
        tail: flags.tail
      });

      await cli.wait(1000);
      cli.action.stop("Done");
    } catch (e) {
      console.log("Unable to fetch");
    }
  }
}
