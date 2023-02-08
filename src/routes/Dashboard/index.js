import React from "react";
import {Col, Row} from "antd";

import {Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {increamentData, ocorrenciasEncaminhadas, ocorrenciasFechadas, ocorrenciasPausadas} from "./Metrics/data";
import ChartCard from "components/dashboard/Crypto/ChartCard";
import Auxiliary from "util/Auxiliary";
import OcorrenciasMes from "components/dashboard/Ocorrencias/Metragem";
import Historico from "components/dashboard/Ocorrencias/Historico";
import OrderHistory from "components/dashboard/Ocorrencias/Atrasos";

const Dashboard = () => {
	return (
		<Auxiliary>
			<Row>
				<Col xl={6} lg={12} md={12} sm={12} xs={24}>
					<ChartCard prize="46" title="23" icon="bitcoin" children={
						<ResponsiveContainer width="100%" height={75}>
							<AreaChart data={increamentData} margin={{top: 0, right: 0, left: 0, bottom: -30}}>
								<XAxis dataKey="name" style={{display: 'none'}}/>
								<Tooltip/>
								<defs>
									<linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
										<stop offset="5%" stopColor="#163469" stopOpacity={0.9}/>
										<stop offset="95%" stopColor="#FE9E15" stopOpacity={0.9}/>
									</linearGradient>
								</defs>
								<Area dataKey='quantidade' strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color3)" fillOpacity={1}/>
							</AreaChart>
						</ResponsiveContainer>
					} styleName="up" desc="Ocorrências Abertas"/>
				</Col>
				<Col xl={6} lg={12} md={12} sm={12} xs={24}>
					<ChartCard prize="44" title="07" icon="etherium" children={
						<ResponsiveContainer width="100%" height={75}>
							<AreaChart data={ocorrenciasEncaminhadas} margin={{top: 0, right: 0, left: 0, bottom: -30}}>
								<XAxis dataKey="name" style={{display: 'none'}}/>
								<Tooltip/>
								<defs>
									<linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
										<stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
										<stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
									</linearGradient>
								</defs>
								<Area dataKey='quantidade' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color4)" fillOpacity={1}/>
							</AreaChart>
						</ResponsiveContainer>
					} styleName="up" desc="Ocorrências Encaminhadas"/>
				</Col>
				<Col xl={6} lg={12} md={12} sm={12} xs={24}>
					<ChartCard prize="16" title="08" icon="ripple" children={
						<ResponsiveContainer width="100%" height={75}>
							<AreaChart data={ocorrenciasFechadas} margin={{top: 0, right: 0, left: 0, bottom: -30}}>
								<XAxis dataKey="name" style={{display: 'none'}}/>
								<Tooltip/>
								<defs>
									<linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#e81a24" stopOpacity={0.8}/>
										<stop offset="95%" stopColor="#FEEADA" stopOpacity={0.8}/>
									</linearGradient>
								</defs>
								<Area dataKey='quantidade' strokeWidth={0} stackId="2" stroke='#FEEADA' fill="url(#color5)" fillOpacity={1}/>
							</AreaChart>
						</ResponsiveContainer>
					} styleName="down" desc="Ocorrências Fechadas"/>
				</Col>
				<Col xl={6} lg={12} md={12} sm={12} xs={24}>
					<ChartCard prize="17" title="25" icon="litcoin" children={
						<ResponsiveContainer width="100%" height={75}>
						<LineChart data={ocorrenciasPausadas} margin={{top: 5, right: 5, left: 5, bottom: -25}}>
							<XAxis dataKey="name" style={{display: 'none'}}/>
							<Tooltip/>
							<Line dataKey="quantidade" stroke="#038FDE" dot={{stroke: '#FEA931', strokeWidth: 2}}/>
						</LineChart>
						</ResponsiveContainer>
					} styleName="down" desc="Ocorrências Pausadas"/>
				</Col>
				<Col xl={12} lg={24} md={12} sm={24} xs={24}>
					<OcorrenciasMes/>
				</Col>
				<Col xl={12} lg={24} md={24} sm={24} xs={24}>
					<Historico/>
				</Col>
				<Col xl={24} lg={24} md={24} sm={24} xs={24}>
					<OrderHistory/>
				</Col>
			</Row>

		</Auxiliary>
	)
}

export default Dashboard;
