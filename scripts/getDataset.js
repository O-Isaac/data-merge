const { bold } = require("kleur");
const axios = require("axios");
const jsonpath = require("jsonpath");

/**
 * Get the dataset from the API github
 * @param {string} version tag of the dataset
 * @returns dataset in json format
 * @throws error if the dataset is not found
 * @throws error if the dataset is not valid
 * @example
 * getDataset("v1.0.0");
 * // returns dataset in json format
 */
const getVersion = async (version = "") => {
  try {
    const uri =
      "https://api.github.com/repos/chaldea-center/chaldea-dataset/releases";
    
    const response = await axios.get(uri);
    const data = response.data;

    if (!version) {
        const lastest = data[0];
        const URI_DOWNLOAD = jsonpath.query(lastest, "$.assets.*.browser_download_url");

        if(URI_DOWNLOAD.length === 0) {
            throw new Error("No dataset found");
        }

        return {
            assets: URI_DOWNLOAD,
            tag: lastest.name
        };
    }

    const release = data.find((release) => release.name === version);

    if (!release) {
      throw new Error(`Version ${version} not found.`);
    }

    const URI_DOWNLOAD = jsonpath.query(release, "$.assets.*.browser_download_url");
    
    if(URI_DOWNLOAD.length === 0) {
        throw new Error("No dataset found");
    }

    return {
        assets: URI_DOWNLOAD,
        tag: release.name
    };

  } catch (err) {
      throw Error(`${bold().red(`${err.message}`)}`);
  }
};

module.exports = getVersion;