import * as React from "react";
import * as Types from "../../Types";
import GameContainer from "./GameComponents/GameContainer";
import Grandparent from "./TestComponents/Grandparent";

const App = (props: Types.AppProps) => {
  return (
    <main className="container-fluid px-5 my-3">
      <div className="text-center">Title Here</div>
      <GameContainer />
    </main>
  );
};

export default App;
