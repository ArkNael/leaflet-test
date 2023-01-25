import React from 'react';

import { api } from "util/Api"

import { Select, Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Add = (props) => {

	const handleSubmit = async ({name, type}) => {
		await api.post(`api/${props.controller}/adicionar`, {
			nome: name,
			tipoForma: type
		})
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
				<Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Preencha o campo "nome"!' }]} wrapperCol={{span: 10}}>
					<Input placeholder='Descrição' maxLength="50"/>
				</Form.Item>
				<Form.Item label="Tipo" name="type" rules={[{ required: true, message: 'Preencha o campo "tipo"!' }]} wrapperCol={{span: 4}}>
				<Select 
					placeholder='Selecione o tipo'
					options={[
						{ value: 'Tipo 1', label: 'Tipo 1' },
						{ value: 'Tipo 2', label: 'Tipo 2' },
						{ value: 'Tipo 3', label: 'Tipo 3' }
					]}
				/>
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Add;