import { Command } from '@oclif/command'
import { cli } from "cli-ux";
import FaasdManager from '../../utils/faasdmanager'
import FaasdService from '../../utils/implementation/faasdserviceclient';
export default class DeleteCommand extends Command {
  static description = "removes a function";

  static args = [{ name: 'ref' }]

  async run() {
    const { args } = this.parse(DeleteCommand);
    const _faasdManager = new FaasdManager(new FaasdService());
    try {
      cli.action.start("removing a fonos function");
      await _faasdManager.deleteFunction(args.ref);
      await cli.wait(1000);
      cli.action.stop("Done");
    } catch (e) {
      console.log('Unable to remove!');

    }

  }

}
