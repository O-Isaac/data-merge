const DATA_FUNCTION_CRAFTS = async (data, FETCHS, jsonpath) => {
    const atlas = await FETCHS.CRAFTS();
    
    const merged = data.map((c) => {
        const {no} = c;
        
        let ce = atlas.find(a => a.collectionNo === no);

        if(!ce) {
            throw Error('Craft Essence not found!');
        }

        const skills = {
            default: (c.skillEn || c.skill || "No has skill"),
            mlb: (c.skillMaxEn ||c.skillMax || "No has skill"),
        } 

        // Change ce.extraAssets 
        let assets = {};

        Object.entries(ce.extraAssets).forEach(([key, value]) => {
            
            const imagesUrl = [];

            if(value && Object.keys(value).length > 0) {
                const vals = Object.values(value)
                
                const urls = Object.entries(vals).map(([key, value]) => {
                    return Object.values(value);
                })

                imagesUrl.push(...urls);
            };

            
            assets[key] = {
                image: imagesUrl.flat(),
            }

        })

        ce.extraAssets = assets;

        return {
            ...ce,
            skills
        }
    })

    return merged
}


module.exports = DATA_FUNCTION_CRAFTS;