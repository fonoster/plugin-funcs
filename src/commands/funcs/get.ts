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
import { Command, flags } from "@oclif/command"
import {CLIError} from "@oclif/errors";
import { render } from "prettyjson";
import FaasdManager from "../../utils/faasd_manager";
import FaasdService from "../../utils/implementation/faasd_service_client";
export default class GetCommand extends Command {
  static description = "get a fonos function";

  static args = [{ name: "ref" }]

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  }


  async run() {
    const { args } = this.parse(GetCommand);
    const _faasdManager = new FaasdManager(new FaasdService());
    try {
      const result = await _faasdManager.getFunction(args.ref);      
      const objectReturn = {
        name:result.name,
        image:result.image,
        replicas:result.replicas,
        availableReplicas:result.availableReplicas,
        invocationCount:result.invocationCount
      }
      console.log(render(objectReturn, { noColor: true }));
    } catch (e) {
      throw new CLIError("not found");
    }

  }

}
