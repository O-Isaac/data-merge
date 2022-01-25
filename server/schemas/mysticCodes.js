const { gql } = require("apollo-server");
const mysticCodes = require('../../dataset/merge/mysticCodes.json');
const { QueryCE } = require('../../utils/query');

const MysticCodes = {
    schema: gql`
    
    type SkillMysticCode {
        name: String
        icon: String
        effects: [String]
    }

    type ImageMysticCodeType {
        female: [String],
        male: [String]
    }

    type ImagesMysticCode {
        item: ImageMysticCodeType
        masterFace: ImageMysticCodeType
        masterFigure: ImageMysticCodeType
    }

    type MysticCode {
        name: String,
        description: String,
        obtain: [String],
        skills: [SkillMysticCode]
        images: ImagesMysticCode
    }
    
    type Query {
        mysticCodes: [MysticCode]
        mysticCodeByName(name: String!): [MysticCode]
    }

    `,


    resolvers: {
        Query: {
            mysticCodes: (_, args, context) => {
                return mysticCodes;
            },
            mysticCodeByName: (_, args, context) => {
                return QueryCE(mysticCodes, args.name);
            }
        }
    }
}

module.exports = MysticCodes;