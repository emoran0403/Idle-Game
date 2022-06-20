import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const BankPanel = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="card border border-dark border-2 rounded-3">
      <div>This is BankPanel</div>
    </div>
  );
};

export default BankPanel;
