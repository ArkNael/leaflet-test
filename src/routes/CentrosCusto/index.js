import React from "react"
import { Route, Switch } from "react-router-dom"

import List from "./List"
import Add from "./Add"
import Edit from "./Edit"
import Responsaveis from "./Responsaveis"

const controller = "ccustos"
const CentrosCusto = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}`} component={(props) => <List {...props} controller={controller} />} />
                <Route exact path={`/${controller}/adicionar`} component={(props) => <Add {...props} controller={controller} />} />
                <Route exact path={`/${controller}/editar/:id`} component={(props) => <Edit {...props} controller={controller} />} />
                <Route exact path={`/${controller}/responsaveis/:id`} component={(props) => <Responsaveis {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default CentrosCusto