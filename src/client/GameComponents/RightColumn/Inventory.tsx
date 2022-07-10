import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Inventory = (props: Types.NoProps) => {
  const Wallet = useSelector((state: Types.AllState) => state.Wallet) as Types.IWallet;
  const { Current } = useSelector((state: Types.AllState) => state.Inventory) as Types.I_Inventory;

  const makeCompositeCurrent = () => {
    let compositeCurrent = [...Current];
    compositeCurrent.push(...Array(28 - Current.length).fill(`blank`));
    console.log(`tempcurrent and new stuff is ${compositeCurrent}`);
    return compositeCurrent;
  };

  useEffect(() => {}, []);

  return (
    <div className="card border border-dark border-2 rounded-3">
      <div className="card">
        <h5 className="card-header text-center">
          Inventory
          <div className="d-flex row">
            <h6 className="card-subtitle text-muted">Coins: {Wallet.coins}</h6>
          </div>
        </h5>

        <div className="d-flex flex-wrap justify-content-between container">
          {makeCompositeCurrent().map((item, i) => (
            <div key={`Inventory-slot-${i + 1}`} className="border border-2 border-dark rounded flex-fill m-1">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
// className={`${i % 2 && `invisible`}`}
{
  /* <div className="card">
  <div className="card-body">
    <h5 className="card-title">Stuff</h5>
    <div>stuff map here</div>
  </div>
</div> */
}
