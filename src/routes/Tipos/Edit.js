import React, { useState, useEffect } from 'react';

import { api } from "util/Api"

import { Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Edit = (props) => {

	const [name, setName] = useState()

	const handleSubmit = async (values) => {
		if (name.trim() === '') {
			message.error('Preencha o campo "nome"!') 
			return
		}

		let res = await api.post(`api/${props.controller}/editar/${props.match.params.id}`, { nome: name })

		if (res.data.ok === 1) {
			message.success(res.data.mensagem)
			props.history.push(`/${props.controller}`)
		} else {
			message.error(res.data.mensagem)
		}
	}

	useEffect(() => {
		const getData = async () => {
			let res = await api.get(`api/${props.controller}/listar/${props.match.params.id}`)
			if (res.data.ok === 1) {
				setName(res.data.retorno[0].nomeTipo)
			} else {
				message.error(res.data.message)
			}
		}

		getData()
	}, [props])
	
	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.edit`} />}>
			<Form layout="horizontal" onFinish={handleSubmit} labelCol={{span: 6}}>
				<Form.Item label="*Nome" wrapperCol={{span: 10}}>
					<Input placeholder='Descrição' maxLength="50" value={name} onChange={event => {setName(event.target.value)}} />
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Edit;