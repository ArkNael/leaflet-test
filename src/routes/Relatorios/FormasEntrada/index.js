import { Table } from 'antd';

const dataSource = [
	{ key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', amount: 100 },
	{ key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', amount: 200 },
	{ key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', amount: 300 },
];

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

const FormasEntrada = () => {

	const Footer = ({ data, dataIndex }) => {
		const total = data.reduce((acc, curr) => acc + curr[dataIndex], 0);
		return (
			<div style={{ fontWeight: 'bold' }}>
				Total: {total}
			</div>
		);
	};

	const total = dataSource.reduce((acc, curr) => acc + curr.amount, 0);

	return (
		<>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
			/>
			<Footer data={dataSource} dataIndex={'amount'} />
		</>
	);
};

export default FormasEntrada;