import * as Types from "../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // import to allow dispatching of events
import { increment1, decrement1, incrementByAmount1 } from "../Redux/Slices/Button1"; // these are the actions we will be dispatching
import { increment2, decrement2, incrementByAmount2 } from "../Redux/Slices/Button2"; // these are the actions we will be dispatching
import { increment3, decrement3, incrementByAmount3 } from "../Redux/Slices/Button3"; // these are the actions we will be dispatching

const ButtonHolder = (props: Types.NoProps) => {
  const [amount1, setAmount1] = useState<number>(0);
  const [amount2, setAmount2] = useState<number>(0);
  const [amount3, setAmount3] = useState<number>(0);

  const dispatch = useDispatch(); // lets us dispatch actions

  useEffect(() => {}, []);

  const buttonsfor1 = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary mx-1" onClick={() => dispatch(increment1())}>
          +
        </button>
        <button type="button" className="btn btn-primary mx-1" onClick={() => dispatch(decrement1())}>
          -
        </button>
        <input
          className="form-control"
          value={amount1}
          onChange={(e) => {
            setAmount1(Number(e.target.value));
          }}
        />
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => {
            dispatch(incrementByAmount1(amount1));
            console.log(`Add to all buttons was pressed: ${amount1}`);
          }}
        >
          Add to Button 1
        </button>
      </div>
    );
  };

  const buttonsfor2 = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary mx-1" onClick={() => dispatch(increment2())}>
          +
        </button>
        <button type="button" className="btn btn-primary mx-1" onClick={() => dispatch(decrement2())}>
          -
        </button>
        <input
          className="form-control"
          value={amount2}
          onChange={(e) => {
            setAmount2(Number(e.target.value));
          }}
        />
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => {
            dispatch(incrementByAmount2(amount2));
            console.log(`Add to all buttons was pressed: ${amount2}`);
          }}
        >
          Add to Button 2
        </button>
      </div>
    );
  };

  const buttonsfor3 = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary mx-1" onClick={() => dispatch(increment3())}>
          +
        </button>
        <button type="button" className="btn btn-primary mx-1" onClick={() => dispatch(decrement3())}>
          -
        </button>
        <input
          className="form-control"
          value={amount3}
          onChange={(e) => {
            setAmount3(Number(e.target.value));
          }}
        />
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => {
            dispatch(incrementByAmount3(amount3));
            console.log(`Add to all buttons was pressed: ${amount3}`);
          }}
        >
          Add to Button 3
        </button>
      </div>
    );
  };

  return (
    <div className="border border-secondary mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">This is Button Holder</h5>
          {buttonsfor1()}
          {buttonsfor2()}
          {buttonsfor3()}
        </div>
      </div>
    </div>
  );
};

export default ButtonHolder;
