import React from 'react';

import { api } from "util/Api"

import { Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";
import './styles.css'


const Add = (props) => {

	const handleSubmit = async ({nome, cod, codPai}) => {
		await api.post(`api/${props.controller}/adicionar`, {
			nomeCcusto: nome,
			externalCcustoId: cod,
			paiCcustoId: codPai
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
				<Form.Item label="Nome" name="nome" rules={[{ required: true, message: '' }]} wrapperCol={{span: 12}}>
					<Input placeholder='Descrição' />
				</Form.Item>
				<Form.Item label="Código" name="cod" rules={[{ required: true, message: '' }]} wrapperCol={{span: 4}}>
					<Input type='number' placeholder='Cód. do centro de custo'/>
				</Form.Item>
				<Form.Item label="Código Pai:" name="codPai" rules={[{ required: true, message: '' }]} wrapperCol={{span: 4}}>
					<Input type='number' placeholder='Cód. do centro de custo'/>
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Add;