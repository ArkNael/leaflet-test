import { useEffect, useRef, useState } from 'react'

import { Card, Form, Button, Table, Select, Divider } from 'antd'
// import { getYears, rowClassName } from '../util/Basic'
import { exportToExcel } from '../util/XlsxConvert'

import IntlMessages from "../../../util/IntlMessages"

import './styles.css'


const dataSource = [
	{
		key: 1,
		nome: "outros",
		dados: { Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0, Total: 0 }
	},
	{
		key: 2,
		nome: "telefone",
		dados: { Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0, Total: 0 }
	},
	{
		key: 3,
		nome: "totem",
		dados: { Jan: 2, Fev: 4, Mar: 2, Abr: 2, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 10, Total: 20 }
	},
	{
		key: 4,
		nome: "aplicativo",
		dados: { Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0, Total: 0 }
	},
	{
		key: 5,
		nome: "site",
		dados: { Jan: 17, Fev: 29, Mar: 40, Abr: 11, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 97, Total: 194 }
	},
	{
		key: 6,
		nome: "email",
		dados: { Jan: 139, Fev: 129, Mar: 160, Abr: 52, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 480, Total: 960 }
	}
]

const columns = [
	{
		title: 'Categoria',
		dataIndex: 'nome',
		key: 'categoria',
		width: '18%'
	},
	{
		title: 'Jan',
		dataIndex: ['dados', 'Jan'],
		key: 'jan',
		width: '6%'
	},
	{
		title: 'Fev',
		dataIndex: ['dados', 'Fev'],
		key: 'fev',
		width: '6%'
	},
	{
		title: 'Mar',
		dataIndex: ['dados', 'Mar'],
		key: 'mar',
		width: '6%'
	},
	{
		title: 'Abr',
		dataIndex: ['dados', 'Abr'],
		key: 'abr',
		width: '6%'
	},
	{
		title: 'Mai',
		dataIndex: ['dados', 'Mai'],
		key: 'mai',
	},
	{
		title: 'Jun',
		dataIndex: ['dados', 'Jun'],
		key: 'jun',
		width: '6%'
	},
	{
		title: 'Jul',
		dataIndex: ['dados', 'Jul'],
		key: 'jul',
		width: '6%'
	},
	{
		title: 'Ago',
		dataIndex: ['dados', 'Ago'],
		key: 'ago',
		width: '6%'
	},
	{
		title: 'Set',
		dataIndex: ['dados', 'Set'],
		key: 'set',
		width: '6%'
	},
	{
		title: 'Out',
		dataIndex: ['dados', 'Out'],
		key: 'out',
	},
	{
		title: 'Nov',
		dataIndex: ['dados', 'Nov'],
		key: 'nov',
		width: '6%'
	},
	{
		title: 'Dez',
		dataIndex: ['dados', 'Dez'],
		key: 'dez',
		width: '6%'
	},
	{
		title: 'Total',
		dataIndex: ['dados', 'Total'],
		key: 'total',
		width: '10%'
	},
]

const Complexidades = (props) => {
	const [data, setData] = useState(dataSource)
	const tableRef = useRef(null)
	const tableRef2 = useRef(null)
	const tableRef3 = useRef(null)
	const tableRef4 = useRef(null)

	const handleSubmit = values => {

	}

	const getYears = () => {
		let years = []
		for (let i = 2020; i <= new Date().getFullYear(); i++) {
			years.push(i)
		}
		return years
	}

	const rowClassName = record => {
		if (record.isFooter) {
		  return 'last-table-row'
		}
		return ''
	}

	useEffect(() => {

		const total = data.reduce((r, o) => {
			for (let prop in o.dados) {
				r.dados[prop] += o.dados[prop]
			}
			return r
		})

		setData(prev => [...prev, {...total, nome: 'Total', key: data.length+1, isFooter: true}])
	}, [])

	return (
		<Card
			className="gx-card" 
			type="inner" 
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}.complexidades`} /></h2> }
		>
			<Form layout="inline" onFinish={handleSubmit}>
				<Form.Item label="Data" name="data" initialValue={new Date().getFullYear()}>
					<Select
						options={getYears().map(item => ({value: item}))}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						className="gx-mb-0"
						type="primary"
						htmlType="submit"
					>
						Filtrar
					</Button>
				</Form.Item>
				<Form.Item>
					<Button
						className="gx-mb-0"
						onClick={e => exportToExcel([tableRef, tableRef2, tableRef3, tableRef4], ["Geral", "Complexa", "Simples", "1ª Instância"])}
					>
						Exportar
					</Button>
				</Form.Item>
			</Form>
			<Divider style={{marginBottom: 0, fontSize: 16, backgroundColor: '#fafafa', padding: 20}}>
				Complexidade
			</Divider>
			<Table
				ref={tableRef}
				dataSource={data}
				columns={columns}
				pagination={false}
				rowClassName={rowClassName}
				scroll={{ x: 400 }}
			/>
			<Divider style={{marginTop: 35, marginBottom: 0, fontSize: 16, backgroundColor: '#fafafa', padding: 20}}>
				Para casos de complexidade Complexa.
			</Divider>
			<Table
				ref={tableRef2}
				dataSource={data}
				columns={columns}
				pagination={false}
				rowClassName={rowClassName}
				scroll={{ x: 400 }}
			/>
			<Divider style={{marginTop: 35, marginBottom: 0, fontSize: 16, backgroundColor: '#fafafa', padding: 20}}>
				Para casos de complexidade Simples.
			</Divider>
			<Table
				ref={tableRef3}
				dataSource={data}
				columns={columns}
				pagination={false}
				rowClassName={rowClassName}
				scroll={{ x: 400 }}
			/>
			<Divider style={{marginTop: 35, marginBottom: 0, fontSize: 16, backgroundColor: '#fafafa', padding: 20}}>
				Para casos de complexidade 1ª Instância.
			</Divider>
			<Table
				ref={tableRef4}
				dataSource={data}
				columns={columns}
				pagination={false}
				rowClassName={rowClassName}
				scroll={{ x: 400 }}
			/>
		</Card>
	);
};

export default Complexidades