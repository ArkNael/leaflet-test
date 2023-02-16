import React, { useState, useEffect } from 'react';

import { api } from "util/Api"
import { useAuth } from '../../authentication';

import { Button, Card, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Edit = (props) => {
	const {authUser} = useAuth();

	const [nome, setNome] = useState()
	const [cod, setCod] = useState()
	const [codPai, setCodPai] = useState()

	const handleSubmit = async (values) => {
		if (nome.trim() === '') {
			message.error('Preencha o campo "nome"!') 
			return
		}
		if (cod.trim() === '') {
			message.error('Preencha o campo "cod"!') 
			return
		}
		if (codPai.trim() === '') {
			message.error('Preencha o campo "codPai"!') 
			return
		}

		await api.post(`api/${props.controller}/editar/${props.match.params.id}`, {
			nomeCcusto: nome,
			externalCcustoId: cod,
			paiCcustoId: codPai,
			usuario: authUser.name.split(' ')[0]
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
					setNome(data.retorno[0].nome)
					setCod(data.retorno[0].codigo)
					setCodPai(data.retorno[0].codigoPai)
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
				<Form.Item label="*Nome" wrapperCol={{span: 12}}>
					<Input placeholder='Descrição' maxLength="50" value={nome} onChange={event => setNome(event.target.value)} />
				</Form.Item>
				<Form.Item label="*Código" wrapperCol={{span: 5}}>
					<Input type='number' placeholder='Código do centro de custo' value={cod} onChange={event => setCod(event.target.value)} />
				</Form.Item>
				<Form.Item label="*Código Pai" wrapperCol={{span: 5}}>
					<Input type='number' placeholder='Código do centro de custo pai' value={codPai} onChange={event => setCodPai(event.target.value)} />
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Edit;