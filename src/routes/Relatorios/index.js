import React from "react"
import { Route, Switch } from "react-router-dom"

import FormasEntrada from "./FormasEntrada"
import Complexidades from "./Complexidades"
import Finalidades from "./Finalidades"
import Origens from "./Origens"
import Criticidades from "./Criticidades"
import Contratos from "./Contratos"

const controller = "relatorios"
const Relatorios = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}/formas-entrada`} component={(props) => <FormasEntrada {...props} controller={controller} />} />
                <Route exact path={`/${controller}/complexidades`} component={(props) => <Complexidades {...props} controller={controller} />} />
                <Route exact path={`/${controller}/finalidades`} component={(props) => <Finalidades {...props} controller={controller} />} />
                <Route exact path={`/${controller}/origens`} component={(props) => <Origens {...props} controller={controller} />} />
                <Route exact path={`/${controller}/criticidades`} component={(props) => <Criticidades {...props} controller={controller} />} />
                <Route exact path={`/${controller}/contratos`} component={(props) => <Contratos {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default Relatorios