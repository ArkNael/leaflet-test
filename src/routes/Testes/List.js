import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { api } from "util/Api"
import moment from "moment"

import { Space, Card, Button, Input, Table, Dropdown, Popconfirm, Form, DatePicker, message } from "antd";
import Highlighter from 'react-highlight-words';
import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";



const List = (props) => {

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
			width: '6%',
			...getColumnSearchProps('id')
		},
		{
			title: 'Remetente',
			dataIndex: 'remetente',
			sorter: (a, b) => a.remetente.localeCompare(b.remetente),
			...getColumnSearchProps('remetente')
		},
		{
			title: 'Reclamado',
			dataIndex: 'reclamado',
			sorter: (a, b) => a.reclamado.localeCompare(b.reclamado),
			...getColumnSearchProps('reclamado')
		},
		{
			title: 'Último Setor',
			dataIndex: 'ultimoSetor',
			sorter: (a, b) => a.ultimoSetor?.localeCompare(b.ultimoSetor),
			...getColumnSearchProps('ultimoSetor')
		},
		{
			title: 'Dias no Setor',
			dataIndex: 'diasSetor',
			sorter: (a, b) => a.diasSetor?.localeCompare(b.diasSetor),
			...getColumnSearchProps('diasSetor')
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
				<Link to={`/${props.controller}/acompanhar/${rec.id}`}>
					<span style={{ paddingLeft: "5px" }}>Visualizar</span>
				</Link>
			),
			icon: (<i className="icon icon-eye" />)
		},
		{
			key: '2',
			label: (
				<Link to={`/${props.controller}/editar/${rec.id}`}>
					<span style={{ paddingLeft: "5px" }}>Editar</span>
				</Link>
			),
			icon: (<i className="icon icon-edit" />),
			disabled: true,
		},
		{
			key: '3',
			label: (
				<Link to={`/${props.controller}/excluir/${rec.id}`}>
					<span style={{ paddingLeft: "5px" }}>Exluir</span>
				</Link>
			),
			icon: (<i className="icon icon-trash" />),
			disabled: true,
		},
		// {
		// 	key: '3',
		// 	label: (
		// 		<Popconfirm
		// 			title="Deseja excluir o registro?"
		// 			onConfirm={e => { deleteReg(rec.id) }}
		// 			okText="Sim"
		// 			cancelText="Não"
		// 		>
		// 			<span style={{ paddingLeft: "5px" }} className="gx-link">Excluir</span>
		// 		</Popconfirm>
		// 	),
		// 	icon: (<i className="icon icon-trash" />),
		// 	disabled: true,
		// },
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

	const onSubmit = async values => {
		console.log(values)
		let filter = {
			params : {
				dtInicial: values.data?.[0]?moment(values.data[0]).format('DD/MM/YYYY'):'',
				dtFinal: values.data?.[1]?moment(values.data[1]).format('DD/MM/YYYY'):''
			}
		}
		console.log('init')
		await api.get(`api/${props.controller}/listar`, filter)
		.then(({data}) => {
			if (data.ok === 1) {

				let res = data.retorno.map(item => { return {
					id: item.id,
					remetente: item.remetente.nomeRemetente,
					reclamado: item.reclamado.nomeReclamado,
					ultimoSetor: 'OUVIDORIA',
					diasSetor: '1',
					createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')
				}})

				setData(res)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao carregar registros')
		})
		console.log('finish')
	}

	useEffect(() => {
		let getData = async () => {
			await api.get(`api/${props.controller}/listar`)
			.then(({data}) => {
				if (data.ok === 1) {

					let res = data.retorno.map(item => { return {
						id: item.id,
						remetente: item.remetente.nomeRemetente,
						reclamado: item.reclamado.nomeReclamado,
						ultimoSetor: 'OUVIDORIA',
						diasSetor: '1',
						createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')
					}})

					setData(res)
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
		<Form layout="inline" onFinish={onSubmit}>
			<Form.Item label="Data" name="data" labelCol={{xs: {span: 24}, sm: {span: 4}}}>
				<DatePicker.RangePicker format='DD/MM/YYYY' />
			</Form.Item>
			<Form.Item>
				<Button
					className="gx-mb-0"
					type="primary"
					htmlType="submit"
					// loading={this.state.loading}
				>
					Filtrar
				</Button>
          </Form.Item>
		</Form>
			<Table columns={columns} dataSource={data} />
		</Card>
	);
};

export default List;
