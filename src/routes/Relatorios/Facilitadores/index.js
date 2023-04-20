import { useEffect, useState, useRef } from 'react'

import { Card, Form, Button, Table, Spin, message } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { api } from '../../../util/Api'
import { rowClassName } from '../util/Basic'
import { exportToExcel } from '../util/XlsxConvert'

import IntlMessages from "../../../util/IntlMessages"

import './styles.css'

const Facilitadores = props => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState()
	const [year, setYear] = useState(new Date().getFullYear())
	const tableRef = useRef()

	const columns = [
		{
			title: 'Setor',
			dataIndex: 'setor',
			key: 'setor',
			sorter: (a, b) => a.setor.localeCompare(b.setor)
		},
		{
			title: 'Nome',
			dataIndex: 'nomeUsuario',
			key: 'nome',
			sorter: (a, b) => a.nomeUsuario.localeCompare(b.nomeUsuario)
		},
		{
			title: 'Papel',
			dataIndex: 'papel',
			key: 'papel',
			sorter: (a, b) => a.papel?.localeCompare(b.papel)
		},
		{
			title: 'Matrícula',
			dataIndex: 'matricula',
			key: 'matricula',
			sorter: (a, b) => a.matricula - b.matricula
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			sorter: (a, b) => a.email?.localeCompare(b.email)
		},
	]

	const handleSubmit = values => {}

	useEffect(() => {
		const getData = async () => {
			setLoading(true)
			api.get('api/relatorios/gestores-facilitadores')
			.then(({data}) => {
				setData(data)
				setLoading(false)
			})
			.catch(err => message.error('Ocorreu um erro ao carregar as informações'))
		}
		getData()
	}, [])

	return (
		<Card
			className="gx-card" 
			type="inner" 
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}.facilitadores`} /></h2> }
			loading={loading}
		>
			<Form layout="inline" onFinish={handleSubmit}>
				<Form.Item>
					<Button
						className="gx-mb-0"
						onClick={e => exportToExcel([tableRef], ["Facilitadores"], `Facilitadores_${year}`)}
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

export default Facilitadores