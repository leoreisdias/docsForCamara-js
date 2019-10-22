import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NewPauta from "./pages/NewPauta";
import IndexPauta from "./pages/IndexPauta";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={NewPauta} />
        <Route path="/pautaIndex" component={IndexPauta} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
