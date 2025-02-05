import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { api } from "util/Api"
import moment from "moment"

import { Space, Card, Input, Button, Table, Dropdown, Popconfirm, message } from "antd";
import * as Icons from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import IntlMessages from "util/IntlMessages";



const DefaultList = (props) => {
	const config = {
		defaultVarLabel: props.config?.defaultVar.label || 'Nome',
		defaultVarIndex: props.config?.defaultVar.index || 'nome'
	}

	const [data, setData] = useState(null)
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Buscar por ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<Icons.SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
					>
						Buscar
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{
							width: 90,
						}}
					>
						Limpar
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<Icons.SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.id - b.id,
			width: '6%'
		},
		{
			title: config.defaultVarLabel,
			dataIndex: config.defaultVarIndex,
			sorter: (a, b) => a[config.defaultVarIndex].localeCompare(b[config.defaultVarIndex]),
			...getColumnSearchProps(config.defaultVarIndex)
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
			title: 'Criado por',
			dataIndex: 'createdBy',
			sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
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
			  width: '8%'
		},
	];

	const submenus = rec => [
		{
			key: '1',
			label: (
				<Link to={`/${props.controller}/editar/${rec.id}`}>
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

		await api.post(`api/${props.controller}/excluir/${key}`)
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
				setData(registros)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao excluir registro')
		})
	};

	useEffect(() => {
		let getData = async () => {
			await api.get(`api/${props.controller}/listar`)
			.then(({data}) => {
				if (data.ok === 1) {
					setData(data.retorno)
				} else {
					message.error(data.mensagem)
				}
			})
			.catch((err) => {
				message.error('Erro ao carregar registros')
			})
		}

		getData()
	}, [props])

	return (
		<Card 
			className="gx-card" 
			type="inner" 
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}`} /></h2> }
			extra={
				<p className="gx-text-primary gx-mb-0 gx-pointer">
					<Link to={`/${props.controller}/adicionar`}>
						<Button type="primary">
							<Icons.PlusOutlined style={{paddingRight: '5px'}} />
							<IntlMessages id={`sidebar.${props.controller}.add`} />
						</Button>
					</Link>
				</p>
			}
		>
			<Table columns={columns} dataSource={data} />
		</Card>
	);
};

export default DefaultList;
