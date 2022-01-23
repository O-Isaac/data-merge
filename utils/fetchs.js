const ENDPOINTS = require('../types/endpoints');
const { bold } = require('kleur');
const axios = require('axios');

const CONNECTION = async (endpoint) => {
    try {
        const { data } = await axios.get(endpoint);
        return data;
    } catch (err) {
        throw Error(`${bold().red(`${err.message}`)}`);
    }
}

const FETCHS = {
    SERVANTS: async () => CONNECTION(ENDPOINTS.SERVANTS),
    CRAFTS: async () => CONNECTION(ENDPOINTS.CRAFTS),
    CMD_CODES: async () => CONNECTION(ENDPOINTS.CMD_CODES),
    AKAS: async () => CONNECTION(ENDPOINTS.AKAS),
    MYSTIC_CODES: async () => CONNECTION(ENDPOINTS.MYSTIC_CODES),
}

module.exports = FETCHS;