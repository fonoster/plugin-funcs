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
const faasd_manager_1 = tslib_1.__importDefault(require("../../utils/faasd_manager"));
const faasd_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/faasd_service_client"));
class DeleteCommand extends command_1.Command {
    async run() {
        const { flags, args } = this.parse(DeleteCommand);
        console.log("Getting functions logs");
        const _faasdManager = new faasd_manager_1.default(new faasd_service_client_1.default());
        try {
            await _faasdManager.logFunction({
                follow: flags.follow,
                name: args.name,
                tail: flags.tail
            });
        }
        catch (e) {
            console.log("Unable to fetch");
        }
    }
}
exports.default = DeleteCommand;
DeleteCommand.description = "get function logs";
DeleteCommand.args = [{ name: "name" }];
DeleteCommand.flags = {
    tail: command_1.flags.integer({
        char: "t",
        description: "tail result",
        default: 10
    }),
    follow: command_1.flags.boolean({
        char: "f",
        description: "logs stream",
        default: false
    })
};
