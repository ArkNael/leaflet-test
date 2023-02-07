import React from "react";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {Select} from "antd";

import Widget from "components/Widget/index";

const data = [
  {name: '', quantidade: ''},
  {name: 'FEV', quantidade: 33},
  {name: 'MAR', quantidade: 13},
  {name: 'ABR', quantidade: 17},
  {name: 'MAI', quantidade: 51},
  {name: 'JUN', quantidade: 48},
  {name: 'JUL', quantidade: 25},
  {name: 'AGO', quantidade: 12},
  {name: 'SET', quantidade: 64},
  {name: 'OUT', quantidade: 25},
  {name: 'NOV', quantidade: 87},
  {name: 'DEZ', quantidade: 31},
  {name: 'JAN', quantidade: 43},
  {name: '', quantidade: ''},
];

const Option = Select.Option;

const BalanceHistory = () => {
  function handleChange(value) {
  }

  return (
    <Widget styleName="gx-card-full">

      <div className="ant-row-flex gx-px-4 gx-pt-4">
        <h2 className="h4 gx-mb-3">Histórico de Ocorrências</h2>
        <div className="gx-ml-auto">
          <Select className="gx-mb-2 gx-select-sm" defaultValue="10" onChange={handleChange}>
            <Option value="10">Últimos 10 dias</Option>
            <Option value="20">Últimos 20 dias</Option>
            <Option value="30">Últimos 30 dias</Option>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}
                   margin={{top: 0, right: 0, left: 0, bottom: 0}}>
          <Tooltip/>
          <XAxis dataKey="name"/>
          <defs>
            <linearGradient id="color15" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38AAE5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F5FCFD" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <Area dataKey='quantidade' strokeWidth={2} stackId="2" stroke='#10316B' fill="url(#color15)"
                fillOpacity={1}/>
        </AreaChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default BalanceHistory;
