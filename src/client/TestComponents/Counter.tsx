import * as Types from "../../../Types";
import * as React from "react";
import { useState, useEffect } from "react";

const Counter = (props: Types.CounterProps) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // this is the place that hits on every interval
      setCounter((prevCounter) => prevCounter + 1); // update the counter
      return () => {
        clearInterval(interval);
      };
    });
  }, []);

  return (
    <>
      <h1>Counter: {counter}</h1>
    </>
  );
};
