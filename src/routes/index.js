import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
      <Route path={`${match.url}temas`} component={asyncComponent(() => import('./Temas'))}/>
    </Switch>
  </div>
);

export default App;
