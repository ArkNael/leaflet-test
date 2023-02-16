import React, { useState, useEffect } from 'react';

import { api } from "util/Api"
import { useAuth } from '../../authentication';

import { Table, Select, Button, Card, Form, Dropdown, Popconfirm, message } from 'antd';
import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";


const getData = async (ccusto, setData) => {
	await api.get(`api/responsaveis/listar?ccusto=${ccusto}`)
	.then(({data}) => {
		if (data.ok === 1) {
			setData(data.retorno)
		} else {
			message.error(data.message)
		}
	})
	.catch((err) => {
		message.error('Erro ao carregar responsáveis')
	})
}

const getColaboradores = async (setColaboradores) => {
	await api.get(`api/responsaveis/listar-colaboradores`)
	.then(({data}) => {
		if (data.ok === 1) {
			setColaboradores(data.retorno.map(data => { return { label: data.nome, value: data.id } }))
		} else {
			message.error(data.message)
		}
	})
	.catch((err) => {
		message.error('Erro ao carregar colaboradores')
	})
}


const Edit = (props) => {
	const {authUser} = useAuth();

	const [data, setData] = useState([])
	const [colaboradores, setColaboradores] = useState([])
	const [colaborador, setColaborador] = useState()
	const [tipo, setTipo] = useState()

	const columns = [
		{
			title: 'Id',
			dataIndex: 'usuarioId',
			sorter: (a, b) => a.usuarioId - b.usuarioId,
			width: '20%'
		},
		{
			title: 'Nome',
			dataIndex: 'nome',
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
		},
		{
			title: 'Tipo',
			dataIndex: 'tipo',
			sorter: (a, b) => a.tipo.toLowerCase().localeCompare(b.tipo.toLowerCase()),
			render: (text, record) => (
				<Select
					placeholder="Selecione o tipo"
					onChange={value => alterarTipo(value, record.id)}
					defaultValue={record.tipo}
					options={[
						{
							value: 'FACILITADOR',
							label: 'FACILITADOR',
						},
						{
							value: 'GESTOR',
							label: 'GESTOR',
						}
					]}
					style={{width: '100%'}}
				/>
			),
			width: '20%'
		},
		{
			title: 'Ação',
			render: (text, record) => (
				<div>
					<Dropdown menu={{items: submenus(record)}}>
						<span className="gx-link ant-dropdown-link">
							Opções
							<Icons.CaretDownOutlined />
						</span>
					</Dropdown>
				</div>
			  ),
			  width: '10%'
		},
	];

	const submenus = rec => [
		{
			key: '1',
			label: (
				<Popconfirm
					title="Deseja excluir o registro?"
					onConfirm={e => { deleteReg(rec.id) }}
					okText="Sim"
					cancelText="Não"
				>
					<span style={{ paddingLeft: "5px" }} className="gx-link">Excluir</span>
				</Popconfirm>
			),
			icon: (<i className="icon icon-trash" />),
		},
	];

	const deleteReg = async (key) => {
		// const registros = data.filter(item => item.id !== key);
		await api.post(`api/responsaveis/excluir/${key}`)
		.then(({data}) => {
			if (data.ok === 1) {
				// setData(registros)
				props.history.push(`/${props.controller}/responsaveis/${props.match.params.id}`)
				message.success(data.mensagem)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao excluir registro')
		})
	};

	const alterarTipo = async (value, id_resp) => {
		await api.post(`api/responsaveis/editar/${id_resp}`, {tipo: value})
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao modificar registro')
		})
	}

	const onChange = (value, setFunc) => setFunc(value)

	const handleSubmit = async (values) => {
		await api.post(`api/responsaveis/adicionar`, {
			ccustoId: props.match.params.id,
			usuarioId: colaborador,
			tipo: tipo,
			usuario: authUser.name.split(' ')[0]
		})
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
				props.history.push(`/${props.controller}/responsaveis/${props.match.params.id}`)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao salvar registro')
		})
	}

	useEffect(() => {
		getData(props.match.params.id, setData)
		getColaboradores(setColaboradores)
	}, [props])
	
	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.edit`} />}>
			<Form layout="horizontal" onFinish={handleSubmit} labelCol={{span: 6}}>
				<Form.Item label="*Colaborador" wrapperCol={{span: 8}}>
					<Select
						showSearch
						placeholder="Selecione um colaborador"
						optionFilterProp="children"
						onChange={value => onChange(value, setColaborador)}
						filterOption={(input, option) =>
							(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
						}
						options={colaboradores}
					/>
				</Form.Item>
				<Form.Item label="*Código" wrapperCol={{span: 5}}>
					<Select
						placeholder="Selecione o tipo"
						onChange={value => onChange(value, setTipo)}
						options={[
							{
								value: 'FACILITADOR',
								label: 'FACILITADOR',
							},
							{
								value: 'GESTOR',
								label: 'GESTOR',
							}
						]}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit" disabled={(!colaborador || !tipo)}>Salvar</Button>
				</Form.Item>
			</Form>
			<Table columns={columns} dataSource={data} rowClassName={record => record.deletedAt && "disabled-row"} />
		</Card>
	)
};

export default Edit;