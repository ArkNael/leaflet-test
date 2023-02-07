import React from "react";
import Widget from "components/Widget/index";
import {Button, Col, Row} from "antd";
import LineIndicator from "./LineIndicator";

const Portfolio = () => {
  return (
    <Widget>
      <h2 className="h4 gx-mb-3">Ocorrencias abertas este mês</h2>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>

          <div className="ant-row-flex">
            <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">46</h2>
            <h4 className="gx-pt-2 gx-chart-up">23% <i className="icon icon-menu-up gx-fs-sm"/></h4>
          </div>
          <div className="gx-site-dash">
            <ul className="gx-line-indicator gx-fs-sm gx-pb-1 gx-pb-sm-0">
              <li>
                <LineIndicator width="35%" title="Fechados" title2="16" color="primary" value="35%"/>
              </li>
              <li>
                <LineIndicator width="38%" title="Pausados" title2="17" color="pink" value="38%"/>
              </li>
              <li>
                <LineIndicator width="27%" title="Backlog" title2="13" color="orange" value="27%"/>
              </li>
            </ul>
            <p className="gx-text-primary gx-pointer gx-d-block gx-d-sm-none gx-mb-0 gx-mt-3">
              <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle"/> Add New Wallet
            </p>
          </div>
        </Col>
      </Row>
    </Widget>
  );
};

export default Portfolio;
