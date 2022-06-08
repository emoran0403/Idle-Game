import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";

const Increase = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <div className="border border-secondary mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">This is Increase</h5>
          <button type="button" className="btn btn-primary mx-1" onClick={() => console.log(`Button 1 was pressed`)}>
            Button 1
          </button>
          <button type="button" className="btn btn-primary mx-1" onClick={() => console.log(`Button 1 was pressed`)}>
            Button 2
          </button>
          <button type="button" className="btn btn-primary mx-1" onClick={() => console.log(`Button 1 was pressed`)}>
            Button 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default Increase;
