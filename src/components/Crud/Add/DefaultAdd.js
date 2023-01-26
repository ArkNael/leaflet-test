import React from 'react';

import { api } from "util/Api"

import { Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const DefaultAdd = (props) => {

	const config = {
		defaultVarLabel: props.config?.defaultVar.label || 'Nome',
		defaultVarIndex: props.config?.defaultVar.index || 'nome',
		defaultVarPlaceholder: props.config?.defaultVar.index || 'Descrição'
	}

	const handleSubmit = async ({value}) => {
		let body = {}
		body[config.defaultVarIndex] = value

		await api.post(`api/${props.controller}/adicionar`, body)
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
				props.history.push(`/${props.controller}`)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao salvar registro')
		})
	}
	
	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.new`} />}>
			<Form layout="horizontal" onFinish={handleSubmit} labelCol={{span: 6}}>
				<Form.Item label={config.defaultVarLabel} name="value" rules={[{ required: true, message: `Preencha o campo "${config.defaultVarLabel}"!` }]} wrapperCol={{span: 10}}>
					<Input placeholder={config.defaultVarPlaceholder} maxLength="50"/>
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default DefaultAdd;