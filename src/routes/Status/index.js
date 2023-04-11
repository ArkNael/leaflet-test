import React from "react"
import { Route, Switch } from "react-router-dom"

import List from "../../components/Crud/Listing/DefaultList"

const controller = "relatorios"
const Relatorios = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}`} component={(props) => <List {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default Relatorios