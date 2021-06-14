"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const path_1 = require("path");
const tree_1 = require("../../utils/tree");
const nodePlop = require("node-plop");
const plop = nodePlop(path_1.join(__dirname, "..", "..", "..", "src", "plopfile.ts"));
const init = plop.getGenerator("init");
const inquirer = require("inquirer");
class InitCommand extends command_1.Command {
    async run() {
        console.log("This utility will help you create a basic function");
        const dirname = path_1.basename(process.cwd());
        const questions = await inquirer.prompt([
            {
                name: "ext",
                message: "What language would you like to use to write Cloud Functions? (Use arrow keys)",
                type: "list",
                choices: [
                    { name: "Typescript", value: "ts" },
                    { name: "Javascript", value: "js" }
                ],
                default: "Typescript"
            },
            {
                name: "eslint",
                message: "Do you want to use ESLint to catch probable bugs and enforce style?",
                type: "confirm"
            },
            {
                name: "pckgName",
                message: "package name",
                type: "input",
                default: dirname
            },
            {
                name: "pckgVersion",
                message: "version",
                type: "input",
                default: "1.0.0"
            },
            { name: "pckgDesc", message: "description", type: "input" },
            { name: "author", message: "author", type: "input" },
            { name: "license", message: "license", type: "input", default: "ISC" },
            {
                name: "confirm",
                message: "ready?",
                type: "confirm"
            }
        ]);
        questions.cwd = process.cwd();
        if (!questions.confirm) {
            console.log("Aborted");
        }
        else {
            /**
             *  @description nodePlop have some issues about typeDef
             *  @example https://github.com/plopjs/node-plop/issues/194
             **/
            init
                .runActions(questions)
                .then(() => console.log("Done"))
                .then(() => tree_1.tree(questions));
        }
    }
}
exports.default = InitCommand;
InitCommand.description = `creates a new empty function
  ...
  Extra documentation goes here
  `;
