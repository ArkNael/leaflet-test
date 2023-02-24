import { Button, Card, Form, Input, Select, message, Divider, Switch, DatePicker, Radio, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';

import { api } from "util/Api"
import { useAuth } from "../../authentication";

import moment from 'moment';

import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";
import CustomSelect from '../../components/Crud/Fields/CustomSelect'
import CustomUpload from '../../components/Crud/Fields/CustomUpload'
import { MaskedInput } from 'antd-mask-input';



const Add = (props) => {
	const { authUser } = useAuth();

	const [origem, setOrigem] = useState()
	const [finalidade, setFinalidade] = useState()
	const [destino, setDestino] = useState()
	const [protocoloAnterior, setProtocoloAnterior] = useState(false)
	const [clienteOutroEstado, setClienteOutroEstado] = useState(false)
	const [sexo, setSexo] = useState('M')
	const [tema, setTema] = useState('M')

	const [form] = Form.useForm()


	const handleSubmit = async (values) => {
		console.log(values)

		const body = {
			nomeReclamado:				values.nomeReclamado,
			emailReclamado:				values.emailReclamado,
			numeroCasaReclamado:		values.numeroReclamado,
			bairroReclamado:			values.bairroReclamado,
			ruaReclamado:				values.ruaReclamado,
			cepReclamado:				values.cepReclamado,
			cidadeReclamado:			values.cidadeReclamado,
			ufReclamado:				values.ufReclamado,
			telefoneReclamado:			values.telefoneReclamado,
			infoExtraReclamado:			values.extraReclamado,

			codigoRemetente: 			values.codigoRemetente,
			nomeRemetente: 				values.nomeRemetente,
			emailRemetente: 			values.emailRemetente,
			numeroCasaRemetente: 		values.numeroRemetente,
			bairroRemetente: 			values.bairroRemetente,
			cepRemetente: 				values.cepRemetente,
			cidadeRemetente: 			values.cidadeRemetente,
			ufRemetente: 				values.ufRemetente,
			telefoneRemetente: 			values.telefoneRemetente,
			celularRemetente: 			values.celularRemetente,
			dataNascimentoRemetente:	values.dataNascimentoRemetente,

			descricaoOcorrencia: 		values.descricao,
			assuntoOcorrencia: 			values.descricaoAssunto,
			temaId: 					values.tema,
			assuntoId: 					values.assunto,
			origemId: 					values.origem,
			contratoId: 				values.contrato,
			destinoId: 					values.destino,
			formaId: 					values.formaEnvio,
			finalidadeId: 				values.finalidade,
			tipoId: 					values.tipoOcorrencia,
			complexidadeId: 			values.complexidade,
			criadoPor: 					authUser.name.split(' ')[0],
			quem: 						values.quem,
			quando: 					values.quando,
			quanto: 					values.quanto,
			como: 						values.como,
		}

		await api.post(`api/ocorrencias/adicionar`, body)
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
				props.history.push(`/ocorrencias`)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao salvar registro')
		})
	}


	const required = { required: true, message: 'Campo obrigatório!' }

	const formas = [
		{value: 'Aplicativos', 	label: 'Aplicativos'},
		{value: 'E-mail', 		label: 'E-mail'},
		{value: 'Outros', 		label: 'Outros'},
		{value: 'Site', 		label: 'Site'},
		{value: 'Telefone', 	label: 'Telefone'},
		{value: 'Totem', 		label: 'Totem'}
	]

	const criticidade = [
		{value: '1', label: '1 Ponto'},
		{value: '2', label: '2 Pontos'},
		{value: '3', label: '3 Pontos'}
	]

	return (
		<Card className="gx-card" title={<IntlMessages id={`sidebar.${props.controller}.new`} />}>
			<Form form={form} name="form_basic" colon={false} layout="horizontal" onFinish={handleSubmit} labelCol={{span: 9}}>

				<Divider orientation='left'>Informações da Ocorrência</Divider>
				<Form.Item label="Quem está abrindo a ocorrência?" name="origem" rules={[{ required: true, message: 'Informe quem está abrindo a ocorrencia!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione a origem' controller="origens" onChange={setOrigem} />
				</Form.Item>
				<Form.Item label="Qual a finalidade desta ocorrência?" name="finalidade" rules={[{ required: true, message: 'Informe a finalidade desta ocorrência!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione a finalidade' controller="finalidades" onChange={setFinalidade} />
				</Form.Item>
				<Form.Item label="A quem se destina a ocorrência?" name="destino" rules={[{ required: true, message: 'Informe a quem se destina esta ocorrência!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione o destino' controller="destinos" onChange={setDestino} />
				</Form.Item>


				{(origem && finalidade && destino) && <>
					<Divider orientation="left" style={{marginTop: '50px'}}>Informe seus dados (Todos os campos com * são obrigatórios)</Divider>
					<Form.Item label="Cliente de outro estado(Intercâmbio)?" name="clienteOutroEstado">
						<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} onChange={setClienteOutroEstado}/>
					</Form.Item>
					<Form.Item 
						label={(
							<Tooltip 
								title={
									<>
									<p>Código de identificação:</p>
									<p>Para beneficiário ou cooperado, utilizar CPF. Outros casos utilizar CNPJ</p>
									</>
								}
								color="#00995d"
								placement="topRight"
								style={{maxWidth: 500}}
							>
								Código de identificação:
								<Icons.QuestionCircleTwoTone style={{marginLeft: 5}}/>
							</Tooltip>
						)} 
						name="codigoRemetente" 
						rules={[required]} 
						wrapperCol={{span: 8}}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Nome:" name="nomeRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 12}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Telefone:" name="telefoneRemetente" rules={[required]} wrapperCol={{span: 6}}>
						<MaskedInput mask="(00) 00000-0000" maskOptions={{lazy: true}}/>
					</Form.Item>
					<Form.Item label="Email:" name="emailRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Data de nascimento:" name="dataNascimentoRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
						<DatePicker format="DD/MM/YYYY" disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Sexo:" name="sexoRemetente" rules={[required]} wrapperCol={{span: 8}}>
						<Radio.Group>
							<Radio value='M'>Masculino</Radio>
							<Radio value='F'>Feminino</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="CEP:" name="cepRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
						<MaskedInput mask="000000-000" maskOptions={{lazy: true}} disabled={!clienteOutroEstado}/>
					</Form.Item>
					<Form.Item label="UF:" name="ufRemetente" rules={[clienteOutroEstado?required:{}, {max: 2, message: 'Informe apenas a sigla do estado!'}]} wrapperCol={{span: 2}}>
						<Input disabled={!clienteOutroEstado} maxLength={2} />
					</Form.Item>
					<Form.Item label="Cidade:" name="cidadeRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Bairro:" name="bairroRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Rua:" name="ruaRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Numero:" name="numeroRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 3}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>


					<Divider orientation="left" style={{marginTop: '50px'}}>Dados do reclamado (Todos os campos com * são obrigatórios)</Divider>
					<Form.Item label="Nome:" name="nomeReclamado" rules={[required]} wrapperCol={{span: 12}}>
						<Input />
					</Form.Item>
					<Form.Item label="Extra:" name="extraReclamado" rules={[required]} wrapperCol={{span: 12}}>
						<Input />
					</Form.Item>
					<Form.Item label="Telefone:" name="telefoneReclamado" wrapperCol={{span: 6}}>
						<MaskedInput mask="(00) 00000-0000" maskOptions={{lazy: true}}/>
					</Form.Item>
					<Form.Item label="Email:" name="emailReclamado" wrapperCol={{span: 8}}>
						<Input />
					</Form.Item>
					<Form.Item label="CEP:" name="cepReclamado" wrapperCol={{span: 4}}>
						<MaskedInput mask="000000-000" maskOptions={{lazy: true}}/>
					</Form.Item>
					<Form.Item label="UF:" name="ufReclamado" rules={[{max: 2, message: 'Informe apenas a sigla do estado!'}]} wrapperCol={{span: 2}}>
						<Input maxLength={2} />
					</Form.Item>
					<Form.Item label="Cidade:" name="cidadeReclamado" wrapperCol={{span: 8}}>
						<Input />
					</Form.Item>
					<Form.Item label="Bairro:" name="bairroReclamado" wrapperCol={{span: 8}}>
						<Input />
					</Form.Item>
					<Form.Item label="Rua:" name="ruaReclamado" wrapperCol={{span: 8}}>
						<Input />
					</Form.Item>
					<Form.Item label="Numero:" name="numeroReclamado" wrapperCol={{span: 3}}>
						<Input />
					</Form.Item>
	

					<Divider orientation="left" style={{marginTop: '50px'}}>Preencha os dados da ocorrência:</Divider>
					<Form.Item label="Informe o assunto da ocorrência:" name="descricaoAssunto" rules={[required]} wrapperCol={{span: 10}}>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item label="Tipo de ocorrência:" name="tipoOcorrencia" rules={[required]} wrapperCol={{span: 6}}>
						<CustomSelect placeholder='Selecione o tipo da ocorrência' controller="tipos" />
					</Form.Item>
					<Form.Item label="Qual a forma de envio da ocorrência?:" name="formaEnvio" rules={[required]} wrapperCol={{span: 8}}>
						<Select options={formas} />
					</Form.Item>
					<Form.Item label="Você classifica está ocorrência como:" name="classificacao" rules={[required]} wrapperCol={{span: 8}}>
						<Radio.Group>
							<Radio value='Procedente'>Procedente</Radio>
							<Radio value='Improcedente'>Improcedente</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Descreva a ocorrência:" name="descricao" rules={[required]} wrapperCol={{span: 14}}>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item label="Tipo de contrato:" name="contrato" rules={[required]} wrapperCol={{span: 6}}>
						<CustomSelect placeholder='Selecione o contrato' controller="contratos" />
					</Form.Item>
					<Form.Item label="Tema:" name="tema" rules={[required]} wrapperCol={{span: 6}}>
						<CustomSelect placeholder='Selecione o tema' controller="temas" />
					</Form.Item>
					<Form.Item label="Assunto da Manifestação:" name="assunto" rules={[required]} wrapperCol={{span: 6}}>
						<CustomSelect placeholder='Selecione o assunto' controller="assuntos" onChange={setOrigem} />
					</Form.Item>
					<Form.Item label="Complexidade:" name="complexidade" rules={[required]} wrapperCol={{span: 6}}>
						<CustomSelect placeholder='Selecione a complexidade' controller="complexidades" />
					</Form.Item>

					
					<Divider orientation="left" style={{marginTop: '50px'}}>Análise de Criticidade</Divider>
					<Form.Item label="Quem?" name="quem" rules={[required]} wrapperCol={{span: 4}}>
						<Select placeholder="Selecione a pontuacao" options={criticidade} />
					</Form.Item>
					<Form.Item label="Quando?" name="quando" rules={[required]} wrapperCol={{span: 4}}>
						<Select placeholder="Selecione a pontuacao" options={criticidade} />
					</Form.Item>
					<Form.Item label="Quanto?" name="quanto" rules={[required]} wrapperCol={{span: 4}}>
						<Select placeholder="Selecione a pontuacao" options={criticidade} />
					</Form.Item>
					<Form.Item label="Como?" name="como" rules={[required]} wrapperCol={{span: 4}}>
						<Select placeholder="Selecione a pontuacao" options={criticidade} />
					</Form.Item>
					<Form.Item label="Criticidade" name="criticidade" wrapperCol={{span: 6}}>
						<span style={{color: 'green'}}>Média ou Atenção</span>
					</Form.Item>
					<Form.Item label="Deseja que o sistema envie carta automática?" name="cartaAutomatica">
						<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} />
					</Form.Item>
					
					
					<Divider orientation="left" style={{marginTop: '50px'}}>Caso deseje anexar arquivos, utilize o campo abaixo:</Divider>
					<Form.Item label=" " name="assunto" wrapperCol={{span: 24}}>
						<CustomUpload />
					</Form.Item>

					<Form.Item label=' ' wrapperCol={{span: 24}}>
						<Button className="gx-mb-0" type="primary" htmlType="submit">Abrir</Button>
					</Form.Item>
				</>}
				
			</Form>
		</Card>
	)
};

export default Add;