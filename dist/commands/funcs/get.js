"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
const command_1 = require("@oclif/command");
const errors_1 = require("@oclif/errors");
const prettyjson_1 = require("prettyjson");
const faasd_manager_1 = tslib_1.__importDefault(require("../../utils/faasd_manager"));
const faasd_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/faasd_service_client"));
class GetCommand extends command_1.Command {
    async run() {
        const { args } = this.parse(GetCommand);
        const _faasdManager = new faasd_manager_1.default(new faasd_service_client_1.default());
        try {
            const result = await _faasdManager.getFunction(args.ref);
            const objectReturn = {
                name: result.name,
                image: result.image,
                replicas: result.replicas,
                availableReplicas: result.availableReplicas,
                invocationCount: result.invocationCount
            };
            console.log(prettyjson_1.render(objectReturn, { noColor: true }));
        }
        catch (e) {
            throw new errors_1.CLIError("not found");
        }
    }
}
exports.default = GetCommand;
GetCommand.description = "get a fonos function";
GetCommand.args = [{ name: "ref" }];
GetCommand.flags = {
    help: command_1.flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: command_1.flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: "f" })
};
