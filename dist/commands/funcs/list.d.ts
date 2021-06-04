import { Command } from "@oclif/command";
export default class ListCommand extends Command {
    static description: string;
    static flags: {
        size: import("@oclif/parser/lib/flags").IOptionFlag<number>;
    };
    run(): Promise<void>;
}
