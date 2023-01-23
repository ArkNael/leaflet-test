import React, { useState, useEffect } from 'react';

import { api } from "util/Api"

import { Button, Card, Col, Form, Input, message } from 'antd';
import IntlMessages from "util/IntlMessages";


const Editar = (props) => {

	const [name, setName] = useState()

	const handleSubmit = async (values) => {
		if (name.trim() === '') {
			message.error('Preencha o campo "nome"!') 
			return
		}

		let res = await api.post(`api/temas/editar/${props.match.params.id}`, {nome: name})
		if (res.data.ok === 1) {
			message.success(res.data.mensagem)
			props.history.push("/temas")
		} else {
			message.error(res.data.mensagem)
		}
	}

	useEffect(() => {
		let getData = async () => {
			let res = await api.get(`api/temas/listar/${props.match.params.id}`)
			if (res.data.ok === 1) {
				setName(res.data.retorno[0].nomeTema)
			} else {
				message.error(res.data.message)
			}
		}

		getData()
	}, [])
	
	return (
		<Card className="gx-card" title={<IntlMessages id="sidebar.temas.editar" />} id="cardmotivo" >
			<Form layout="inline" onFinish={handleSubmit}>
				<Col span={12}>
					<Form.Item label="*Nome">
						<Input placeholder='Descrição' name="nome" maxLength="50" value={name} onChange={event => {setName(event.target.value)}}/>
					</Form.Item>
				</Col>
				<Form.Item>
					<Button className="gx-mb-0" type="primary" htmlType="submit">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	)
};

export default Editar;