import { Command, flags as oclifFlags } from '@oclif/command'
import { cli } from "cli-ux";
import FaasdManager from '../../utils/faasdmanager'
import FaasdService from '../../utils/implementation/faasdserviceclient';
export default class DeleteCommand extends Command {
  static description = "get function logs";

  static args = [{ name: "name" }]

  static flags = {
    tail: oclifFlags.integer({
      char: "t",
      description: "tail result",
      default: 10
    }),
    follow: oclifFlags.boolean({
      char: "f",
      description: "logs stream",
      default: false
    })
  };

  async run() {
    const { flags, args } = this.parse(DeleteCommand);
    const _faasdManager = new FaasdManager(new FaasdService());
    try {
      cli.action.start("getting function logs");
      await _faasdManager.logFunction({
        follow: flags.follow,
        name: args.name,
        tail: flags.tail
      });

      await cli.wait(1000);
      cli.action.stop("Done");
    } catch (e) {
      console.log('Unable to fetch');

    }

  }

}
