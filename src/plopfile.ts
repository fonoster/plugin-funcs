export default function (plop: any) {
  plop.setGenerator("init", {
    actions: function (data: { [key: string]: string }) {
      let actions = [];
      actions.push(
        {
          type: "add",
          path: "{{cwd}}/function/package.json",
          templateFile: "templates/package.json",
          abortOnFail: true,
          transform(fileContents: string, data: { [key: string]: string }) {
            return fileContents.replace(/\,(?=\s*?[\}\]])/g, "");
          },
        },
        {
          type: "add",
          path: "{{cwd}}/function/handler.{{ext}}",
          templateFile: "templates/handler.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "{{cwd}}/function/Dockerfile",
          templateFile: "templates/docker.hbs",
          abortOnFail: true,
        }
      );
      return actions;
    },
  });
}



      // if (data.typescript) {
      // actions.push({
      //   type: "add",
      //   path: "{{cwd}}/{{entryPoint}}.{{ext}}",
      //   templateFile: "templates/handler.ts",
      //   abortOnFail: true,
      // });
      // } else {
      // actions.push(
      //   {
      //     type: "add",
      //     path: "{{cwd}}/{{entryPoint}}",
      //     templateFile: "templates/handler.js",
      //     abortOnFail: true,
      //   }
      // );
      // }

      // if(data.dependencies){
      // 	actions.push(
      //     {
      //       type: "add",
      //       path: "{{cwd}}/function/handler.test.ts",
      //       templateFile: "templates/handler.test.ts",
      //       abortOnFail: true
      //     }
      // 	);
      // }
      // ,
      //     {
      //       type: "add",
      //       path: "{{cwd}}/function/package.json",
      //       templateFile: "templates/package.hbs",
      //       abortOnFail: true,
      //     }
