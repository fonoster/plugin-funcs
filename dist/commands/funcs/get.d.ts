import "../../config";
import { Command, flags } from "@oclif/command";
export default class GetCommand extends Command {
    static description: string;
    static args: {
        name: string;
    }[];
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        name: flags.IOptionFlag<string | undefined>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
