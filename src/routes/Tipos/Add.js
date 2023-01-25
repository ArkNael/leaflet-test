import React from 'react';

import { api } from "util/Api"

import { Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Add = (props) => {

	const handleSubmit = async ({name}) => {
		let { data } = await api.post(`api/${props.controller}/adicionar`, { nome: name })

		if (data.ok === 1) {
			message.success(data.mensagem)
			props.history.push(`/${props.controller}`)
		} else {
			message.error(data.mensagem)
		}
	}
	
	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.new`} />}>
			<Form layout="horizontal" onFinish={handleSubmit} labelCol={{span: 6}}>
				<Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Preencha o campo "nome"!' }]} wrapperCol={{span: 10}}>
					<Input placeholder='Descrição' maxLength="50"/>
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Add;