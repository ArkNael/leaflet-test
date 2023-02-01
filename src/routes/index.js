import React from "react";
import {Route, Switch} from "react-router-dom";

import Migalha from "components/Breadcrumb";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
	<div className="gx-main-content-wrapper">
		<Migalha />
		<Switch>
			<Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
			<Route path={`${match.url}Ocorrencias`} component={asyncComponent(() => import('./Ocorrencias'))}/>
			<Route path={`${match.url}temas`} component={asyncComponent(() => import('./Temas'))}/>
			<Route path={`${match.url}formas`} component={asyncComponent(() => import('./Formas'))}/>
			<Route path={`${match.url}tipos`} component={asyncComponent(() => import('./Tipos'))}/>
			<Route path={`${match.url}status`} component={asyncComponent(() => import('./Status'))}/>
			<Route path={`${match.url}finalidades`} component={asyncComponent(() => import('./Finalidades'))}/>
			<Route path={`${match.url}origens`} component={asyncComponent(() => import('./Origens'))}/>
			<Route path={`${match.url}destinos`} component={asyncComponent(() => import('./Destinos'))}/>
			<Route path={`${match.url}contratos`} component={asyncComponent(() => import('./Contratos'))}/>
			<Route path={`${match.url}assuntos`} component={asyncComponent(() => import('./Assuntos'))}/>
		</Switch>
	</div>
);

export default App;
