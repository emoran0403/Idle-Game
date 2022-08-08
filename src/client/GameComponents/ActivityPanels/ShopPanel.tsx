import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWallet } from "../../Redux/Slices/Wallet";

import { playerNowOwnsHatchetItem } from "../../Redux/Slices/SkillingEquipmentSlices/Hatchets";
import { playerNowOwnsPickaxeItem } from "../../Redux/Slices/SkillingEquipmentSlices/Pickaxes";

import { playerNowOwnsHeadItem } from "../../Redux/Slices/EquipmentSlices/HeadSlotSlice";
import { playerNowOwnsBodyItem } from "../../Redux/Slices/EquipmentSlices/BodySlotSlice";
import { playerNowOwnsLegItem } from "../../Redux/Slices/EquipmentSlices/LegsSlotSlice";
import { playerNowOwnsHandItem } from "../../Redux/Slices/EquipmentSlices/HandsSlotSlice";
import { playerNowOwnsFeetItem } from "../../Redux/Slices/EquipmentSlices/FeetSlotSlice";
import { playerNowOwnsTwoHandItem } from "../../Redux/Slices/EquipmentSlices/TwoHandSlotSlice";

import { listOfHatchets } from "../../../../Constants/SkillingEquipment/Hatchets";
import { listOfPickaxes } from "../../../../Constants/SkillingEquipment/Pickaxes";

