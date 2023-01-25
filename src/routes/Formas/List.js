import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "util/Api"
import moment from "moment"

import { Card, Button, Table, Dropdown, Popconfirm, message } from "antd";
import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";



const List = (props) => {

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
			dataIndex: 'nomeForma',
			sorter: (a, b) => a.nomeForma.localeCompare(b.nomeForma),
		},
		{
			title: 'Tipo',
			dataIndex: 'tipoForma',
			sorter: (a, b) => a.tipoForma.localeCompare(b.tipoForma),
			width: '16%'
		},
		{
			title: 'Adicionado em',
			dataIndex: 'createdAt',
			sorter: (a, b) => 
				moment(a.createdAt, "DD/MM/YYYY HH:mm:ss").unix() - 
				moment(b.createdAt, "DD/MM/YYYY HH:mm:ss").unix(),
			width: '16%'
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
			  width: '8%'
		},
	];

	const submenus = rec => [
		{
			key: '1',
			label: (
				<Link to={`/formas/editar/${rec.id}`}>
					<span style={{ paddingLeft: "5px" }}>Editar</span>
				</Link>
			),
			icon: (<i className="icon icon-edit" />)
		},
		{
			key: '2',
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
		const registros = data.filter(item => item.id !== key);

		let res = await api.post(`api/formas/excluir/${key}`)
		if (res.data.ok === 1) {
			message.success(res.data.mensagem)
			setData(registros)
		} else {
			message.error(res.data.mensagem)
		}
	};

	useEffect(() => {
		let getData = async () => {
			let res = await api.get('api/formas/listar')
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
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}`} /></h2> }
			extra={
				<p className="gx-text-primary gx-mb-0 gx-pointer">
					<Link to={'/formas/adicionar'}>
						<Button type="primary">
							<i className="icon icon-plus" />
							<IntlMessages style={{ paddingLeft: "15px" }} id='sidebar.formas.add' />
						</Button>
					</Link>
				</p>
			}
		>
			<Table columns={columns} dataSource={data} />
		</Card>
	);
};

export default List;
