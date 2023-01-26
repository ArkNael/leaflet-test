import React from "react";

import IntlMessages from "util/IntlMessages";
import { useAuth } from "../../authentication";


const Dashboard = () => {

	const  { authUser }  = useAuth()

	return (
		<div>
			<h2 className="title gx-mb-4"><IntlMessages id="sidebar.dashboard"/></h2>
			<div className="gx-d-flex justify-content-center">
				<h4>Seja bem vindo(a)(e)(x), {authUser.name?.split(' ')[0]}!</h4>
			</div>
		</div>
	)
}

export default Dashboard;