import { HeadSlot } from "../../../../Constants/Equipment/HeadSlot";
import { BodySlot } from "../../../../Constants/Equipment/BodySlot";
import { LegsSlot } from "../../../../Constants/Equipment/LegsSlot";
import { HandsSlot } from "../../../../Constants/Equipment/HandsSlot";
import { FeetSlot } from "../../../../Constants/Equipment/FeetSlot";
import { TwoHandSlot } from "../../../../Constants/Equipment/TwoHandSlot";

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

  // tracks each skill panel's expanded or collapsed state
  const [equipmentPanelsOpened, setequipmentPanelsOpened] = useState({
    Hatchets: false,
    Pickaxes: false,
    BackSlot: false,
    NeckSlot: false,
    RingSlot: false,
    HeadSlot: false,
    BodySlot: false,
    LegsSlot: false,
    HandsSlot: false,
    FeetSlot: false,
    TwoHandSlot: false,
  });

  /**
   * Added as an onClick handler to toggle the display state of the equipmentPanels.
   * Used to toggle the expanded or collapsed state of the equipmentPanels.
   * @param panel - A string used to index the equipmentPanelsOpened object.
   */
  const handleToggleEquipmentPanel = (panel: string) => {
    let copyOfEquipmentPanelsOpened = { ...equipmentPanelsOpened };
    copyOfEquipmentPanelsOpened[panel as keyof Types.EquipmentPanels] = !copyOfEquipmentPanelsOpened[panel as keyof Types.EquipmentPanels];
    setequipmentPanelsOpened({ ...copyOfEquipmentPanelsOpened });
  };

  const panelHeaderJSX = () => {
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-2 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <h1 className="col-lg-10 justify-content-lg-center">Shop</h1>
      </div>
    );
  };

  const handleButtonStyle = (item: Types.ICompositeArmorItem | Types.ICompositeHatchet | Types.ICompositePickaxe | Types.ICompositeWeaponItem) => {
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
  /**
   * Updates the state of ownership of the item, removes an appropriate amount of coins from the wallet, and sends a chatlog
   * @param item - Item is the item the player is buying as Types.ICompositeArmorItem | Types.ICompositeHatchet | Types.ICompositePickaxe | Types.ICompositeWeaponItem
   * @param isSkillingEquipment - Boolean describing if the item is a hatchet or pickaxe, used to apply the appropriate item cost
   * @param slot - A string signifying the slot of the item, used to update the appropriate state
   */
  const handleBuyingItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: Types.ICompositeArmorItem | Types.ICompositeHatchet | Types.ICompositePickaxe | Types.ICompositeWeaponItem,
    isSkillingEquipment: boolean,
    slot: string
  ) => {
    // a player may want to buy multiple items, so prevent the button click from collapsing the panel
    // do this by stopping the event bubbling propogation to the parent elements
    e.stopPropagation();
    // define vowels for grammar in chatlog
    let vowels: string[] = [`a`, `e`, `i`, `o`, `u`];

    // match the bought item to its counterpart in state
    let itemForState = `playerOwns${item.name}`;

    // remove the coins from the wallet
    if (isSkillingEquipment) {
      dispatch(removeFromWallet(item.value * 25));
    } else {
      dispatch(removeFromWallet(item.value * 10));
    }

    // based on the item, add the item to state
    switch (slot) {
      case `hatchet`:
        dispatch(playerNowOwnsHatchetItem(itemForState));
        break;
      case `pickaxe`:
        dispatch(playerNowOwnsPickaxeItem(itemForState));
        break;
      case `head`:
        dispatch(playerNowOwnsHeadItem(itemForState));
        break;
      case `body`:
        dispatch(playerNowOwnsBodyItem(itemForState));
        break;
      case `legs`:
        dispatch(playerNowOwnsLegItem(itemForState));
        break;
      case `hands`:
        dispatch(playerNowOwnsHandItem(itemForState));
        break;
      case `feet`:
        dispatch(playerNowOwnsFeetItem(itemForState));
        break;
      case `twohand`:
        dispatch(playerNowOwnsTwoHandItem(itemForState));
        break;
    }

    // send a gramatically correct message to the chat window
    if (vowels.includes(item.displayName[0].toLocaleLowerCase())) {
      props.newChatLog(`Bought an ${item.displayName}`, `Nonfilterable`);
    } else {
      props.newChatLog(`Bought a ${item.displayName}`, `Nonfilterable`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`Hatchets`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Hatchets</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.Hatchets ? `` : `d-none`}`}>
          {compositeItemsNoCrystal.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 25}
                      onClick={(e) => {
                        handleBuyingItem(e, item, true, `hatchet`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`Pickaxes`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Pickaxes</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.Pickaxes ? `` : `d-none`}`}>
          {compositeItemsNoCrystal.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 25}
                      onClick={(e) => {
                        handleBuyingItem(e, item, true, `pickaxe`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`HeadSlot`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Head Slot Items</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.HeadSlot ? `` : `d-none`}`}>
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={(e) => {
                        handleBuyingItem(e, item, false, `head`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`BodySlot`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Body Slot Items</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.BodySlot ? `` : `d-none`}`}>
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={(e) => {
                        handleBuyingItem(e, item, false, `body`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`LegsSlot`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Legs Slot Items</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.LegsSlot ? `` : `d-none`}`}>
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={(e) => {
                        handleBuyingItem(e, item, false, `legs`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`HandSlot`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Hands Slot Items</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.HandsSlot ? `` : `d-none`}`}>
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={(e) => {
                        handleBuyingItem(e, item, false, `hands`);
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

    // disable the item if the player already owns it
    return (
      <div role="button" onClick={() => handleToggleEquipmentPanel(`FeetSlot`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
        <h1 className="text-center">Feet Slot Items</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.FeetSlot ? `` : `d-none`}`}>
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={(e) => {
                        handleBuyingItem(e, item, false, `feet`);
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
    let twoHandsFromConstants: Types.IWeaponItem[] = Object.values(TwoHandSlot);

    // remove the first item, which is the `none` item
    twoHandsFromConstants.shift();

    // create an empty array to store the composite twoHand items
    let compositeItems: Types.ICompositeWeaponItem[] = [];

    for (let i = 0; i < twoHandsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = twoHandFromState[`playerOwns${twoHandsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeWeaponItem = { ...twoHandsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    // disable the item if the player already owns it
    return (
      <div
        role="button"
        onClick={() => handleToggleEquipmentPanel(`TwoHandSlot`)}
        className="card-title border border-dark border-1 rounded-3 user-select-none"
      >
        <h1 className="text-center">Two Hand Slot Items</h1>
        <div className={`d-flex flex-row flex-wrap ${equipmentPanelsOpened.TwoHandSlot ? `` : `d-none`}`}>
          {compositeItems.map((item) => (
            <div className={`card border mb-3`} key={`resource-list-${item.name}`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text justify-content-center">
                  {item.playerOwnsThisItem && <div className="text-center">Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button
                      disabled={item.playerOwnsThisItem || Wallet.coins < item.value * 10}
                      onClick={(e) => {
                        handleBuyingItem(e, item, false, `twohand`);
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
