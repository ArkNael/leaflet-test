import { useState, useEffect } from 'react';

import { api } from "util/Api"
import { urlApi } from "util/config";
import moment from "moment"

import { Card, Row, Col, Divider, Skeleton, List, Popconfirm, Tabs, Dropdown, message } from 'antd';
import * as Icons from '@ant-design/icons';
import Text from '../../components/Crud/DataDisplay/Text';
import { Listagem, ListagemSimples, ListagemSovnet, ListagemSovnetComTags, TimelineMovimentacoes } from './components/ListagemMovimentacoes'
import TimelineOcorrencia from '../../components/Crud/DataDisplay/TimeLineOcorrencia'
import CardTitle from '../../components/Crud/DataDisplay/CardTitle';

import IntlMessages from "util/IntlMessages";
import { ModalEncaminhar, ModalFinalizar, ModalResponder, ModalResponderPausa, ModalSolicitarPausa } from './components/Modal';


const getData = async (setter, controller, id) => {
	await api.get(`api/${controller}/listar/${id}`)
	.then(({data}) => {
		if (data.ok === 1) {
			setter(data.retorno[0])
		} else {
			message.error(data.mensagem)
		}
	})
	.catch((err) => {
		message.error('Erro ao carregar registros')
	})
}

const View = (props) => {

	const [data, setData] = useState({})

	const deleteReg = async (key) => {
		const registros = data.arquivos.filter(item => item.id !== key);

		await api.get(`api/${props.controller}/anexos/excluir/${key}`)
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
				setData(prev => ({...prev, arquivos: registros}))
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao excluir registro')
		})
	};

	const submenus = rec => [
		{
			key: '1',
			label: (
                <span
					style={{ paddingLeft: "5px" }}
					onClick={e => { message.error('Não é possível editar a ocorrência no momento.') }}
				>
					Editar ocorrência
				</span>
			),
			icon: (<i className="icon icon-edit" />)
		},
		{
			key: '2',
			label: <ModalEncaminhar record={rec} />,
			icon: <i className="icon icon-forward" />
		},
		{
			key: '3',
			label: <ModalResponderPausa record={rec} />,
			icon: <i className="icon icon-forward" />
		},
		{
			key: '4',
			label: <ModalFinalizar record={rec} />,
			icon: <i className="icon icon-check" />
		},
		{
			key: '7',
			label: (
				<Popconfirm
					title="Deseja excluir o registro?"
					onConfirm={e => { message.error('Não é possível excluir a ocorrência no momento.') }}
					okText="Sim"
					cancelText="Não"
				>
					<span style={{ paddingLeft: "5px" }} className="gx-link">Excluir ocorrência</span>
				</Popconfirm>
			),
			icon: (<i className="icon icon-trash" />),
		},
	];

	useEffect( () => {
		const fetchData = async () => await getData(setData, props.controller, props.match.params.id)
		fetchData()
	}, [props])

	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.acompanhar`} />}>
		<Row>
			<Col span={8}>
				<Card type='inner' className="gx-card">

					<CardTitle>Dados do remetente</CardTitle>
					<Skeleton loading={false}>
						<Row>
							<Text span={24} label="Código">{data.remetente?.codigoRemetente}</Text>
							<Text span={24} label="Nome">{data.remetente?.nomeRemetente} (Cliente)</Text>
							<Text span={24} label="Data de nascimento">{data.remetente?.dataNascimentoRemetente}</Text>
							<Text span={24} label="Sexo">{data.remetente?.sexoRemetente==='M'?'Masculino':'Feminino'}</Text>
							<Text span={24} label="Email">{data.remetente?.emailRemetente}</Text>
							<Text span={12} label="Celular">{data.remetente?.celularRemetente}</Text>
							<Text span={12} label="Telefone">{data.remetente?.telefoneRemetente}</Text>
						</Row>
					</Skeleton>
				</Card>

				<Card type='inner' className="gx-card">
					<CardTitle>Dados do reclamado</CardTitle>
					<Skeleton loading={false}>
						<Row>
							<Text span={24} label="Nome">{data.reclamado?.nomeReclamado}</Text>
						</Row>
					</Skeleton>
				</Card>

				<Card type='inner' className="gx-card">
					<CardTitle>Anexos</CardTitle>
					<List
						loading={false}
						itemLayout="horizontal"
						dataSource={data.arquivos}
						renderItem={(item) => (
							<List.Item
								actions={[
									<a 
										target="_blank" 
										href={`${urlApi}api/${props.controller}/anexos/visualizar/${item.arquivo}`} 
										key="list-loadmore-view"
										rel="noreferrer" 
									>
										<i className="icon icon-eye" />
									</a>, 
									<Popconfirm
										title="Deseja excluir o registro?"
										onConfirm={e => { deleteReg(item.id) }}
										okText="Sim"
										cancelText="Não"
									>
										<i className="icon icon-trash gx-link" />
									</Popconfirm>
								]}
							>
								<Skeleton loading={false} active>
									<div>{item.apelidoArquivo}</div>
								</Skeleton>
							</List.Item>
						)}
					/>
				</Card>
				
				<Card type='inner' className="gx-card">
					<CardTitle>Usuário que abriu a ocorrência</CardTitle>
					<Skeleton loading={false}>
						<Row>
							<Text span={16} label="Nome">{data.criadoPor}</Text>
						</Row>
					</Skeleton>
				</Card>
			</Col>
			<Col span={16}>
				<Card type='inner' className="gx-card">
					<CardTitle>Dados da Ocorrência</CardTitle>
					<Skeleton loading={false}>
						<Row>
							<Text span={5} label="Data / hora">{data.createdAt?moment(data.createdAt).format('DD/MM/YYYY HH:mm:ss'):''}</Text>
							<Text span={4} label="Forma de envio">{data.forma?.nomeForma}</Text>
							<Text span={4} label="Status">{data.status?.nomeStatus}</Text>
							<Text span={4} label="Envio de carta">{data.enviarCarta?'Sim':'Não'}</Text>
							<Text span={4} label="Procedencia">{data.procedencia?'Sim':'Não'}</Text>
							<Text span={4} label="Finalizado" style={{color: 'red'}}>Site</Text>
						</Row>
						<Divider />
						<Row>
							<Text span={12} label="Classificação da ocorrência">{data.tipo?.nomeTipo}</Text>
							<Text span={12} label="Tipo de contrato">{data.contrato?.nomeContrato}</Text>
							<Text span={12} label="Tema">{data.tema?.nomeTema}</Text>
							<Text span={12} label="Setor anterior" style={{color: 'red'}}>(3400000)</Text>
							<Text span={12} label="Histórico" style={{color: 'red'}}>01/02/2023 07:35</Text>
							<Text span={24} label="Assunto">{data.assuntoOcorrencia}</Text>
							<Text span={24} label="Descrição">{data.descricaoOcorrencia}</Text>
						</Row>
					</Skeleton>
				</Card>
				<Card type='inner' className="gx-card">
					<CardTitle
						extra={
							<Dropdown menu={{items: submenus(props.match.params.id)}}>
								<span className="gx-link ant-dropdown-link">
									<Icons.SettingOutlined />
								</span>
							</Dropdown>
						}
					>
						Interações
					</CardTitle>
					<Skeleton loading={false}>
						
					</Skeleton>
					<Tabs
						items={[
							// {
							// 	label: 'Listagem',
							// 	key: 1,
							// 	children: <Listagem />
							// },
							// {
							// 	label: 'Listagem Simples',
							// 	key: 2,
							// 	children: <ListagemSimples />
							// },
							// {
							// 	label: 'Listagem Sovnet',
							// 	key: 3,
							// 	children: <ListagemSovnet />
							// },
							{
								label: 'Listagem',
								key: 4,
								children: <ListagemSovnetComTags />
							},
							// {
							// 	label: 'Linha do Tempo',
							// 	key: 5,
							// 	children: <TimelineOcorrencia />
							// },
							{
								label: 'Linha do Tempo',
								key: 6,
								children: <TimelineMovimentacoes />
							}
						]}
					/>
				</Card>
			</Col>
		</Row>
		</Card>
	)
};

export default View;