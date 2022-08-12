import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ListOfFish } from "../../../../Constants/Items/Fish";
import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { ListOfOres } from "../../../../Constants/Items/Ores";

const Inventory = (props: Types.NoProps) => {
  const Wallet = useSelector((state: Types.AllState) => state.Wallet) as Types.IWallet;
  const { CurrentInventory } = useSelector((state: Types.AllState) => state.Inventory) as Types.I_Inventory;

  //@ this pulls the current inventory, and adds filler items to a length of 28
  const makeCompositeCurrent = () => {
    let compositeCurrent = [...CurrentInventory];
    compositeCurrent.push(...Array(28 - CurrentInventory.length).fill(`blank`));
    // console.log(`tempcurrent and new stuff is ${compositeCurrent}`);
    return compositeCurrent;
  };

  // useEffect(() => {}, []);
  //@ given an item, this returns the item display name
  const getItemDisplayName = (item: string) => {
    if (ListOfFish[item as keyof Types.IListOfFish]) {
      return ListOfFish[item as keyof Types.IListOfFish][`displayName`];
    } else if (ListOfLogs[item as keyof Types.IListOfLogs]) {
      return ListOfLogs[item as keyof Types.IListOfLogs][`displayName`];
    } else if (ListOfOres[item as keyof Types.IListOfOres]) {
      return ListOfOres[item as keyof Types.IListOfOres][`displayName`];
    } else {
      return item;
    }
  };

  return (
    <div className="card border border-dark border-2 rounded-3">
      <div className="card">
        <h5 className="card-header text-center">
          Inventory
          <div className="d-flex row">
            <h6 className="card-subtitle text-muted">Coins: {Wallet[`coins`].toLocaleString("en-US")}</h6>
          </div>
        </h5>

        <div className="d-flex flex-wrap justify-content-between container">
          {makeCompositeCurrent().map((item, i) => (
            <div key={`Inventory-slot-${i + 1}`} className="d-flex border border-2 col-2 border-dark rounded flex-fill m-2 justify-content-center">
              {item === `blank` ? (
                <span style={{ height: `27px` }} className="text-white">
                  blank
                </span>
              ) : (
                <img src={`/Assets/Inventory/${item}.png`} height={27} alt={`${getItemDisplayName(item)}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
