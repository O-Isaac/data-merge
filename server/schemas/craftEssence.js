const { gql } = require("apollo-server");
const crafts = require('../../dataset/merge/crafts.json');
const { QueryCE } = require('../../utils/query');

const CraftEssence = {
    schema: gql`
    
        type GraphKey {
            ascension: [String],
            costume: [String],
        }

        type ExtraAssets {
            charaGraph: GraphKey,
            faces: GraphKey,
            charaGraphEx: GraphKey,
            charaGraphName: GraphKey,
            narrowFigure: GraphKey,
            charaFigure: GraphKey,
            charaFigureForm: GraphKey,
            charaFigureMulti: GraphKey,
            commands: GraphKey,
            status: GraphKey,
            equipFace: GraphKey,
            image: GraphKey,
        }

        type SkillCE {
            default: String,
            mlb: String,
        }

        type CraftEssence {
            id: Int,
            name: String,
            collectionNo: Int,
            type: String,
            flag: String,
            rarity: Int,
            cost: Int,
            lvMax: Int,
            extraAssets: ExtraAssets @cacheControl(maxAge: 31536000),
            atkBase: Int,
            atkMax: Int,
            hpBase: Int,
            hpMax: Int,
            growthCurve: Int,
            atkGrowth: [Int],
            hpGrowth: [Int],
            expGrowth: [Int],
            expFeed: [Int],
            skills: SkillCE @cacheControl(maxAge: 31536000)
        }

        type Query {
            craftEssenceById(id: Int): CraftEssence  @cacheControl(maxAge: 31536000),
            craftEssenceByName(name: String): [CraftEssence]  @cacheControl(maxAge: 31536000)
            craftEssences: [CraftEssence]  @cacheControl(maxAge: 31536000)
        }

    `,
   
    resolver: {
        Query: {
            craftEssenceById: (_, args, context) => {
                return crafts.find(craft => craft.id === args.id || craft.collectionNo === args.id);
            },
            craftEssenceByName: (_, args, context) => {
                return QueryCE(crafts, args.name);
            },
            craftEssences: (_, args, context) => {
                return crafts;
            }
        }
    }
}


module.exports = CraftEssence