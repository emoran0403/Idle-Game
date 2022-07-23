import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HeadSlot } from "../../../../Constants/Equipment/HeadSlot";

const ShopPanel = (props: Types.ShopPanelProps) => {
  useEffect(() => {}, []);

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

  const headSlotItems = () => {
    let headSlotArray: Types.IArmorItem[] = Object.values(HeadSlot);
    headSlotArray.shift(); // remove the first item, which is the `none` item
    console.log(headSlotArray);
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Head Slot Items</h6>
        <div className="d-flex flex-row flex-wrap">
          {headSlotArray.map((item) => (
            <div key={`resource-list-${item.name}`} className={`card border mb-3`}>
              <div className="card-body text">
                <h5 className="card-title">{item.displayName}</h5>
                <div className="card-text">
                  <div>Cost: {(item.value * 10).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {/* panel specific content goes here */}
            {headSlotItems()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPanel;
