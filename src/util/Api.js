import axios from 'axios';
import { appName, codAplicacao, urlApiRails, urlApi } from "util/config";

export const httpClient = axios.create({
  baseURL: `${urlApiRails}apps`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
    AppName: appName,
    CodAplicacao: codAplicacao
  },
});

export const systemApi = axios.create({
  baseURL: urlApi,
  headers: {
    "Content-Type": "application/json"
  }
});


