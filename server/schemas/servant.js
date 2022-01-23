const { gql } = require("apollo-server");
const servants = require("../../dataset/merge/servants.json");
const { QueryArray } = require("../../utils/query");

/**
 * ## Schema for Servant
 */
const ServantSchema = {
  schema: gql`

    # Types for info section

    type Ability {
        strength: String,
        endurance: String,
        agility: String,
        mana: String,
        luck: String,
        np: String
    }

    type CardHits {
        Quick: Int,
        Arts: Int,
        Buster: Int,
        Extra: Int,
        NP: Int
    }

    type CardHitsDamage {
        Quick: [Int],
        Arts: [Int],
        Buster: [Int],
        Extra: [Int],
        NP: [Int]
    }

    # This type has key and value dynamically
    type Illustrations {
        key: String,
        value: String
    }

    type Info {
        gameId: Int,
        name: String,
        nameJp: String,
        nameEn: String,
        namesOther: [String],
        namesJpOther: [String],
        namesEnOther: [String],
        nicknames: [String],
        obtain: String,
        obtains: [String],
        rarity: Int,
        rarity2: Int,
        weight: String,
        height: String,
        gender: String,
        illustrator: String,
        illustratorJp: String,
        illustratorEn: String,
        className: String,
        attribute: String,
        isHumanoid: Boolean,
        isWeakToEA: Boolean,
        isTDNS: Boolean,
        cv: [String],
        cvJp: [String],
        cvEn: [String],
        alignments: [String],
        traits: [String],
        ability: Ability,
        illustrations: Illustrations,
        cards: [String],
        cardHits: CardHits,
        cardHitsDamage: CardHitsDamage,
        atkMin: Int,
        hpMin: Int,
        atkMax: Int,
        hpMax: Int,
        atk90: Int,
        hp90: Int,
        atk100: Int,
        hp100: Int,
        starRate: String,
        deathRate: String,
        criticalRate: String
    }

    # Types for ascension / assets section

    # Value pair schema type 
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

    # Skill Section
    type Skill {
        name: String,
        icon: String,
        id: Int,
        effects: [String],
        num: Int
    }


    # Main type

    type servant {
        id: Int,
        collectionNo: Int,
        name: String,
        className: String,
        info: Info,
        extraAssets: ExtraAssets,
        skills: [Skill]
    }

    # Make a query for servant
    type Query {
        servantById(id: Int): servant, # servant(id: Int)
        servantByName(name: String): [servant], # servant(name: String)
        servants: [servant], # [servant]
    }

`,

  resolver: {
    Query: {
        servantById: (_, args, context) => {
            return servants.find(servant => servant.id == args.id || servant.collectionNo == args.id);
        },

        servantByName: (_, args, context) => {
            const regex = new RegExp(args.name.toLowerCase(), "gi");    
            return servants.filter(servant => servant.info.name == args.name || servant.info.nameJp == args.name || servant.info.nameEn == args.name || QueryArray(servant.info.nicknames, regex));
        },
        
        servants: (_, args, context) => {
            return servants;
        },
    },
  },
};

module.exports = ServantSchema;
