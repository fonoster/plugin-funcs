export default function (plop: any) {
  plop.setGenerator("init", {
    actions: function (data: any) {
      let actions = [];
      actions.push(
        {
          type: "add",
          path: "{{cwd}}/func/function/package.json",
          templateFile: "templates/package.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/func/function/{{entryPoint}}",
          templateFile: "templates/handler.hbs",
          abortOnFail: true
        },
        {
          type: "add",
          path: "{{cwd}}/func/Dockerfile",
          templateFile: "templates/dockerfile.hbs",
          abortOnFail: true
        }
      );
      return actions;
    },
  });
}