/**
 * Parse dataset into a usable format
 */
const fs = require('fs');
const path = require('path');
const { bold } = require('kleur');
const DATA_TYPES = require('../types/data');

const readDataset = async () => {

    try {
        const dataset = path.join(process.cwd(), "dataset", "data", "dataset.json");

        const data = fs.readFileSync(dataset);  

        return JSON.parse(data)

    } catch (err) {
        throw Error(`${bold().red(`${err.message}`)}`);
    }


};

const parseDataset = async () => {
    const data = await readDataset();

    const servants = { type: DATA_TYPES.SERVANTS, data: Array.from(Object.values(data.servants))}
    const craftEssences = { type: DATA_TYPES.CRAFTS, data: Array.from(Object.values(data.crafts))}
    const nonServants = { type: DATA_TYPES.UNAVAILABLE_SVTS, data: Array.from(Object.values(data.unavailableSvts))}
    const commandCodes = { type: DATA_TYPES.CMD_CODES, data: Array.from(Object.values(data.cmdCodes)) };
    const events = { type: DATA_TYPES.EVENTS, data: Array.from(Object.values(data.events)) };
    const items = { type: DATA_TYPES.ITEMS, data:  Array.from(Object.values(data.items)) };
    const quests = {
        free: { type: DATA_TYPES.FREE_QUESTS, data: Array.from(Object.values(data.freeQuests)) },
        servant: { type: DATA_TYPES.SVT_QUESTS, data: Array.from(Object.values(data.svtQuests)) },
    }
    const mysticCodes = { type: DATA_TYPES.MYSTIC_CODES, data: Array.from(Object.values(data.mysticCodes)) };
    const summons = { type: DATA_TYPES.SUMMONS, data: Array.from(Object.values(data.summons)) };


    return {
        servants,
        craftEssences,
        nonServants,
        commandCodes,
        events,
        items,
        quests,
        mysticCodes,
        summons
    }
};

module.exports = parseDataset;