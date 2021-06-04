import { Command } from "@oclif/command";
export default class InitCommand extends Command {
    static description: string;
    run(): Promise<void>;
}
