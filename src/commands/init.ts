import {Command} from "@oclif/command";
import {prompt} from "inquirer";
import {join, basename} from "path";
const nodePlop = require("node-plop");
const plop = nodePlop(join(__dirname, "..", "..", "..", "func", "src", "plopfile.ts"));
const init = plop.getGenerator("init");

export default class InitCommand extends Command {
  static description = `creates a new empty application
  ...
  Extra documentation goes here
  `;

  public async run() {
    console.log("This utility will help you create a basic voice application");
    console.log("to help you get start quickly. Press ^C at any time to quit.");

    const dirname: string = basename(process.cwd());
    let  questions: any = await prompt([
      {
        name: "typescript",
        message: "Want to use typescript?",
        type: "confirm",
        default: () => true
      },
      {
        type: 'checkbox',
				name: 'dependencies',
				message: 'which dependencies would you like to add?',
				choices: [
					{name: 'Mocha', value: ['mocha', 'lastest']},
					{name: 'Eslint', value: ['eslint', 'lastest']}
				]
      },
      // {
      //   name: "pckgName",
      //   message: "package name",
      //   type: "input",
      //   default: dirname
      // },
      // {
      //   name: "pckgVersion",
      //   message: "version",
      //   type: "input",
      //   default: "1.0.0"
      // },
      // {name: "pckgDesc", message: "description", type: "input"},
      // {
      //   name: "entryPoint",
      //   message: "entry point",
      //   type: "input",
      //   default: "function/handler"
      // },
      // {name: "author", message: "author", type: "input"},
      // {name: "license", message: "license", type: "input", default: "ISC"},
      {
        name: "confirm",
        message: "everything looks good?",
        type: "confirm"
      }
    ]);

    questions.cwd = process.cwd();

    if (!questions.confirm) {
      console.log("Aborted");
    } else {
      /**
       *  @description nodePlop have some issues about typeDef
       *  @example https://github.com/plopjs/node-plop/issues/194
       **/
       let newDependencies = Object.fromEntries(questions.dependencies)
       questions = {...questions, ext: "js"}
       if(questions.typescript){
        newDependencies = {...newDependencies, "typescript": "lastest"}   
        questions = {...questions, ext: "ts"}
			}

      init.runActions({...questions, dependencies: newDependencies}).then(() => console.log("Done"));
    }
  }
}
