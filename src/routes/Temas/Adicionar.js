import React from 'react';

import { api } from "util/Api"

import { Button, Card, Col, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Adicionar = (props) => {

	const handleSubmit = async (values) => {
		let { data } = await api.post('api/temas/adicionar', values)
		if (data.ok === 1) {
			message.success(data.mensagem)
			props.history.push("/temas")
		} else {
			message.error(data.mensagem)
		}
	}
	
	return (
		<Card className="gx-card" title={<IntlMessages id="sidebar.temas.novo" />} id="cardmotivo" >
			<Form layout="inline" onFinish={handleSubmit}>
				<Col span={12}>
					<Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Preencha o campo "nome"!' }]}>
						<Input placeholder='Descrição' maxLength="50"/>
					</Form.Item>
				</Col>
				<Form.Item>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Adicionar;