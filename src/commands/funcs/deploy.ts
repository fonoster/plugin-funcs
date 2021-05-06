import {Command, flags} from '@oclif/command'
import DockerUtils from '../../utils/dockerUtils';
import FileHelper from '../../utils/fileHelper';
import RequestHelper from '../../utils/requestHelper';
import FaasdService from '../../utils/faasdService';
import { constants } from '../../utils/constants';
import {basename, join} from "path";
export default class DeployCommand extends Command {
  static description = 'deploy a fonos function'

  static examples = [
    `$ oclif-example hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    console.log("This utility will help you deploy a Fonos function");
    const _dockerUtils = new DockerUtils(this.log);
    const _faasdService = new FaasdService();
    const timeString = Date.now().toFixed(0).toString();
    const workDirFunc = join("/tmp", timeString, "function");
    const workDir = join("/tmp", timeString);
    const dockerFileDir = join(workDir, "Dockerfile");
    FileHelper.createDirectory(workDirFunc);
    FileHelper.copySync(process.cwd(),workDirFunc);
    

    //Get Image
    await RequestHelper.download(constants.DOCKERFILE,dockerFileDir, function(params:any) {
    })

    //Build image
    await _dockerUtils.buildImage(workDir,timeString);

    //pushImage
    await _dockerUtils.pushImage(timeString)

    const result = await _faasdService.deployFunction(constants.REPO+timeString,timeString)
  }
  
}
