import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWallet } from "../../Redux/Slices/Wallet";

import { playerNowOwnsHatchetItem } from "../../Redux/Slices/SkillingEquipmentSlices/Hatchets";

import { playerNowOwnsHeadItem } from "../../Redux/Slices/EquipmentSlices/HeadSlotSlice";
import { playerNowOwnsBodyItem } from "../../Redux/Slices/EquipmentSlices/BodySlotSlice";
import { playerNowOwnsLegItem } from "../../Redux/Slices/EquipmentSlices/LegsSlotSlice";
import { playerNowOwnsHandItem } from "../../Redux/Slices/EquipmentSlices/HandsSlotSlice";
import { playerNowOwnsFeetItem } from "../../Redux/Slices/EquipmentSlices/FeetSlotSlice";
import { playerNowOwnsTwoHandItem } from "../../Redux/Slices/EquipmentSlices/TwoHandSlotSlice";

import { listOfHatchets } from "../../../../Constants/SkillingEquipment/Hatchets";

import { HeadSlot } from "../../../../Constants/Equipment/HeadSlot";
import { BodySlot } from "../../../../Constants/Equipment/BodySlot";
import { LegsSlot } from "../../../../Constants/Equipment/LegsSlot";
import { HandsSlot } from "../../../../Constants/Equipment/HandsSlot";
import { FeetSlot } from "../../../../Constants/Equipment/FeetSlot";
import { TwoHandSlot } from "../../../../Constants/Equipment/TwoHandSlot";
import { listOfPickaxes } from "../../../../Constants/SkillingEquipment/Pickaxes";
import { playerNowOwnsPickaxeItem } from "../../Redux/Slices/SkillingEquipmentSlices/Pickaxes";

