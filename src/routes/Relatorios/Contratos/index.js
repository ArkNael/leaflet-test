import { useEffect, useState, useRef } from 'react'

import { Card, Form, Button, Table, Select, message } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { api } from '../../../util/Api'
import { getYears, rowClassName, transformData } from '../util/Basic'
import { exportToExcel } from '../util/XlsxConvert'

import IntlMessages from "../../../util/IntlMessages"

import './styles.css'

const Contratos = props => {
	const [data, setData] = useState([])
	const tableRef = useRef()

	const columns = [
		{
			title: 'Categoria',
			dataIndex: 'nome',
			key: 'categoria',
			width: '18%'
		},
		{
			title: 'Jan',
			dataIndex: ['dados', 'jan'],
			key: 'jan',
			width: '6%'
		},
		{
			title: 'Fev',
			dataIndex: ['dados', 'fev'],
			key: 'fev',
			width: '6%'
		},
		{
			title: 'Mar',
			dataIndex: ['dados', 'mar'],
			key: 'mar',
			width: '6%'
		},
		{
			title: 'Abr',
			dataIndex: ['dados', 'abr'],
			key: 'abr',
			width: '6%'
		},
		{
			title: 'Mai',
			dataIndex: ['dados', 'mai'],
			key: 'mai',
		},
		{
			title: 'Jun',
			dataIndex: ['dados', 'jun'],
			key: 'jun',
			width: '6%'
		},
		{
			title: 'Jul',
			dataIndex: ['dados', 'jul'],
			key: 'jul',
			width: '6%'
		},
		{
			title: 'Ago',
			dataIndex: ['dados', 'ago'],
			key: 'ago',
			width: '6%'
		},
		{
			title: 'Set',
			dataIndex: ['dados', 'set'],
			key: 'set',
			width: '6%'
		},
		{
			title: 'Out',
			dataIndex: ['dados', 'out'],
			key: 'out',
		},
		{
			title: 'Nov',
			dataIndex: ['dados', 'nov'],
			key: 'nov',
			width: '6%'
		},
		{
			title: 'Dez',
			dataIndex: ['dados', 'dez'],
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

	const handleSubmit = values => {}

	useEffect(() => {
		const getData = async () => {
			api.get('api/relatorios/contratos')
			.then(({data}) => {
				const newData = transformData(data, 'contratos')

				const total = newData.reduce((r, o) => {
					for (let prop in o.dados) {
						r.dados[prop] += o.dados[prop]
					}
					return r
				}, {
					dados: { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0, Total: 0 }
				})

				setData([...newData, {...total, nome: 'Total', key: newData.length+1, isFooter: true}])
			})
			.catch(err => message.error('Ocorreu um erro ao carregar as informações'))
		}
		getData()
	}, [])

	return (
		<Card
			className="gx-card" 
			type="inner" 
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}.contratos`} /></h2> }
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
						onClick={e => exportToExcel([tableRef], ["Contratos"])}
						icon={<DownloadOutlined />}
					>
						Exportar
					</Button>
				</Form.Item>
			</Form>
			<Table
				ref={tableRef}
				dataSource={data}
				columns={columns}
				pagination={false}
				rowClassName={rowClassName}
				scroll={{ x: 400 }}
			/>
		</Card>
	)
}

export default Contratos