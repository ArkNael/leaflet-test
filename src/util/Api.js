import axios from 'axios';
import { appName, codAplicacao, urlApiRails, urlApi } from "util/config";

export const httpClient = axios.create({
	baseURL: urlApiRails,
	headers: {
		'Content-Type': 'application/json',
		AppName: appName,
		CodAplicacao: codAplicacao
	},
});

export const api = axios.create({
	baseURL: urlApi,
	headers: {
		"Content-Type": "application/json",
		"Authorization": "Basic QVBJX1RFQTpAQHVuaW1lZDA2Ml9hcGktdGVhQEA="
	}
});


