import React from "react";
import {Route, Switch} from "react-router-dom";

import Migalha from "components/Breadcrumb";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
	<div className="gx-main-content-wrapper">
		<Migalha />
		<Switch>
			<Route path={`${match.url}dashboard`} 	component={asyncComponent(() => import('./Dashboard'))} />
		</Switch>
	</div>
);

export default App;
