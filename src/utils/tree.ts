import cli from "cli-ux";

export function tree(data: any) {
  let tree = cli.tree();
  let subtree = cli.tree();
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
