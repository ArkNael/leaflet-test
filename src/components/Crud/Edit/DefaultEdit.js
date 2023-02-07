import React, { useState, useEffect, useMemo } from 'react';

import { api } from "util/Api"
import { useAuth } from '../../../authentication';

import { Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Edit = (props) => {
	const {authUser} = useAuth();
	
	const config = useMemo(() => {
		return({
			defaultVarLabel: props.config?.defaultVar.label || 'Nome',
			defaultVarIndex: props.config?.defaultVar.index || 'nome',
			defaultVarPlaceholder: props.config?.defaultVar.index || 'Descrição'
		})
	}, [props])

	const [value, setValue] = useState()

	const handleSubmit = async (values) => {
		if (value.trim() === '') {
			message.error(`Preencha o campo "${config.defaultVarLabel}"!`) 
			return
		}

		let body = {
			[config.defaultVarIndex]: value,
			usuario: authUser.name.split(' ')[0]
		}

		await api.post(`api/${props.controller}/editar/${props.match.params.id}`, body)
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
					setValue(data.retorno[0][config.defaultVarIndex])
				} else {
					message.error(data.message)
				}
			})
			.catch((err) => {
				message.error('Erro ao carregar informações do registro')
			})
		}

		getData()
	}, [props, config])
	
	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.edit`} />}>
			<Form layout="horizontal" onFinish={handleSubmit} labelCol={{span: 6}}>
				<Form.Item label={`*${config.defaultVarLabel}`} wrapperCol={{span: 10}}>
					<Input placeholder={config.defaultVarPlaceholder} maxLength="50" value={value} onChange={event => {setValue(event.target.value)}} />
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Edit;