const CraftEssence = require('./craftEssence');
const Servant = require('./servant');


module.exports = {
    Schemas: [
        CraftEssence.schema,
        Servant.schema,
    ],
    Resolvers: () => {        
        let EntriesServants = Servant.resolver.Query
        let EntriesCraftEssence = CraftEssence.resolver.Query

        return {
            resolver: {
                Query: {
                    ...EntriesServants,
                    ...EntriesCraftEssence,
                }
            }
        }
    },
}