import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";

const ButtonHolder = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is button holder</h5>
          <button type="button" className="btn btn-primary" onClick={() => console.log(`Button 1 was pressed`)}>
            This is button 1
          </button>
          <button type="button" className="btn btn-primary" onClick={() => console.log(`Button 1 was pressed`)}>
            This is button 2
          </button>
          <button type="button" className="btn btn-primary" onClick={() => console.log(`Button 1 was pressed`)}>
            This is button 3
          </button>
        </div>
      </div>
    </>
  );
};

export default ButtonHolder;
