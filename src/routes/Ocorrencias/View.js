import { useState, useEffect } from 'react';

import { Card, Row, Col, Divider, Skeleton, List, message } from 'antd';
import Text from '../../components/Crud/DataDisplay/Text';
import CardTitle from '../../components/Crud/DataDisplay/CardTitle';

import { api } from "util/Api"
import moment from "moment"

import IntlMessages from "util/IntlMessages";


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

	const anexos = [
		{
			id: 1,
			nome: 'comprovante de envio de e-mail 2.pdf.jpg'
		},
		{
			id: 2,
			nome: 'comprovante de envio de e-mail.pdf'
		},
		{
			id: 3,
			nome: 'LARA OLIVEIRA COSTA BAPTISTA DE JESUS.pdf'
		},
	]

	useEffect( () => {
		const fetchData = async () => { 
			await getData(setData, props.controller, props.match.params.id)
		}

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
							<Text span={24} label="Telefone">{data.remetente?.telefoneRemetente}</Text>
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
						dataSource={anexos}
						renderItem={(item) => (
							<List.Item
								actions={[<a key="list-loadmore-view"><i className="icon icon-eye" /></a>, <a key="list-loadmore-delete"><i className="icon icon-trash" /></a>]}
							>
								<Skeleton loading={false} active>
									<div>{item.nome}</div>
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
							<Text span={4} label="Envio de carta" style={{color: 'red'}}>Não</Text>
							<Text span={4} label="Procedencia" style={{color: 'red'}}>Procedente</Text>
							<Text span={4} label="Finalizado" style={{color: 'red'}}>Site</Text>
						</Row>
						<Divider />
						<Row>
							<Text span={12} label="Classificação da ocorrência" style={{color: 'red'}}>Formulário padrão</Text>
							<Text span={12} label="Tipo de contrato">{data.contrato?.nomeContrato}</Text>
							<Text span={12} label="Tema">{data.tema?.nomeTema}</Text>
							<Text span={12} label="Setor anterior" style={{color: 'red'}}>(3400000)</Text>
							<Text span={12} label="Histórico" style={{color: 'red'}}>01/02/2023 07:35</Text>
							<Text span={12} label="Setor atual" style={{color: 'red'}}>(3400000)</Text>
							<Text span={24} label="Assunto">{data.assuntoOcorrencia}</Text>
							<Text span={24} label="Descrição">{data.descricaoOcorrencia}</Text>
						</Row>
					</Skeleton>
				</Card>
				<Card type='inner' className="gx-card">
					{/* title="Dados da Ocorrência" */}
					<CardTitle>Interações</CardTitle>
					<Skeleton loading={false}>
					</Skeleton>
				</Card>
			</Col>
		</Row>
		</Card>
	)
};

export default View;