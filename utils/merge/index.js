// MODULES & DEPENDENCIES
const DATA_TYPES = require('../../types/data');
const FETCHS = require('../fetchs');

const fs = require('fs');
const jsonpath = require('jsonpath');
const path = require('path');

const { bold } = require('kleur');

// FUNCTIONS BY DATA TYPE
const DATA_FUNCTION_SERVANTS = require('./functions/DATA_TYPES.SERVANTS.js');
const DATA_FUNCTION_CRAFTS = require('./functions/DATA_TYPES.CRAFTS.js');
const DATA_FUNCTION_CMD_CODES = require('./functions/DATA_TYPES.CMD_CODES.js');
const DATA_FUNCTION_MYSTIC_CODES = require('./functions/DATA_TYPES.MYSTIC_CODES.js');

// MERGER ACTIONS 
const MERGER_ACTIONS = {
    [DATA_TYPES.SERVANTS]: DATA_FUNCTION_SERVANTS,
    [DATA_TYPES.CRAFTS]: DATA_FUNCTION_CRAFTS,
    [DATA_TYPES.CMD_CODES]: DATA_FUNCTION_CMD_CODES,
    [DATA_TYPES.MYSTIC_CODES]: DATA_FUNCTION_MYSTIC_CODES,
}

// MAIN FUNCTION
module.exports = async function (dataset) {
    console.log(`🧱${bold().green(`Start merging dataset ${dataset.type} with atlas academy assets!`)}`);
    console.time(`⌛ ${bold().blue('Data merged in')}`)

    const merged = await MERGER_ACTIONS[dataset.type](dataset.data, FETCHS, jsonpath);
    const dataPath = path.join(process.cwd(), "dataset", "merge");
    
    if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);

    const DataStringfify = JSON.stringify(merged, null, 2);
    fs.writeFileSync(dataPath + `/${dataset.type}.json`, DataStringfify);

    console.timeEnd(`⌛ ${bold().blue('Data merged in')}`)
}