const fs = require('fs');
const axios = require('axios');
const path = require('path');
const getDataset = require('./getDataset');
const { bold } = require('kleur');
const zip = require('onezip');
const cliProgress = require('cli-progress');
const mergedData = require('./merge');


const unzip = async (tag) => {
    try {
        const dataset = path.join(process.cwd(), "dataset", "download");
        const datasetUnzip = path.join(process.cwd(), "dataset", "data");

        // Create the directory if it does not exist
        if (!fs.existsSync(datasetUnzip)) {
            fs.mkdirSync(datasetUnzip);
        }

        const pack = zip.extract(dataset + '/dataset.zip', datasetUnzip);

        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        pack.on('start', () => {
            console.log(`📦 ${bold().green('ZIP')} The dataset ${tag} is being extracted!`);
            console.clear();
            bar.start(100, 0);
        });

        
        pack.on('error', (error) => {
            throw Error(error.message)
        });

        pack.on('progress', (value) => {
            bar.update(value);
        });

        pack.on('end', () => {
            bar.stop();
            console.clear();
            console.log(`📦 ${bold().green('ZIP')} The dataset ${tag} has been extracted!`);
            mergedData();
        });
        

    } catch (err) {
        throw Error(`${bold().red(`${err.message}`)}`);
    }
};

const download = async () => {
    try {

        const { assets, tag } = await getDataset();
        
        const uri = assets[0];

        console.log(`📥 ${bold().green('Download')} The dataset ${tag} is downloading!`);
        console.time(`📥 ${bold().blue('Download')} The dataset ${tag} downloaded in`);
        const rootDataset = path.join(process.cwd(), "dataset");
        
        // Create the directory if it does not exist
        if(!fs.existsSync(rootDataset)) {
            fs.mkdirSync(rootDataset);
        }

        const dataset = path.join(rootDataset, "download");

        // Create the directory if it does not exist
        if (!fs.existsSync(dataset)) {
            fs.mkdirSync(dataset);
        }

        const response = await axios.get(uri, {
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(dataset + '/dataset.zip'));

        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                resolve();
            });

            response.data.on('error', (err) => {
                reject(err);
            });
        }).then(async () => {
            console.log(`📥 ${bold().green('Download')} The dataset ${tag} has been downloaded!`);
            console.timeEnd(`📥 ${bold().blue('Download')} The dataset ${tag} downloaded in`);
            setTimeout(() => unzip(tag), 3000)
        });


    } catch (err) {
        throw Error(`${bold().red(`${err.message}`)}`);
    }
};

module.exports = download;