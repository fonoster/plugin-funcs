import { Command, flags, flags as oclifFlags } from "@oclif/command";
import FaasdManager from "../../utils/faasdmanager";
import FaasdService from "../../utils/implementation/faasdserviceclient";
import { DeployFunction } from "../../utils/types";

export default class DeployCommand extends Command {
  static description = "deploy a fonos function"

  static flags = {
    schedule: oclifFlags.string({
      char: "s",
      description: "function schedule",
      required: false
    })
  };

  async run() {
    const { flags } = this.parse(DeployCommand);

    console.log("This utility will help you deploy a Fonos function");
    const _faasdManager = new FaasdManager(new FaasdService());
    const pathPackageFunction = `${process.cwd()}/function/package.json`;

    try {
      const name = require(pathPackageFunction).name;

      let request = { 
        name: name,
        baseDir: process.cwd()
      } as DeployFunction;

      if (flags.schedule) {
        request.schedule = flags.schedule;
      };

      await _faasdManager.deployFunction({
        name: name,
        baseDir: process.cwd()
      });

    } catch (e) {
      if (e instanceof Error)
        console.log("Can't load function!");
      else
        throw e;
    }

  }

}
