import React from "react"
import { Route, Switch } from "react-router-dom"

import asyncComponent from "util/asyncComponent";

const controller = "temas"
const Auditoria = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}`} component={asyncComponent(() => import("./Listar"))} />
                <Route exact path={`/${controller}/adicionar`} component={asyncComponent(() => import("./Adicionar"))} />
                <Route exact path={`/${controller}/editar/:id`} component={asyncComponent(() => import("./Editar"))} />
            </Switch>
        </div>
    );
}

export default Auditoria