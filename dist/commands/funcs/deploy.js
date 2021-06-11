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
const logger_1 = require("@fonos/logger");
const command_1 = require("@oclif/command");
const errors_1 = require("@oclif/errors");
const faasd_manager_1 = tslib_1.__importDefault(require("../../utils/faasd_manager"));
const faasd_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/faasd_service_client"));
const fs = tslib_1.__importStar(require("fs"));
logger_1.mute();
class DeployCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(DeployCommand);
        console.log("Deploying function to cloud backend");
        const _faasdManager = new faasd_manager_1.default(new faasd_service_client_1.default());
        const pathPackageFunction = `${process.cwd()}/function/package.json`;
        try {
            if (!fs.existsSync(pathPackageFunction)) {
                throw new errors_1.CLIError("Could not find package.json. Be sure to be inside the functions directory.");
            }
            const name = require(pathPackageFunction).name;
            const request = {
                name: name,
                baseDir: process.cwd()
            };
            if (flags.schedule) {
                request.schedule = flags.schedule;
            }
            await _faasdManager.deployFunction({
                name: name,
                baseDir: process.cwd()
            });
        }
        catch (e) {
            throw new errors_1.CLIError(e);
        }
    }
}
exports.default = DeployCommand;
DeployCommand.description = "deploy a fonos function";
DeployCommand.flags = {
    schedule: command_1.flags.string({
        char: "s",
        description: "function schedule",
        required: false
    })
};
