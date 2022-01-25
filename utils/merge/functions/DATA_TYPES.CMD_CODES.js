const DATA_FUNCTION_CMD_CODES = async (data, FETCHS, jsonpath) => {
    const atlas = await FETCHS.CMD_CODES();
    
    const merged = data.map((cmdCode) => {

        const commandCode = atlas.find(a => a.collectionNo === cmdCode.no);

        let images = {};

        if(!commandCode) {
            throw Error('Command Code not found!');
        }

        Object.entries(commandCode.extraAssets).forEach(([key, value]) => {
            let ImagesOfCommandsCodes = [];
            
            
            if(value.cc && Object.keys(value.cc).length > 0) {
                ImagesOfCommandsCodes = [...Object.values(value.cc)]
            }
            
            
            images[key] = ImagesOfCommandsCodes
        })

        const skills = commandCode.skills.map(skill => {
            
            const detail = {
                skill: (cmdCode.skillEn || cmdCode.skill || "No has skill"),
                description: (cmdCode.descriptionEn || cmdCode.description || "No has description"),
            }

            delete skill.functions
            
            return {
                ...skill,
                detail: detail,
            }

        })

        return {
            ...commandCode,
            extraAssets: images,
            skills: skills[0]
        }
    })

    return merged
}

module.exports = DATA_FUNCTION_CMD_CODES; 