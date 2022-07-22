import mongoose from "mongoose";

export interface playerInfoModel extends playerInfo {
  _id: {
    $oid: string;
  };
}

export const wow = new mongoose.Schema({
  timestamp: { type: Number, default: 0 },
  username: { type: String, default: "noname"},
  email: { type: String, default: "test@test.com"},
  password: { type: String, default: "hunter2lol"},
  Experience: {
    Woodcutting: { type: Number, default: 0 },
    Firemaking: { type: Number, default: 0 },
    Fishing: { type: Number, default: 0 },
    Attack: { type: Number, default: 0 },
    Strength: { type: Number, default: 0 },
    Defence: { type: Number, default: 0 },
    Constitution: { type: Number, default: 1358 },
    Prayer: { type: Number, default: 0 },
    Summoning: { type: Number, default: 0 },
    Ranged: { type: Number, default: 0 },
    Magic: { type: Number, default: 0 },
    Cooking: { type: Number, default: 0 },
    Mining: { type: Number, default: 0 },
    Thieving: { type: Number, default: 0 },
    Crafting: { type: Number, default: 0 },
  },
  Bank_Fish: {
    raw_shrimp: {
      name: { type: String, default: "raw_shrimp" },
      amount: { type: Number, default: 0 },
    },
    raw_crayfish: {
      name: { type: String, default: "raw_crayfish" },
      amount: { type: Number, default: 0 },
    },
    raw_anchovies: {
      name: { type: String, default: "raw_anchovies" },
      amount: { type: Number, default: 0 },
    },
    raw_trout: {
      name: { type: String, default: "raw_trout" },
      amount: { type: Number, default: 0 },
    },
    raw_salmon: {
      name: { type: String, default: "raw_salmon" },
      amount: { type: Number, default: 0 },
    },
    raw_pike: {
      name: { type: String, default: "raw_pike" },
      amount: { type: Number, default: 0 },
    },
    raw_sardine: {
      name: { type: String, default: "raw_sardine" },
      amount: { type: Number, default: 0 },
    },
    raw_herring: {
      name: { type: String, default: "raw_herring" },
      amount: { type: Number, default: 0 },
    },
  },
  Bank_Logs: {
    logs: {
      name: { type: String, default: "logs" },
      amount: { type: Number, default: 0 },
    },
    oak: {
      name: { type: String, default: "oak" },
      amount: { type: Number, default: 0 },
    },
    willow: {
      name: { type: String, default: "willow" },
      amount: { type: Number, default: 0 },
    },
    maple: {
      name: { type: String, default: "maple" },
      amount: { type: Number, default: 0 },
    },
    yew: {
      name: { type: String, default: "yew" },
      amount: { type: Number, default: 0 },
    },
    magic: {
      name: { type: String, default: "magic" },
      amount: { type: Number, default: 0 },
    },
    elder: {
      name: { type: String, default: "elder" },
      amount: { type: Number, default: 0 },
    },
  },
  Inventory: {
    CurrentInventory: { type: Array<String> },
  },
  Location: {
    CurrentLocation: { type: String, default: "Lumbridge" },
  },
  Skill: {
    CurrentSkill: { type: String, default: "none" },
  },
  CombatStyle: {
    CurrentStyle: { type: String, default: "none"  },
  },
  Activity: {
    CurrentActivity: { type: String, default: "Idle" },
  },
  Resource: {
    CurrentResource: { type: String, default: "none" },
  },
  Target: {
    CurrentTarget: { type: String, default: "none" },
  },
  Quest: {
    CurrentQuest: { type: String, default: "none" },
  },
  Resources: {
    Banking: { type: Boolean, default: false },
    Dropping: { type: Boolean, default: false },
  },
  Wallet: {
    coins: { type: Number, default: 1000 },
  },
  QuestPoints: {
    CurrentQuestPoints: { type: Number, default: 0 },
  },
  Quests_Lumbridge: {
    LumbridgeQuestArray: [
      {
        name: { type: String, default: "Cook's Assistant" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 20 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Myths of the White Lands" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 35 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "The Restless Ghost" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 14 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "The Lost Tribe" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 33 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "The Blood Pact" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 17 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Buyers and Cellars" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 15 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Lost City" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 26 },
        complete: { type: Boolean, default: false },
      },
    ],
  },
  Quests_Draynor: {
    DraynorQuestArray: [
      {
        name: { type: String, default: "A Fairy Tale I - Growing Pains" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 35 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "A Fairy Tale II - Cure a Queen" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 36 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Vampyre Slayer" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 23 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Ernest the Chicken" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 40 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Animal Magnetism" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 52 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Love Story" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 44 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Swept Away" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 30 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Missing My Mummy" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 45 },
        complete: { type: Boolean, default: false },
      },
      {
        name: { type: String, default: "Stolen Hearts" },
        stepsComplete: { type: Number, default: 0 },
        stepsTotal: { type: Number, default: 29 },
        complete: { type: Boolean, default: false },
      },
    ],
  },
  BodySlot: {
    playerOwnsbronzeplatebody: { type: Boolean, default: false },
    playerOwnsironplatebody: { type: Boolean, default: false },
    playerOwnssteelplatebody: { type: Boolean, default: false },
    playerOwnsmithrilplatebody: { type: Boolean, default: false },
    playerOwnsadamantplatebody: { type: Boolean, default: false },
    playerOwnsruneplatebody: { type: Boolean, default: false },
    playerOwnswizardrobetop: { type: Boolean, default: false },
    playerOwnsimphiderobetop: { type: Boolean, default: false },
    playerOwnsspidersilkrobetop: { type: Boolean, default: false },
    playerOwnsbatwingtorso: { type: Boolean, default: false },
    playerOwnssplitbarkbody: { type: Boolean, default: false },
    playerOwnsleatherbody: { type: Boolean, default: false },
    playerOwnshardleatherbody: { type: Boolean, default: false },
    playerOwnsstuddedbody: { type: Boolean, default: false },
    playerOwnscarapacetorso: { type: Boolean, default: false },
    playerOwnsgreendragonhidebody: { type: Boolean, default: false },
  },
  HandSlot: {
    playerOwnsbronzegauntlets: { type: Boolean, default: false },
    playerOwnsirongauntlets: { type: Boolean, default: false },
    playerOwnssteelgauntlets: { type: Boolean, default: false },
    playerOwnsmithrilgauntlets: { type: Boolean, default: false },
    playerOwnsadamantgauntlets: { type: Boolean, default: false },
    playerOwnsrunegauntlets: { type: Boolean, default: false },
    playerOwnswizardgloves: { type: Boolean, default: false },
    playerOwnsimphidegloves: { type: Boolean, default: false },
    playerOwnsspidersilkgloves: { type: Boolean, default: false },
    playerOwnsbatwinggloves: { type: Boolean, default: false },
    playerOwnssplitbarkgauntlets: { type: Boolean, default: false },
    playerOwnsleathervambraces: { type: Boolean, default: false },
    playerOwnshardleathergloves: { type: Boolean, default: false },
    playerOwnsstuddedleathergloves: { type: Boolean, default: false },
    playerOwnscarapacegloves: { type: Boolean, default: false },
    playerOwnsgreendragonhidevambraces: { type: Boolean, default: false },
  },
  FeetSlot: {
    playerOwnsbronzearmouredboots: { type: Boolean, default: false },
    playerOwnsironarmouredboots: { type: Boolean, default: false },
    playerOwnssteelarmouredboots: { type: Boolean, default: false },
    playerOwnsmithrilarmouredboots: { type: Boolean, default: false },
    playerOwnsadamantarmouredboots: { type: Boolean, default: false },
    playerOwnsrunearmouredboots: { type: Boolean, default: false },
    playerOwnswizardboots: { type: Boolean, default: false },
    playerOwnsimphideboots: { type: Boolean, default: false },
    playerOwnsspidersilkboots: { type: Boolean, default: false },
    playerOwnsbatwingboots: { type: Boolean, default: false },
    playerOwnssplitbarkboots: { type: Boolean, default: false },
    playerOwnsleatherboots: { type: Boolean, default: false },
    playerOwnshardleatherboots: { type: Boolean, default: false },
    playerOwnsstuddedleatherboots: { type: Boolean, default: false },
    playerOwnscarapaceboots: { type: Boolean, default: false },
    playerOwnsgreendragonhideboots: { type: Boolean, default: false },
  },
  HeadSlot: {
    playerOwnsbronzefullhelm: { type: Boolean, default: false },
    playerOwnsironfullhelm: { type: Boolean, default: false },
    playerOwnssteelfullhelm: { type: Boolean, default: false },
    playerOwnsmithrilfullhelm: { type: Boolean, default: false },
    playerOwnsadamantfullhelm: { type: Boolean, default: false },
    playerOwnsrunefullhelm: { type: Boolean, default: false },
    playerOwnswizardhat: { type: Boolean, default: false },
    playerOwnsimphidehood: { type: Boolean, default: false },
    playerOwnsspidersilkhood: { type: Boolean, default: false },
    playerOwnsbatwinghood: { type: Boolean, default: false },
    playerOwnssplitbarkhelm: { type: Boolean, default: false },
    playerOwnsleathercowl: { type: Boolean, default: false },
    playerOwnshardleathercowl: { type: Boolean, default: false },
    playerOwnsstuddedleathercoif: { type: Boolean, default: false },
    playerOwnscarapacehelm: { type: Boolean, default: false },
    playerOwnsgreendragonhidecoif: { type: Boolean, default: false },
  },
  LegsSlot: {
    playerOwnsbronzeplatelegs: { type: Boolean, default: false },
    playerOwnsironplatelegs: { type: Boolean, default: false },
    playerOwnssteelplatelegs: { type: Boolean, default: false },
    playerOwnsmithrilplatelegs: { type: Boolean, default: false },
    playerOwnsadamantplatelegs: { type: Boolean, default: false },
    playerOwnsruneplatelegs: { type: Boolean, default: false },
    playerOwnswizardrobeskirt: { type: Boolean, default: false },
    playerOwnsimphiderobebottom: { type: Boolean, default: false },
    playerOwnsspidersilkrobebottom: { type: Boolean, default: false },
    playerOwnsbatwinglegs: { type: Boolean, default: false },
    playerOwnssplitbarklegs: { type: Boolean, default: false },
    playerOwnsleatherchaps: { type: Boolean, default: false },
    playerOwnshardleatherchaps: { type: Boolean, default: false },
    playerOwnsstuddedchaps: { type: Boolean, default: false },
    playerOwnscarapacelegs: { type: Boolean, default: false },
    playerOwnsgreendragonhidechaps: { type: Boolean, default: false },
  },
  BackSlot: {
    playerOwnsbladestormdrape: { type: Boolean, default: false },
    playerOwnsspellstormdrape: { type: Boolean, default: false },
    playerOwnsarrowstormdrape: { type: Boolean, default: false },
    playerOwnspathfindercape: { type: Boolean, default: false },
    playerOwnsteamcape: { type: Boolean, default: false },
    playerOwnsobsidiancape: { type: Boolean, default: false },
  },
  RingSlot: {
    playerOwnswarriorring: { type: Boolean, default: false },
    playerOwnsseersring: { type: Boolean, default: false },
    playerOwnsarcherring: { type: Boolean, default: false },
    playerOwnsringofpotency: { type: Boolean, default: false },
    playerOwnsringofwealth: { type: Boolean, default: false },
    playerOwnsberserkerring: { type: Boolean, default: false },
  },
  NeckSlot: {
    playerOwnsamuletofstrength: { type: Boolean, default: false },
    playerOwnsamuletofmagic: { type: Boolean, default: false },
    playerOwnsamuletofaccuracy: { type: Boolean, default: false },
    playerOwnsholysymbol: { type: Boolean, default: false },
    playerOwnsamuletofdefence: { type: Boolean, default: false },
    playerOwnsamuletofpower: { type: Boolean, default: false },
    playerOwnsamuletofglory: { type: Boolean, default: false },
    playerOwnsamuletoffury: { type: Boolean, default: false },
  },
  TwoHandSlot: {
    playerOwnsbronze2hsword: { type: Boolean, default: true },
    playerOwnsiron2hsword: { type: Boolean, default: false },
    playerOwnssteel2hsword: { type: Boolean, default: false },
    playerOwnsmithril2hsword: { type: Boolean, default: false },
    playerOwnsadamant2hsword: { type: Boolean, default: false },
    playerOwnsrune2hsword: { type: Boolean, default: false },
    playerOwnsstaffofair: { type: Boolean, default: true },
    playerOwnsstaffofwater: { type: Boolean, default: false },
    playerOwnsstaffofearth: { type: Boolean, default: false },
    playerOwnsstaffoffire: { type: Boolean, default: false },
    playerOwnsairbattlestaff: { type: Boolean, default: false },
    playerOwnswaterbattlestaff: { type: Boolean, default: false },
    playerOwnsearthbattlestaff: { type: Boolean, default: false },
    playerOwnsfirebattlestaff: { type: Boolean, default: false },
    playerOwnsmysticairstaff: { type: Boolean, default: false },
    playerOwnsmysticwaterstaff: { type: Boolean, default: false },
    playerOwnsmysticearthstaff: { type: Boolean, default: false },
    playerOwnsmysticfirestaff: { type: Boolean, default: false },
    playerOwnsshortbow: { type: Boolean, default: true },
    playerOwnsoakshortbow: { type: Boolean, default: false },
    playerOwnswillowshortbow: { type: Boolean, default: false },
    playerOwnsmapleshortbow: { type: Boolean, default: false },
    playerOwnsyewshortbow: { type: Boolean, default: false },
    playerOwnsmagicshortbow: { type: Boolean, default: false },
  },
  Hatchets: {
    playerOwnsbronzehatchet: { type: Boolean, default: false },
    playerOwnsironhatchet: { type: Boolean, default: false },
    playerOwnssteelhatchet: { type: Boolean, default: false },
    playerOwnsmithrilhatchet: { type: Boolean, default: false },
    playerOwnsadamanthatchet: { type: Boolean, default: false },
    playerOwnsrunehatchet: { type: Boolean, default: false },
  },
});

interface playerInfo {
  Experience: {
    Woodcutting: number;
    Firemaking: number;
    Fishing: number;
    Attack: number;
    Strength: number;
    Defence: number;
    Constitution: number;
    Prayer: number;
    Summoning: number;
    Ranged: number;
    Magic: number;
    Cooking: number;
    Mining: number;
    Thieving: number;
    Crafting: number;
  };
  Bank_Fish: {
    raw_shrimp: {
      name: string;
      amount: number;
    };
    raw_crayfish: {
      name: string;
      amount: number;
    };
    raw_anchovies: {
      name: string;
      amount: number;
    };
    raw_trout: {
      name: string;
      amount: number;
    };
    raw_salmon: {
      name: string;
      amount: number;
    };
    raw_pike: {
      name: string;
      amount: number;
    };
    raw_sardine: {
      name: string;
      amount: number;
    };
    raw_herring: {
      name: string;
      amount: number;
    };
  };
  Bank_Logs: {
    logs: {
      name: string;
      amount: number;
    };
    oak: {
      name: string;
      amount: number;
    };
    willow: {
      name: string;
      amount: number;
    };
    maple: {
      name: string;
      amount: number;
    };
    yew: {
      name: string;
      amount: number;
    };
    magic: {
      name: string;
      amount: number;
    };
    elder: {
      name: string;
      amount: number;
    };
  };
  Inventory: {
    CurrentInventory: string[];
  };
  Location: {
    CurrentLocation: string;
  };
  Skill: {
    CurrentSkill: string;
  };
  CombatStyle: {
    CurrentStyle: string;
  };
  Activity: {
    CurrentActivity: string;
  };
  Resource: {
    CurrentResource: string;
  };
  Target: {
    CurrentTarget: string;
  };
  Quest: {
    CurrentQuest: string;
  };
  Resources: {
    Banking: boolean;
    Dropping: boolean;
  };
  Wallet: {
    coins: number;
  };
  QuestPoints: {
    CurrentQuestPoints: number;
  };
  Quests_Lumbridge: {
    LumbridgeQuestArray: [
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      }
    ];
  };
  Quests_Draynor: {
    DraynorQuestArray: [
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      },
      {
        name: string;
        stepsComplete: number;
        stepsTotal: number;
        complete: boolean;
      }
    ];
  };
  BodySlot: {
    playerOwnsbronzeplatebody: boolean;
    playerOwnsironplatebody: boolean;
    playerOwnssteelplatebody: boolean;
    playerOwnsmithrilplatebody: boolean;
    playerOwnsadamantplatebody: boolean;
    playerOwnsruneplatebody: boolean;
    playerOwnswizardrobetop: boolean;
    playerOwnsimphiderobetop: boolean;
    playerOwnsspidersilkrobetop: boolean;
    playerOwnsbatwingtorso: boolean;
    playerOwnssplitbarkbody: boolean;
    playerOwnsleatherbody: boolean;
    playerOwnshardleatherbody: boolean;
    playerOwnsstuddedbody: boolean;
    playerOwnscarapacetorso: boolean;
    playerOwnsgreendragonhidebody: boolean;
  };
  HandSlot: {
    playerOwnsbronzegauntlets: boolean;
    playerOwnsirongauntlets: boolean;
    playerOwnssteelgauntlets: boolean;
    playerOwnsmithrilgauntlets: boolean;
    playerOwnsadamantgauntlets: boolean;
    playerOwnsrunegauntlets: boolean;
    playerOwnswizardgloves: boolean;
    playerOwnsimphidegloves: boolean;
    playerOwnsspidersilkgloves: boolean;
    playerOwnsbatwinggloves: boolean;
    playerOwnssplitbarkgauntlets: boolean;
    playerOwnsleathervambraces: boolean;
    playerOwnshardleathergloves: boolean;
    playerOwnsstuddedleathergloves: boolean;
    playerOwnscarapacegloves: boolean;
    playerOwnsgreendragonhidevambraces: boolean;
  };
  FeetSlot: {
    playerOwnsbronzearmouredboots: boolean;
    playerOwnsironarmouredboots: boolean;
    playerOwnssteelarmouredboots: boolean;
    playerOwnsmithrilarmouredboots: boolean;
    playerOwnsadamantarmouredboots: boolean;
    playerOwnsrunearmouredboots: boolean;
    playerOwnswizardboots: boolean;
    playerOwnsimphideboots: boolean;
    playerOwnsspidersilkboots: boolean;
    playerOwnsbatwingboots: boolean;
    playerOwnssplitbarkboots: boolean;
    playerOwnsleatherboots: boolean;
    playerOwnshardleatherboots: boolean;
    playerOwnsstuddedleatherboots: boolean;
    playerOwnscarapaceboots: boolean;
    playerOwnsgreendragonhideboots: boolean;
  };
  HeadSlot: {
    playerOwnsbronzefullhelm: boolean;
    playerOwnsironfullhelm: boolean;
    playerOwnssteelfullhelm: boolean;
    playerOwnsmithrilfullhelm: boolean;
    playerOwnsadamantfullhelm: boolean;
    playerOwnsrunefullhelm: boolean;
    playerOwnswizardhat: boolean;
    playerOwnsimphidehood: boolean;
    playerOwnsspidersilkhood: boolean;
    playerOwnsbatwinghood: boolean;
    playerOwnssplitbarkhelm: boolean;
    playerOwnsleathercowl: boolean;
    playerOwnshardleathercowl: boolean;
    playerOwnsstuddedleathercoif: boolean;
    playerOwnscarapacehelm: boolean;
    playerOwnsgreendragonhidecoif: boolean;
  };
  LegsSlot: {
    playerOwnsbronzeplatelegs: boolean;
    playerOwnsironplatelegs: boolean;
    playerOwnssteelplatelegs: boolean;
    playerOwnsmithrilplatelegs: boolean;
    playerOwnsadamantplatelegs: boolean;
    playerOwnsruneplatelegs: boolean;
    playerOwnswizardrobeskirt: boolean;
    playerOwnsimphiderobebottom: boolean;
    playerOwnsspidersilkrobebottom: boolean;
    playerOwnsbatwinglegs: boolean;
    playerOwnssplitbarklegs: boolean;
    playerOwnsleatherchaps: boolean;
    playerOwnshardleatherchaps: boolean;
    playerOwnsstuddedchaps: boolean;
    playerOwnscarapacelegs: boolean;
    playerOwnsgreendragonhidechaps: boolean;
  };
  BackSlot: {
    playerOwnsbladestormdrape: boolean;
    playerOwnsspellstormdrape: boolean;
    playerOwnsarrowstormdrape: boolean;
    playerOwnspathfindercape: boolean;
    playerOwnsteamcape: boolean;
    playerOwnsobsidiancape: boolean;
  };
  RingSlot: {
    playerOwnswarriorring: boolean;
    playerOwnsseersring: boolean;
    playerOwnsarcherring: boolean;
    playerOwnsringofpotency: boolean;
    playerOwnsringofwealth: boolean;
    playerOwnsberserkerring: boolean;
  };
  NeckSlot: {
    playerOwnsamuletofstrength: boolean;
    playerOwnsamuletofmagic: boolean;
    playerOwnsamuletofaccuracy: boolean;
    playerOwnsholysymbol: boolean;
    playerOwnsamuletofdefence: boolean;
    playerOwnsamuletofpower: boolean;
    playerOwnsamuletofglory: boolean;
    playerOwnsamuletoffury: boolean;
  };
  TwoHandSlot: {
    playerOwnsbronzenumberhsword: boolean;
    playerOwnsironnumberhsword: boolean;
    playerOwnssteelnumberhsword: boolean;
    playerOwnsmithrilnumberhsword: boolean;
    playerOwnsadamantnumberhsword: boolean;
    playerOwnsrunenumberhsword: boolean;
    playerOwnsstaffofair: boolean;
    playerOwnsstaffofwater: boolean;
    playerOwnsstaffofearth: boolean;
    playerOwnsstaffoffire: boolean;
    playerOwnsairbattlestaff: boolean;
    playerOwnswaterbattlestaff: boolean;
    playerOwnsearthbattlestaff: boolean;
    playerOwnsfirebattlestaff: boolean;
    playerOwnsmysticairstaff: boolean;
    playerOwnsmysticwaterstaff: boolean;
    playerOwnsmysticearthstaff: boolean;
    playerOwnsmysticfirestaff: boolean;
    playerOwnsshortbow: boolean;
    playerOwnsoakshortbow: boolean;
    playerOwnswillowshortbow: boolean;
    playerOwnsmapleshortbow: boolean;
    playerOwnsyewshortbow: boolean;
    playerOwnsmagicshortbow: boolean;
  };
  Hatchets: {
    playerOwnsbronzehatchet: boolean;
    playerOwnsironhatchet: boolean;
    playerOwnssteelhatchet: boolean;
    playerOwnsmithrilhatchet: boolean;
    playerOwnsadamanthatchet: boolean;
    playerOwnsrunehatchet: boolean;
  };
  timestamp: number;
}
