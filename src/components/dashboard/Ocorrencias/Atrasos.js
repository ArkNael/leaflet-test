import React from "react";
import {Table} from "antd";
import Widget from "components/Widget/index";

const columns = [
  {
    title: 'Abertura',
    dataIndex: 'dataAbertura',
  },
  {
    title: 'Complexidade',
    dataIndex: 'complexidade',
  },
  {
    title: 'Situação Atual',
    dataIndex: 'situacao',
  },
  {
    title: 'Prazo Inicial',
    dataIndex: 'prazoInicial',
  },
  {
    title: 'Dias em Atraso',
    dataIndex: 'diasAtraso',
    render: (text) => {
      return <span className="gx-text-red">{text}</span>
    },
  }
];

const data = [
  {
    key: '1',
    dataAbertura: '01/01/2023',
    complexidade: 'Complexa',
    situacao: 'Pausada',
    prazoInicial: '07/01/2023',
    diasAtraso: '25'
  },
  {
    key: '2',
    dataAbertura: '05/01/2023',
    complexidade: 'Complexa',
    situacao: 'Pausada',
    prazoInicial: '12/01/2023',
    diasAtraso: '17'
  },
  {
    key: '3',
    dataAbertura: '06/01/2023',
    complexidade: 'Simples',
    situacao: 'Encaminhada',
    prazoInicial: '13/01/2023',
    diasAtraso: '16'
  },
  {
    key: '4',
    dataAbertura: '17/01/2023',
    complexidade: 'Primeira Instância',
    situacao: 'Pausada',
    prazoInicial: '24/01/2023',
    diasAtraso: '5'
  },
  {
    key: '5',
    dataAbertura: '24/01/2023',
    complexidade: 'Simples',
    situacao: 'Encaminhada',
    prazoInicial: '31/01/2023',
    diasAtraso: '1'
  },
];

const OrderHistory = () => {
  return (
    <Widget styleName="gx-order-history"
            title={
              <h2 className="h4 gx-text-capitalize gx-mb-0">Ocorrências em Atraso</h2>
            } extra={
      <p className="gx-text-primary gx-mb-0 gx-pointer">Detalhes</p>
    }>
      <div className="gx-table-responsive">
        <Table className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false} bordered={false} size="small"/>
      </div>
    </Widget>
  );
};

export default OrderHistory;
