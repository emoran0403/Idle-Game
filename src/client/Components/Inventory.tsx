import * as React from "react";
import { useState, useEffect } from "react";
import * as Types from "../../../Types";

const Inventory = (props: Types.InventoryProps) => {
  const [cashCount, setCashCount] = useState<number>(0);

  const [logCount, setLogCount] = useState<number>(0);
  const [bowCount, setBowCount] = useState<number>(0);

  const [fishCount, setFishCount] = useState<number>(0);
  const [foodCount, setFoodCount] = useState<number>(0);

  return <></>;
};

export default Inventory;
