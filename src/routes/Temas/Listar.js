import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "util/Api"
import moment from "moment"

import { Card, Button, Table, Dropdown, Menu, Popconfirm, message } from "antd";
import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";



const Listar = () => {

	const [data, setData] = useState(null)

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.id - b.id,
			width: '6%'
		},
		{
			title: 'Nome',
			dataIndex: 'nomeTema',
			sorter: (a, b) => a.nomeTema.localeCompare(b.nomeTema),
			width: '60%'
		},
		{
			title: 'Adicionado em',
			dataIndex: 'createdAt',
			sorter: (a, b) => 
				moment(a.createdAt, "DD/MM/YYYY HH:mm:ss").unix() - 
				moment(b.createdAt, "DD/MM/YYYY HH:mm:ss").unix(),
		},
		{
			title: 'Ação',
			render: (text, record) => (
				<div>
					<Dropdown overlay={submenus(record)}>
						<span className="gx-link ant-dropdown-link">
							Opções
							<Icons.CaretDownOutlined />
						</span>
					</Dropdown>
				</div>
			  )
		},
	];

	const submenus = rec => {
		return (
			<Menu>
				<Menu.Item>
					<Link to={`/temas/editar/${rec.id}`}>
						<i className="icon icon-edit" />
						<span style={{ paddingLeft: "5px" }}>Editar</span>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<i className="icon icon-trash" />
					<Popconfirm
						title="Deseja excluir o registro?"
						onConfirm={e => { deleteReg(rec.id) }}
						okText="Sim"
						cancelText="Não"
					>
						<span style={{ paddingLeft: "5px" }} className="gx-link">Excluir</span>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
	};

	const deleteReg = async (key) => {
		const registros = data.filter(item => item.id !== key);

		let res = await api.post(`api/temas/excluir/${key}`)
		if (res.data.ok === 1) {
			console.log(res.data)
			message.success(res.data.mensagem)
			setData(registros)
		} else {
			message.error(res.data.mensagem)
		}
	};

	useEffect(() => { 
		let getData = async () => {
			let res = await api.get('api/temas/listar')
			if (res.data.ok === 1) {
				setData(res.data.retorno)
			} else {
				message.error(res.data.mensagem)
			}
		}

		getData()
	}, [])

	return (
		<Card 
			className="gx-card" 
			type="inner" 
			title={ <h2 className="title gx-mb-4">Temas</h2> }
			extra={
				<p className="gx-text-primary gx-mb-0 gx-pointer">
					<Link to={'/temas/adicionar'}>
						<Button type="primary">
							<i className="icon icon-plus" />
							<IntlMessages style={{ paddingLeft: "15px" }} id='sidebar.temas.adicionar' />
						</Button>
					</Link>
				</p>
			}
		>
			<Table columns={columns} dataSource={data} />
		</Card>
	);
};

export default Listar;
