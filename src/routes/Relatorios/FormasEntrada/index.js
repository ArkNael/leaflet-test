import { Card, Table } from 'antd';

import IntlMessages from "../../../util/IntlMessages";
import { useEffect, useState } from 'react';

// const dataSource = [
// 	{ key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', amount: 100 },
// 	{ key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', amount: 200 },
// 	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', amount: 300 },
// 	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', amount: 300 },
// 	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', amount: 300 },
// 	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', amount: 300 },
// 	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', amount: 300 },
// ];

const dataSource = [
	{
		"nome": "outros",
		"dados": {
			"Jan": 0,
			"Fev": 0,
			"Mar": 0,
			"Abr": 0,
			"Mai": 0,
			"Jun": 0,
			"Jul": 0,
			"Ago": 0,
			"Set": 0,
			"Out": 0,
			"Nov": 0,
			"Dez": 0,
			"Total": 0
		}
	},
	{
		"nome": "telefone",
		"dados": {
			"Jan": 0,
			"Fev": 0,
			"Mar": 0,
			"Abr": 0,
			"Mai": 0,
			"Jun": 0,
			"Jul": 0,
			"Ago": 0,
			"Set": 0,
			"Out": 0,
			"Nov": 0,
			"Dez": 0,
			"Total": 0
		}
	},
	{
		"nome": "totem",
		"dados": {
			"Jan": 2,
			"Fev": 4,
			"Mar": 2,
			"Abr": 2,
			"Mai": 0,
			"Jun": 0,
			"Jul": 0,
			"Ago": 0,
			"Set": 0,
			"Out": 0,
			"Nov": 0,
			"Dez": 10,
			"Total": 20
		}
	},
	{
		"nome": "aplicativo",
		"dados": {
			"Jan": 0,
			"Fev": 0,
			"Mar": 0,
			"Abr": 0,
			"Mai": 0,
			"Jun": 0,
			"Jul": 0,
			"Ago": 0,
			"Set": 0,
			"Out": 0,
			"Nov": 0,
			"Dez": 0,
			"Total": 0
		}
	},
	{
		"nome": "site",
		"dados": {
			"Jan": 17,
			"Fev": 29,
			"Mar": 40,
			"Abr": 11,
			"Mai": 0,
			"Jun": 0,
			"Jul": 0,
			"Ago": 0,
			"Set": 0,
			"Out": 0,
			"Nov": 0,
			"Dez": 97,
			"Total": 194
		}
	},
	{
		"nome": "email",
		"dados": {
			"Jan": 139,
			"Fev": 129,
			"Mar": 160,
			"Abr": 52,
			"Mai": 0,
			"Jun": 0,
			"Jul": 0,
			"Ago": 0,
			"Set": 0,
			"Out": 0,
			"Nov": 0,
			"Dez": 480,
			"Total": 960
		}
	}
]

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
	},
];

const FormasEntrada = (props) => {
	const [data, setData] = useState(dataSource)

	const Footer = ({ data, dataIndex }) => {
		const total = data.reduce((acc, curr) => acc + curr[dataIndex], 0);
		return (
			<div style={{ fontWeight: 'bold' }}>
				Total: {total}
			</div>
		);
	};

	

	useEffect(() => {
		const total = dataSource.reduce((acc, curr) => acc + curr.amount, 0);

		setData(prev => [...prev, {
			key: dataSource.length+1, 
			name: 'TOTAL',
			amount: 100,
		}])
	}, [])

	return (
		<Card
			className="gx-card" 
			type="inner" 
			title={ <h2 className="title gx-mb-4"><IntlMessages id={`sidebar.${props.controller}`} /></h2> }
		>
			<Table
				dataSource={data}
				columns={columns}
				pagination={false}
			/>
		</Card>
	);
};

export default FormasEntrada;