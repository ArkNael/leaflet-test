import React from "react";
import { Button, Form, Input } from "antd";
import IntlMessages from "util/IntlMessages";
import { useAuth } from "../authentication";
import AppNotificationContainer from "../components/AppNotificationContainer";

const SignIn = () => {
  const { isLoading, error, userLogin } = useAuth();

  const onFinishFailed = errorInfo => {
  };

  const onFinish = values => {
    userLogin(values);
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg"></div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
                <span> - </span>
                <IntlMessages id="topbar.titulo" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
            </div>
            <div className="gx-app-logo">
              <img alt="Unimed" src="/assets/images/logo-unimed.png" style={{ width: "100px" }}/>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                rules={[{ required: true, message: 'Preencha o campo com seu usuário de rede.' }]} name="username">
                <Input placeholder="Usuário de rede" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Preencha o campo de senha.' }]} name="password">
                <Input type="password" placeholder="Senha" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
              </Form.Item>
            </Form>
          </div>
          <AppNotificationContainer loading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
