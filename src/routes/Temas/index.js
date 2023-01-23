import React from "react"
import { Route, Switch } from "react-router-dom"

import Migalha from "components/Breadcrumb";

import asyncComponent from "util/asyncComponent";

const controller = "temas"
export default function Auditoria() {
    return (
        <div className="gx-main-content-wrapper">
            <Migalha />
            <Switch>
                <Route exact path={`/${controller}`} component={asyncComponent(() => import("./Listar"))} />
                <Route exact path={`/${controller}/adicionar`} component={asyncComponent(() => import("./Adicionar"))} />
                <Route exact path={`/${controller}/editar/:id`} component={asyncComponent(() => import("./Editar"))} />
            </Switch>
        </div>
    );
}
