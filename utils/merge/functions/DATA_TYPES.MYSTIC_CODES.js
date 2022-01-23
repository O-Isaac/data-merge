const DATA_FUNCTION_MYSTIC_CODES = async (data, FETCHS, jsonpath) => {
    const atlas_mystic_codes = await FETCHS.MYSTIC_CODES();
    const mysticCodes = data;

    const merged = mysticCodes.map((code, index) => {
        const atlas_code = atlas_mystic_codes[index];

        let images = {};

        Object.entries(atlas_code.extraAssets).forEach(([key, value]) => {
            const femaleImages = [];
            const maleImages = [];

            if(value && Object.keys(value).length > 0) {
                
                Object.entries(value).forEach(([key, value]) => {
                    if(key === 'male') maleImages.push(value)
                    if(key === 'female') femaleImages.push(value)
                });
            
            }

            images[key] = {
                female: femaleImages,
                male: maleImages
            }
        });

        const SkillMysticCode = code.skills.map((skill, index) => {

            const effects = skill.effects.map(effect => {
                return ((effect.descriptionEn || effect.description) + '' + (effect.lvData.length > 0 ? ` (${effect.lvData.join(', ')})` : '')).trim();
            });

            const icon = atlas_code.skills[index].icon || "";

            return {
                name: skill.nameEn || skill.nameJp || skill.name || "???",
                icon,
                effects
            }
        })

        return {
            name: code.nameEn || code.nameJp || code.name,
            description: code.descriptionEn || code.descriptionJp || code.description,
            obtain: code.obtainsEn.length > 0 ? code.obtainsEn : false || code.obtains.length > 0 ? code.obtains : false || "???",
            skills: SkillMysticCode,
            images
        }

    })

    return merged
}

module.exports = DATA_FUNCTION_MYSTIC_CODES