import capitalize from "lodash.capitalize";

import { addEntityImport, addTypeOrmImport } from "../../common/import.mjs";
import EntityManager from "../EntityManager.mjs";
import { typeORM } from "../../common/destructuringBreakpoints.mjs";
import {getModuleMode} from "../../common/configFile.mjs"

class Maker {
  static otmCommon(oneContent, manyContent, entityName, relationEntityName) {

    const one = {
      typeOrmImport: ["OneToMany"],
      newContent: [
        `\n\t@OneToMany(type =>  ${capitalize(relationEntityName)},  ${relationEntityName.toLowerCase()} => ${relationEntityName.toLowerCase()}.${entityName.toLowerCase()})`,
        `\t${relationEntityName.toLowerCase()}s: ${capitalize(relationEntityName)}[];`,
      ],
    };

    const many = {
      typeOrmImport: ["ManyToOne"],
      newContent: [
        `\n\t@ManyToOne(type => ${capitalize(entityName)}, ${entityName.toLowerCase()} => ${entityName.toLowerCase()}.${relationEntityName.toLowerCase()}s)`,
        `\t${entityName.toLowerCase()}: ${capitalize(entityName)}`,
      ],
    };

    return {
      one: this.common(
        oneContent,
        relationEntityName,
        one.typeOrmImport,
        one.newContent
      ),
      many: this.common(
        manyContent,
        entityName,
        many.typeOrmImport,
        many.newContent
      ),
    };
  }

  static common(entityContent, relationEntity, typeOrmImport, newContent) {
    const content = addEntityImport(
      addTypeOrmImport(entityContent, typeOrmImport),
      relationEntity,
      typeORM
    );

    return EntityManager.append(content, newContent.join("\n")).join("\n");
  }

  static oto(entityContent, relationEntity) {
    const newContent = [
      `\t@OneToOne(type => ${capitalize(relationEntity)})`,
      "\t@JoinColumn()",
      `\t${relationEntity.toLowerCase()}: ${capitalize(relationEntity)};`,
    ];

    return this.common(
      entityContent,
      relationEntity,
      ["OneToOne", "JoinColumn"],
      newContent
    );
  }

  static otm(entityContent, relationContent, entity, relationEntity) {
    return this.otmCommon(
      entityContent,
      relationContent,
      entity,
      relationEntity
    );

    // throw new Error("Fonctionnalite pas encore disponible");
  }

  static mtm(name, required) {
    throw new Error("Fonctionnalite pas encore disponible");
  }
}
export default Maker;
