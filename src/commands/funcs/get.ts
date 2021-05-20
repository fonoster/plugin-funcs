import { Command, flags } from "@oclif/command"
import {CLIError} from "@oclif/errors";
import { render } from "prettyjson";
import FaasdManager from "../../utils/faasdmanager";
import FaasdService from "../../utils/implementation/faasdserviceclient";
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