const ShopPanel = (props: Types.ShopPanelProps) => {
  const dispatch = useDispatch();

  const Wallet = useSelector((state: Types.AllState) => state.Wallet) as Types.IWallet;

  const hatchetsFromState = useSelector((state: Types.AllState) => state.Hatchets) as Types.IHatchetsSlice;
  const pickaxesFromState = useSelector((state: Types.AllState) => state.Pickaxes) as Types.IPickaxesSlice;

  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;
  const bodiesFromState = useSelector((state: Types.AllState) => state.BodySlot) as Types.IBodySlotSlice;
  const legsFromState = useSelector((state: Types.AllState) => state.LegsSlot) as Types.ILegsSlotSlice;
  const handsFromState = useSelector((state: Types.AllState) => state.HandSlot) as Types.IHandSlotSlice;
  const feetFromState = useSelector((state: Types.AllState) => state.FeetSlot) as Types.IFeetSlotSlice;
  const twoHandFromState = useSelector((state: Types.AllState) => state.TwoHandSlot) as Types.ITwoHandSlotSlice;

  //   console.log(headsFromState);
  //   useEffect(() => {}, []);

  const panelHeaderJSX = () => {
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-3 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <div className="col-lg-9 justify-content-lg-center">Shop</div>
      </div>
    );
  };

  const handleButtonStyle = (item: Types.ICompositeArmorItem | Types.ICompositeHatchet | Types.ICompositePickaxe) => {
    // hatchets are more expensive, so we need to check for that - use the `in` operator to type guard
    if (`armor` in item) {
      if (Wallet.coins >= item.value * 10 && !item.playerOwnsThisItem) {
        // item is buyable
        return `bg-success`;
      } else {
        // item is not buyable
        return `bg-danger`;
      }
    } else {
      if (Wallet.coins >= item.value * 25 && !item.playerOwnsThisItem) {
        // item is buyable
        return `bg-success`;
      } else {
        // item is not buyable
        return `bg-danger`;
      }
    }
  };

  const displayHatchetItems = () => {
    // create an array of hatchet items from those in constants
    let hatchetsFromConstants: Types.IHatchet[] = Object.values(listOfHatchets);

    // remove the first item, which is the bronze hatchet that is owned by default
    hatchetsFromConstants.shift();

    // create an empty array to store the composite hatchet items
    let compositeItems: Types.ICompositeHatchet[] = [];

    for (let i = 0; i < hatchetsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = hatchetsFromState[`playerOwns${hatchetsFromConstants[i].name}` as keyof Types.IHatchetsSlice];
      let tempItem: Types.ICompositeHatchet = { ...hatchetsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    //@ remove crystal hatchet until implemented
    let compositeItemsNoCrystal = compositeItems.filter((hatchet) => hatchet.name !== "crystalhatchet");

    const handleBuyingItem = (item: Types.ICompositeHatchet) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 25));

      // add the item to state
      dispatch(playerNowOwnsHatchetItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Hatchets</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItemsNoCrystal.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 25}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 25).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayPickaxeItems = () => {
    // create an array of pickaxe items from those in constants
    let pickaxesFromConstants: Types.IPickaxe[] = Object.values(listOfPickaxes);

    // remove the first item, which is the bronze pickaxe that is owned by default
    pickaxesFromConstants.shift();

    // create an empty array to store the composite pickaxe items
    let compositeItems: Types.ICompositePickaxe[] = [];

    for (let i = 0; i < pickaxesFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = pickaxesFromState[`playerOwns${pickaxesFromConstants[i].name}` as keyof Types.IPickaxesSlice];
      let tempItem: Types.ICompositePickaxe = { ...pickaxesFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    //@ remove crystal pickaxe until implemented
    let compositeItemsNoCrystal = compositeItems.filter((pickaxe) => pickaxe.name !== "crystalpickaxe");

    const handleBuyingItem = (item: Types.ICompositePickaxe) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 25));

      // add the item to state
      dispatch(playerNowOwnsPickaxeItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Pickaxes</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItemsNoCrystal.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 25}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 25).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayHeadSlotItems = () => {
    // create an array of head slot items from those in constants
    let headsFromConstants: Types.IArmorItem[] = Object.values(HeadSlot);

    // remove the first item, which is the `none` item
    headsFromConstants.shift();

    // create an empty array to store the composite head items
    let compositeItems: Types.ICompositeArmorItem[] = [];

    for (let i = 0; i < headsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = headsFromState[`playerOwns${headsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...headsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const handleBuyingItem = (item: Types.ICompositeArmorItem) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 10));

      // add the item to state
      dispatch(playerNowOwnsHeadItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Head Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 10).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayBodySlotItems = () => {
    // create an array of body slot items from those in constants
    let bodiesFromConstants: Types.IArmorItem[] = Object.values(BodySlot);

    // remove the first item, which is the `none` item
    bodiesFromConstants.shift();

    // create an empty array to store the composite body items
    let compositeItems: Types.ICompositeArmorItem[] = [];

    for (let i = 0; i < bodiesFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = bodiesFromState[`playerOwns${bodiesFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...bodiesFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const handleBuyingItem = (item: Types.ICompositeArmorItem) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 10));

      // add the item to state
      dispatch(playerNowOwnsBodyItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Body Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 10).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayLegsSlotItems = () => {
    // create an array of legs slot items from those in constants
    let legsFromConstants: Types.IArmorItem[] = Object.values(LegsSlot);

    // remove the first item, which is the `none` item
    legsFromConstants.shift();

    // create an empty array to store the composite legs items
    let compositeItems: Types.ICompositeArmorItem[] = [];

    for (let i = 0; i < legsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = legsFromState[`playerOwns${legsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...legsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const handleBuyingItem = (item: Types.ICompositeArmorItem) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 10));

      // add the item to state
      dispatch(playerNowOwnsLegItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Legs Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 10).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayHandsSlotItems = () => {
    // create an array of hands slot items from those in constants
    let handsFromConstants: Types.IArmorItem[] = Object.values(HandsSlot);

    // remove the first item, which is the `none` item
    handsFromConstants.shift();

    // create an empty array to store the composite hands items
    let compositeItems: Types.ICompositeArmorItem[] = [];

    for (let i = 0; i < handsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = handsFromState[`playerOwns${handsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...handsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const handleBuyingItem = (item: Types.ICompositeArmorItem) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 10));

      // add the item to state
      dispatch(playerNowOwnsHandItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Hands Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 10).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayFeetSlotItems = () => {
    // create an array of feet slot items from those in constants
    let feetFromConstants: Types.IArmorItem[] = Object.values(FeetSlot);

    // remove the first item, which is the `none` item
    feetFromConstants.shift();

    // create an empty array to store the composite feet items
    let compositeItems: Types.ICompositeArmorItem[] = [];

    for (let i = 0; i < feetFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = feetFromState[`playerOwns${feetFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...feetFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const handleBuyingItem = (item: Types.ICompositeArmorItem) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 10));

      // add the item to state
      dispatch(playerNowOwnsFeetItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Feet Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 10).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayTwoHandSlotItems = () => {
    // create an array of twoHand slot items from those in constants
    let twoHandsFromConstants: Types.IArmorItem[] = Object.values(TwoHandSlot);

    // remove the first item, which is the `none` item
    twoHandsFromConstants.shift();

    // create an empty array to store the composite twoHand items
    let compositeItems: Types.ICompositeArmorItem[] = [];

    for (let i = 0; i < twoHandsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = twoHandFromState[`playerOwns${twoHandsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...twoHandsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const handleBuyingItem = (item: Types.ICompositeArmorItem) => {
      // define vowels for grammar in chatlog
      let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

      // match the bought item to its counterpart in state
      let itemForState = `playerOwns${item.name}`;

      // remove the coins from the wallet
      dispatch(removeFromWallet(item.value * 10));

      // add the item to state
      dispatch(playerNowOwnsTwoHandItem(itemForState));

      // send a gramatically correct message to the chat window
      if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
        props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
      } else {
        props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
      }
    };

    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Two Hand Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={() => {
                        handleBuyingItem(item);
                      }}
                      className={`btn border mb-3 ${handleButtonStyle(item)}`}
                    >
                      Cost: {(item.value * 10).toLocaleString("en-US")}gp
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {/* panel specific content goes here */}
            {displayHatchetItems()}
            {displayPickaxeItems()}
            {displayHeadSlotItems()}
            {displayBodySlotItems()}
            {displayLegsSlotItems()}
            {displayHandsSlotItems()}
            {displayFeetSlotItems()}
            {displayTwoHandSlotItems()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPanel;
