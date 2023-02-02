import React from "react"
import { Route, Switch } from "react-router-dom"

import List from "../../components/Crud/Listing/DefaultList"
import Add from "../../components/Crud/Add/DefaultAdd"
import Edit from "../../components/Crud/Edit/DefaultEdit"

const controller = "reversoes"
const Reversoes = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}`} component={(props) => <List {...props} controller={controller} />} />
                <Route exact path={`/${controller}/adicionar`} component={(props) => <Add {...props} controller={controller} />} />
                <Route exact path={`/${controller}/editar/:id`} component={(props) => <Edit {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default Reversoes