import { CommonPB } from "@fonos/funcs";
import { Command, flags as oclifFlags } from "@oclif/command";
import inquirer from "inquirer";
import FaasdManager from "../../utils/faasdmanager";
import FaasdService from "../../utils/implementation/faasdserviceclient";
import { Function } from "../../utils/types";
const Table = require("easy-table");

export default class ListCommand extends Command {
  static description = "get a list of fonos functions";
  static flags = {
    size: oclifFlags.integer({
      char: "s",
      default: 25,
      description: "functions of result per page"
    })
  };

  async run() {
    const { flags } = this.parse(ListCommand);
    const _faasdManager = new FaasdManager(new FaasdService());
    try {
      const pageSize = flags.size;
      let firstBatch = true;
      let pageToken = "1";
      const view: CommonPB.View = CommonPB.View.BASIC;

      while (true) {

        const result = await _faasdManager.listFunctions({
          pageSize:pageSize,
          pageToken:pageToken,
          view:view
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

        const t = new Table();
     
        list.forEach((func: Function) => {
          t.cell("Name", func.name);
          t.cell("Image", func.image);
          t.cell("Invocation Count", func.invocationCount);
          t.cell("Replicas", func.replicas);
          t.newRow();
        });

        if (list.length > 0) console.log(t.toString());

        firstBatch = false;
        if (!pageToken) break;

      }
    } catch (e) {
      console.log(e);

    }

  }

}
