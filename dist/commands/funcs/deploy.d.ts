import { Command, flags as oclifFlags } from "@oclif/command";
export default class DeployCommand extends Command {
    static description: string;
    static flags: {
        schedule: oclifFlags.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
