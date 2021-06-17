export default function (plop: any) {
  plop.setGenerator("init", {
    description: "application controller logic",
    actions: function (data: any) {
      let actions = [];
      actions.push(
        {
          type: "add",
          path: "{{cwd}}/function/src/index.{{ext}}",
          templateFile: "templates/index/index{{ext}}.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/function/package.json",
          templateFile: "templates/package/package{{ext}}.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/Dockerfile",
          templateFile: "templates/dockerfile.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/.dockerignore",
          templateFile: "templates/ignore/dockerignore.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/.gitignore",
          templateFile: "templates/ignore/ignoreout.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/function/.gitignore",
          templateFile: "templates/ignore/ignorein.hbs",
          abortOnFail: true
        }
      );
      if (data.eslint) {
        actions.push({
          type: "add",
          path: "{{cwd}}/function/.eslintrc.js",
          templateFile: "templates/lint/eslint{{ext}}.hbs",
          abortOnFail: true
        });
      }
      if (data.ext == "ts") {
        actions.push(
          {
            type: "add",
            path: "{{cwd}}/function/tsconfig.json",
            templateFile: "templates/tsconfig/tsconfig.hbs",
            abortOnFail: true
          },
          {
            type: "add",
            path: "{{cwd}}/function/tsconfig.dev.json",
            templateFile: "templates/tsconfig/tsconfig.dev.hbs",
            abortOnFail: true
          }
        );
      }
      return actions;
    }
  });
}
