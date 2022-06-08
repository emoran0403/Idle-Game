import * as Types from "../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ButtonHolder = (props: Types.NoProps) => {
  const [amount, setAmount] = useState<number>(0);
  useEffect(() => {}, []);

  return (
    <div className="border border-secondary mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">This is Button Holder</h5>
          <button type="button" className="btn btn-primary mx-1" onClick={() => setAmount(amount + 1)}>
            +
          </button>
          <button type="button" className="btn btn-primary mx-1" onClick={() => setAmount(amount - 1)}>
            -
          </button>
          <input
            className="form-control"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <button type="button" className="btn btn-primary mx-1" onClick={() => console.log(`Add to all buttons was pressed: ${amount}`)}>
            Add to all buttons
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonHolder;
