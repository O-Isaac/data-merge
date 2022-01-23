const DATA_FUNCTION_SERVANTS =  async (data, FETCHS, jsonpath) => {
    const atlas = await FETCHS.SERVANTS();
    const AKAS = await FETCHS.AKAS();

    const merged = atlas
    .filter(s => 
        !s.className.includes('beast') && 
        !s.className.includes('grandCaster') &&
        s.collectionNo !== 285)
    .map(servant => {
        let {id, collectionNo, name, className, extraAssets} = servant;
        let {info, activeSkillsEn} = data.find(s => s.no === collectionNo);
        const skillsAtlas = servant.skills;

        // Mutating extraAssets
        let assets = {}

        Object.entries(extraAssets).forEach(([key, value]) => {
            let values = {
                ascension: [],
                costume: [],
            }

            if(value !== null || value !== undefined) {
                // Has values in value.ascension
                if (value.ascension && Object.keys(value.ascension).length > 0) {
                    values.ascension.push(...Object.values(value.ascension));
                }

                // Has values in value.costume
                if (value.costume && Object.keys(value.costume).length > 0) {
                    values.costume.push(...Object.values(value.costume));
                };
            }

            assets[key] = {
                ['ascension']: values.ascension,
                ['costume']: values.costume,
            }

        })

        // Mutating skills
        const skillsPath = jsonpath.query(activeSkillsEn, '$.*.skills.*')
        .filter(skill => skill.state !== "Old")
        .map((skill, index) => {
            const {name, icon, id, num} = skillsAtlas[index];
            const effects = skill.effects.map(effect => {
                return (effect.description + '' + (effect.lvData.length > 0 ? ` (${effect.lvData.join(', ')})` : '')).trim();
            });


            return {
                name, icon, id, effects, num
            }

        });


        // Mutating info.nicknames
        const nicknames = AKAS.find(aka => aka.collectionNo === collectionNo);

        if(nicknames && nicknames.AKA.length > 0) {
            info.nicknames = nicknames.AKA.map(aka => aka.toLowerCase());
            
            if(nicknames.group.length > 0) {
                info.nicknames.push(...nicknames.group.map(group => group.toLowerCase()));
            }

        }

        return {
            id,
            collectionNo,
            name,
            className,
            extraAssets: assets,
            info,
            skills: skillsPath
        }

    });
    
    return merged;
}

module.exports = DATA_FUNCTION_SERVANTS;