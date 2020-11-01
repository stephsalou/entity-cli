const fs = require("fs");
const path = require("path");
const {getSrcPathFormConfigFile} = require("../configFile");


export const getModules = () =>{
    const src = getSrcPathFormConfigFile();
    try {
        return fs.readdirSync(src, {encoding: "utf8"})
            .filter(file => fs.lstatSync(path.join(src, file)).isDirectory())
    } catch (_) {
        return []
    }
};

const getModuleEntities = () => {};
