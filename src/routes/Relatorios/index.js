import React from "react"
import { Route, Switch } from "react-router-dom"

import FormasEntrada from "./FormasEntrada"

const controller = "relatorios"
const Relatorios = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}/formas-entrada`} component={(props) => <FormasEntrada {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default Relatorios