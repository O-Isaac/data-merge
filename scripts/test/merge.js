const parsedDataset = require('../../utils/dataset');
const mergeData = require('../../utils/merge/index');

const mergeAll = async () => {    
    const { servants, craftEssences, commandCodes, mysticCodes } = await parsedDataset();

    await mergeData(mysticCodes);
    await mergeData(servants);
    await mergeData(craftEssences);
    await mergeData(commandCodes);
}


mergeAll();