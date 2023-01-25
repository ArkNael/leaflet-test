import React from "react"
import { Route, Switch } from "react-router-dom"

import List from "./List"
import Add from "./Add"
import Edit from "./Edit"

const controller = "formas"
const Formas = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}`} render={(props) => <List {...props} controller={controller} />} />
                <Route exact path={`/${controller}/adicionar`} render={(props) => <Add {...props} controller={controller} />} />
                <Route exact path={`/${controller}/editar/:id`} render={(props) => <Edit {...props} controller={controller} />} />
            </Switch>
        </div>
    );
}

export default Formas