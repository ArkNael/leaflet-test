import React, { useState, useEffect } from 'react';

import { api } from "util/Api"

import { Select, Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Edit = (props) => {

	const [name, setName] = useState()
	const [type, setType] = useState()

	const handleSubmit = async (values) => {
		if (name.trim() === '') {
			message.error('Preencha o campo "nome"!') 
			return
		}
		if (type === null) {
			message.error('Preencha o campo "tipo"!') 
			return
		}

		await api.post(`api/${props.controller}/editar/${props.match.params.id}`, {
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

	useEffect(() => {
		const getData = async () => {
			await api.get(`api/${props.controller}/listar/${props.match.params.id}`)
			.then(({data}) => {
				if (data.ok === 1) {
					setName(data.retorno[0].nomeForma)
					setType(data.retorno[0].tipoForma)
				} else {
					message.error(data.message)
				}
			})
			.catch((err) => {
				message.error('Erro ao carregar informações do registro')
			})
			
		}

		getData()
	}, [props])
	
	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.edit`} />}>
			<Form layout="horizontal" onFinish={handleSubmit} labelCol={{span: 6}}>
				<Form.Item label="*Nome" wrapperCol={{span: 10}}>
					<Input placeholder='Descrição' maxLength="50" value={name} onChange={event => {setName(event.target.value)}} />
				</Form.Item>
				<Form.Item label="*Tipo" wrapperCol={{span: 4}}>
				<Select 
					placeholder='Selecione o tipo'
					value={type} 
					onChange={value => {setType(value)}}
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

export default Edit;