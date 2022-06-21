import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Inventory = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.Wallet) as Types.IWallet;

  useEffect(() => {}, []);

  return (
    <div className="card border border-dark border-2 rounded-3">
      <div className="card">
        <h5 className="card-header text-center">
          Inventory<h6 className="card-subtitle text-muted">Coins: {state.Coins}</h6>
        </h5>
      </div>
    </div>
  );
};

export default Inventory;

{
  /* <div className="card">
  <div className="card-body">
    <h5 className="card-title">Stuff</h5>
    <div>stuff map here</div>
  </div>
</div> */
}
