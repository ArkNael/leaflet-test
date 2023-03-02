import React from "react"
import { Route, Switch } from "react-router-dom"

import List from "./List"
import Add from "./Add"
import Edit from "./Edit"
import View from "./View"

const controller = "ocorrencias"
const Ocorrencias = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}`} component={(props) => <List {...props} controller={controller} />} />
                <Route exact path={`/${controller}/adicionar`} component={(props) => <Add {...props} controller={controller} />} />
                <Route exact path={`/${controller}/editar/:id`} component={(props) => <Edit {...props} controller={controller} />} />
                <Route exact path={`/${controller}/acompanhar/:id`} component={(props) => <View {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default Ocorrencias