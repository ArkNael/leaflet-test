import React from "react"
import { Route, Switch } from "react-router-dom"

import Rate from "./Rate.js"

const controller = "pesquisa-satisfacao"
const Nps = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path={`/${controller}/:id?/:hash?`} component={(props) => <Rate {...props} controller={controller} />} />
            </Switch>
        </div>
    )
}

export default Nps