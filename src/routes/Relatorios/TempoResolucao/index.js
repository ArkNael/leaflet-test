import { useEffect, useState, useRef } from 'react'

import { Card, Form, Button, Table, Select, message } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { api } from '../../../util/Api'
import { getYears, rowClassName, transformData } from '../util/Basic'
import { exportToExcel } from '../util/XlsxConvert'

import IntlMessages from "../../../util/IntlMessages"

import './styles.css'

const TempoResolucao = props => {
	const [data, setData] = useState([])
	const [year, setYear] = useState(new Date().getFullYear())
	const tableRef = useRef()

	const columns = [
		{
			title: 'Categoria',
			dataIndex: 'nome',
			key: 'categoria',
		},
		{
			title: 'Jan',
			dataIndex: ['dados', 'jan'],
			key: 'jan',
		},
		{
			title: 'Fev',
			dataIndex: ['dados', 'fev'],
			key: 'fev',
		},
		{
			title: 'Mar',
			dataIndex: ['dados', 'mar'],
			key: 'mar',
		},
		{
			title: 'Abr',
			dataIndex: ['dados', 'abr'],
			key: 'abr',
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
		},
		{
			title: 'Jul',
			dataIndex: ['dados', 'jul'],
			key: 'jul',
		},
		{
			title: 'Ago',
			dataIndex: ['dados', 'ago'],
			key: 'ago',
		},
		{
			title: 'Set',
			dataIndex: ['dados', 'set'],
			key: 'set',
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
		},
		{
			title: 'Dez',
			dataIndex: ['dados', 'dez'],
			key: 'dez',
		},
		{
			title: 'Total',
			dataIndex: ['dados', 'Total'],
			key: 'total',
		},
	]

	const handleSubmit = values => {}

	useEffect(() => {
		const getData = async () => {
			api.get('api/relatorios/tempo-resolucao')
			.then(({data}) => {
				let newData = transformData(data, 'resolucaoTempo')

				const total = newData.reduce((r, o) => {
					for (let prop in o.dados) {
						r.dados[prop] += o.dados[prop]
					}
					return r
				}, {
					dados: { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0, Total: 0 }
				})

				newData[0].nome = "Casos resolvidos em até 7 dias úteis"
				newData[1].nome = "Casos resolvidos entre 8 e 30 dias úteis"
				newData[2].nome = "Casos resolvidos após 30 dias úteis"
				newData[3].nome = "Casos não resolvidos."

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
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}.tempoResolucao`} /></h2> }
		>
			<Form layout="inline" onFinish={handleSubmit}>
				<Form.Item label="Data" name="data" initialValue={new Date().getFullYear()}>
					<Select
						options={getYears().map(item => ({value: item}))}
						onChange={setYear}
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
						onClick={e => exportToExcel([tableRef], ["Formas de Entrada"], `Formas_de_entrada_${year}`)}
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

export default TempoResolucao