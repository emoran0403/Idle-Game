import * as React from "react";
import * as Types from "../../Types";
import Grandparent from "./Components/Grandparent";

const App = (props: Types.AppProps) => {
  return (
    <main className="container my-5">
      <h1>Welcome to APP!</h1>
      <Grandparent />
    </main>
  );
};

export default App;
