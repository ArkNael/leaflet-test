module.exports = {
  footerText: `Copyright Unimed Natal © ${(new Date()).getFullYear()} - (v${process.env.REACT_APP_VERSION
    })`,
  recaptchaToken: process.env.REACT_APP_RECAPTCHATOKEN,
  urlApiRails: process.env.REACT_APP_API_URL_RAILS,
  urlApi: process.env.REACT_APP_API_URL,
  appName: process.env.REACT_APP_NAME,
  codAplicacao: process.env.REACT_APP_COD
};
