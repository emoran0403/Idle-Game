import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HeadSlot } from "../../../../Constants/Equipment/HeadSlot";

const ShopPanel = (props: Types.ShopPanelProps) => {
  const Wallet = useSelector((state: Types.AllState) => state.Wallet) as Types.IWallet;
  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;
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

  const handleButtonStyle = (item: Types.ICompositeArmorItem) => {
    if (Wallet.coins >= item.value * 10 && !item.playerOwnsThisItem) {
      // item is buyable
      return `bg-success`;
    } else {
      // item is not buyable
      return `bg-danger`;
    }
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

    // console.log(headsFromConstants);
    // disable the item if the player already owns it
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Head Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {compositeItems.map((item) => (
            <button key={`resource-list-${item.name}`} className={`card border mb-3`} disabled={item.playerOwnsThisItem}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text">
                  {item.playerOwnsThisItem && <div>Owned</div>}
                  {!item.playerOwnsThisItem && (
                    <button className={`btn border mb-3 ${handleButtonStyle(item)}`}>Cost: {(item.value * 10).toLocaleString()}</button>
                  )}
                </div>
              </div>
            </button>
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
            {displayHeadSlotItems()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPanel;
