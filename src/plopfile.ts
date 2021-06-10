export default function (plop: any) {
  plop.setGenerator("init", {
    actions: function () {
      const actions = [];
      actions.push(
        {
          type: "add",
          path: "{{cwd}}/function/package.json",
          templateFile: "templates/package.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/function/{{entryPoint}}",
          templateFile: "templates/handler.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/Dockerfile",
          templateFile: "templates/dockerfile.hbs",
          abortOnFail: true
        }
      );
      return actions;
    }
  });
}
