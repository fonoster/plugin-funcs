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
const funcs_1 = require("@fonos/funcs");
const command_1 = require("@oclif/command");
const inquirer = require("inquirer");
const faasd_manager_1 = tslib_1.__importDefault(require("../../utils/faasd_manager"));
const faasd_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/faasd_service_client"));
const Table = require("easy-table");
class ListCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(ListCommand);
        const _faasdManager = new faasd_manager_1.default(new faasd_service_client_1.default());
        try {
            const pageSize = flags.size;
            let firstBatch = true;
            let pageToken = "1";
            const view = funcs_1.CommonPB.View.BASIC;
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
                    const answer = await inquirer.prompt([
                        { name: "q", message: "More", type: "confirm" }
                    ]);
                    if (!answer.q)
                        break;
                }
                const t = new Table();
                list.forEach((func) => {
                    t.cell("Name", func.name);
                    t.cell("Image", func.image);
                    t.cell("Invocation Count", func.invocationCount);
                    t.cell("Replicas", func.replicas);
                    t.newRow();
                });
                if (list.length > 0)
                    console.log(t.toString());
                firstBatch = false;
                if (!pageToken)
                    break;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = ListCommand;
ListCommand.description = "get a list of fonos functions";
ListCommand.flags = {
    size: command_1.flags.integer({
        char: "s",
        default: 25,
        description: "functions of result per page"
    })
};
ListCommand.aliases = ["funcs:ls"];
