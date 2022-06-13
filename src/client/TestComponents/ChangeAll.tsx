import * as Types from "../../../Types";
import * as React from "react";
import { useDispatch } from "react-redux"; // import to allow dispatching of events
import { increment1, decrement1, incrementByAmount1 } from "../Redux/Slices/TestSlices/Button1"; // these are the actions we will be dispatching
import { increment2, decrement2, incrementByAmount2 } from "../Redux/Slices/TestSlices/Button2"; // these are the actions we will be dispatching
import { increment3, decrement3, incrementByAmount3 } from "../Redux/Slices/TestSlices/Button3"; // these are the actions we will be dispatching
import { useState } from "react";

const Increase = (props: Types.NoProps) => {
  const [num, setNum] = useState<number>(0);
  const dispatch = useDispatch(); // lets us dispatch actions

  const increment = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => {
            dispatch(increment1());
            dispatch(increment2());
            dispatch(increment3());
          }}
        >
          Increment all by 1
        </button>
      </div>
    );
  };

  const decrement = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => {
            dispatch(decrement1());
            dispatch(decrement2());
            dispatch(decrement3());
          }}
        >
          Decrement all by 1
        </button>
      </div>
    );
  };

  const incrementByAmount = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => {
            dispatch(incrementByAmount1(num));
            dispatch(incrementByAmount2(num));
            dispatch(incrementByAmount3(num));
          }}
        >
          Increment all by amount
        </button>
      </div>
    );
  };

  return (
    <div className="border border-secondary mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">This is Increase</h5>
          <div className="d-flex">
            <div className="row">{increment()}</div>
            <div className="row">{decrement()}</div>
            <div className="row">{incrementByAmount()}</div>
            <input value={num} onChange={(e) => setNum(Number(e.target.value))}></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Increase;
