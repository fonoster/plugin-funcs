import "../../config";
import { Command } from "@oclif/command";
export default class DeleteCommand extends Command {
    static description: string;
    static args: {
        name: string;
    }[];
    static flags: {
        tail: import("@oclif/parser/lib/flags").IOptionFlag<number>;
        follow: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
