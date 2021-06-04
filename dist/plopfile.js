"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(plop) {
    plop.setGenerator("init", {
        actions: function () {
            const actions = [];
            actions.push({
                type: "add",
                path: "{{cwd}}/func/function/package.json",
                templateFile: "templates/package.hbs",
                abortOnFail: true
            }, {
                type: "add",
                path: "{{cwd}}/func/function/{{entryPoint}}",
                templateFile: "templates/handler.hbs",
                abortOnFail: true
            }, {
                type: "add",
                path: "{{cwd}}/func/Dockerfile",
                templateFile: "templates/dockerfile.hbs",
                abortOnFail: true
            });
            return actions;
        }
    });
}
exports.default = default_1;
