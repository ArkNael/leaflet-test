import React, { useState } from "react";
import CircularProgress from "../CircularProgress";
import {message as toastNotification} from "antd";
import Auxiliary from "../../util/Auxiliary";

const AppNotificationContainer = ({loading, error, message}) => {
	
	const [errorMessage, setErrorMessage] = useState()

	if (error && error !== errorMessage) {
		toastNotification.error(<span id="message-id">{error}</span>)
		setErrorMessage(error)
	}

	return (
		<Auxiliary>
			{loading && <div className="gx-loader-view gx-loader-position">
				<CircularProgress/>
			</div>}
			{message && toastNotification.info(<span id="message-id">{errorMessage}</span>)}
		</Auxiliary>
	)
}

export default AppNotificationContainer;
