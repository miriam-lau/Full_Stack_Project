import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";

import MainContainer from "./main/main_container";

injectTapEventPlugin();

const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  );
}

export default App;
