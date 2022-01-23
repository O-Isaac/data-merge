const parsedDataset = require('../utils/dataset');
const mergeData = require('../utils/merge/index');

const mergeAll = async () => {    
    const { servants, craftEssences, commandCodes } = await parsedDataset();

    await mergeData(servants);
    await mergeData(craftEssences);
    await mergeData(commandCodes);
}


module.exports = mergeAll;