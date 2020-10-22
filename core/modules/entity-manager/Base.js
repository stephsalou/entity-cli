import * as fs from "fs";
import * as path from "path";
import capitalize from "lodash.capitalize";
import findLastIndex from "lodash.findlastindex";
import { getSrcPathFormConfigFile } from "../common/configFile";
import { linter } from "../common/linter";

class BaseEntityManager {
  static get directory() {
    return getSrcPathFormConfigFile();
  }

  static init(name) {
    return path.join(this.directory, `${capitalize(name)}.entity.ts`);
  }

  static create(name) {}

  static update(name, content) {
    const file = path.join(this.directory, `${capitalize(name)}.entity.ts`);
    fs.writeFileSync(file, linter(content));
  }

  static append(nameOrContent, newContent, endTag) {
    const regex = new RegExp(endTag);
    let content = nameOrContent;
    let file = null;
    if (!Array.isArray(nameOrContent)) {
      file = path.join(
        this.directory,
        `${capitalize(nameOrContent)}.entity.ts`
      );
      content = fs.readFileSync(file).toString().split("\n");
    }
    // console.log(endTag);
    const lastIndex = findLastIndex(content, (line) => regex.test(line));
    // console.log(lastIndex);
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

export default BaseEntityManager;
