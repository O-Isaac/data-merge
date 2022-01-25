const CraftEssence = require('./craftEssence');
const Servant = require('./servant');
const mysticCodes = require('./mysticCodes');
const cmdCodes = require('./cmdCodes');

module.exports = {
    Schemas: [
        CraftEssence.schema,
        Servant.schema,
        mysticCodes.schema,
        cmdCodes.schema
    ],
    Resolvers: () => {        
        let EntriesServants = Servant.resolver.Query
        let EntriesCraftEssence = CraftEssence.resolver.Query
        let EntriesMysticCodes = mysticCodes.resolvers.Query
        let EntriesCmdCodes = cmdCodes.resolvers.Query

        return {
            resolver: {
                Query: {
                    ...EntriesServants,
                    ...EntriesCraftEssence,
                    ...EntriesMysticCodes,
                    ...EntriesCmdCodes
                }
            }
        }
    },
}