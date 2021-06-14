"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tree = void 0;
const tslib_1 = require("tslib");
const cli_ux_1 = tslib_1.__importDefault(require("cli-ux"));
function tree(data) {
    let tree = cli_ux_1.default.tree();
    let subtree = cli_ux_1.default.tree();
    tree.insert("function");
    tree.insert(".dockerignore");
    tree.insert(".gitignore");
    tree.insert("Dockerfile");
    subtree.insert("index." + data.ext);
    tree.nodes.function.insert("src", subtree);
    tree.nodes.function.insert(".gitignore");
    tree.nodes.function.insert("package.json");
    if (data.eslint) {
        tree.nodes.function.insert(".eslintrc.js");
    }
    if (data.ext == "ts") {
        tree.nodes.function.insert("tsconfig.dev.json");
        tree.nodes.function.insert("tsconfig.json");
    }
    return tree.display();
}
exports.tree = tree;
