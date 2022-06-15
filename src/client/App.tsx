import * as React from "react";
import * as Types from "../../Types";
import GameContainer from "./GameComponents/GameContainer";
import Grandparent from "./TestComponents/Grandparent";

const App = (props: Types.AppProps) => {
  return (
    <main className="container my-5">
      <GameContainer />
    </main>
  );
};

export default App;
