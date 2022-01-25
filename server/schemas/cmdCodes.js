const { gql } = require("apollo-server");
const { QueryCE } = require('../../utils/query');
const cmdCodesData = require('../../dataset/merge/cmdCodes.json');

const cmdCodes = {
    schema: gql`
        type cmdCodesExtraAssets {
            charaGraph: [String],
            faces: [String],
        }

        type cmdCodeSkillsDetail {
            skill: String,
            description: String,
        }

        type cmdCodeSkills {
            id: Int,
            name: String,
            ruby: String,
            detail: cmdCodeSkillsDetail,
            type: String,
            icon: String,
        }

        type cmdCodes {
            id: Int,
            collectionNo: Int,
            name: String,
            rarity: Int,
            extraAssets: cmdCodesExtraAssets,
            skills: cmdCodeSkills,
            illustrator: String,
            comment: String,
        }

        extend type Query {
            cmdCodes: [cmdCodes],
            cmdCodeById(id: Int!): cmdCodes,
            cmdCodeByName(name: String!): cmdCodes,
        }
    `,

    resolvers: {
        Query: {
            cmdCodes: () => cmdCodesData,
            cmdCodeById: (parent, args, context, info) => cmdCodesData.find(cmdCode => cmdCode.id === args.id || cmdCode.collectionNo === args.id),
            cmdCodeByName: (parent, args, context, info) => QueryCE(cmdCodesData, args.name),
        }
    }
}

module.exports = cmdCodes;