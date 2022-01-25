const getDataset = require('./unzip');
const { bold } = require('kleur');

(async () => {
    process.on('SIGINT', () => {
        console.log(`${bold().red('❌ Process stopped! by user')}`)
        process.exit(0)
    });

 
    await getDataset()
})();