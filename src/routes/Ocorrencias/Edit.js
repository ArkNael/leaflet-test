import React, { useEffect, useRef, useState } from 'react';

import { api } from "util/Api"
import { useAuth } from "../../authentication";
import moment from "moment"

import { Button, Card, Form, Input, Select, message, Divider, Switch, DatePicker, Radio, Tooltip, Tag } from 'antd';
import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";
import CustomSelect from '../../components/Crud/Fields/CustomSelect'
import CustomUpload from '../../components/Crud/Fields/CustomUpload'
import { MaskedInput } from 'antd-mask-input';



const Edit = (props) => {
	const { authUser } = useAuth();

	const [data, setData] = useState()
	const [clienteOutroEstado, setClienteOutroEstado] = useState(false)
	const [protocoloAnterior, setProtocoloAnterior] = useState()
	const [criticidade, setCriticidade] = useState({})

	const [loading, setLoading] = useState(false)
	const [loadingCodigo, setLoadingCodigo] = useState(false)

	const [form] = Form.useForm()
	const formRef = useRef(null)
	const celularRemetenteRef = useRef(null)

	const setProtAnt = value => {
		value = value.replace(/\D/g, "")
		form.setFieldsValue({ numProtocoloAnterior: value })
	}

	const calculateCriticidade = (params) => {
		let obj = {
			...criticidade,
			...params,
			color: '',
			level: ''
		}

		let total = obj.quem + obj.quando + obj.quanto + obj.como

		if (total >= 4 && total <= 6) {
			obj.color = 'green'
			obj.level = 'Baixa'
		}

		if (total >= 7 && total <= 10) {
			obj.color = 'orange'
			obj.level = 'Média ou Atenção'
		}

		if (total >= 11 && total <= 12) {
			obj.color = 'red'
			obj.level = 'Alta'
		}

		setCriticidade(obj)
	}

	const handleSubmit = async values => {
		setLoading(true)
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
			ruaRemetente: 				values.ruaRemetente,
			cepRemetente: 				values.cepRemetente,
			cidadeRemetente: 			values.cidadeRemetente,
			ufRemetente: 				values.ufRemetente,
			telefoneRemetente: 			values.telefoneRemetente,
			celularRemetente: 			values.celularRemetente,
			dataNascimentoRemetente:	moment(values.dataNascimentoRemetente).format('DD/MM/YYYY'),
			sexoRemetente: 				values.sexoRemetente,

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
			temHistoricoNips:			values.historicoNip?'1':'0',
			temAcaoJudicial:			values.acaoJudicial?'1':'0',
			procedencia:				values.classificacao?'1':'0',
			enviarCarta:				values.cartaAutomatica?'1':'0',
			protocoloAnterior:			values.numProtocoloAnterior
		}

		await api.post(`api/${props.controller}/editar/${props.match.params.id}`, body)
		.then(({data}) => {
			if (data.ok === 1) {
				message.success(data.mensagem)
				props.history.push(`/${props.controller}`)
			} else {
				message.error(data.mensagem)
			}
		})
		.catch((err) => {
			message.error('Erro ao salvar registro')
		})

		setLoading(false)
	}

	const setFormData = data => {
		form.setFieldsValue({
			finalidade: 				data.finalidade.id,

			protocoloAnterior:			data.protocoloAnterior,
			numProtocoloAnterior:		data.protocoloAnterior,
			
			codigoRemetente: 			data.remetente?.codigoRemetente,
			nomeRemetente: 				data.remetente?.nomeRemetente,
			celularRemetente: 			data.remetente?.celularRemetente?.replace(/\D/g, ""),
			telefoneRemetente: 			'',
			emailRemetente: 			data.remetente?.emailRemetente,
			dataNascimentoRemetente: 	data.remetente?.dataNascimentoRemetente?moment(data.remetente.dataNascimentoRemetente, 'DD/MM/YYYY'):moment(new Date(), 'DD/MM/YYYY'),
			sexoRemetente: 				data.remetente?.sexoRemetente?.toUpperCase(),
			cepRemetente: 				data.remetente?.cepRemetente,
			ufRemetente: 				data.remetente?.ufRemetente,
			cidadeRemetente: 			data.remetente?.cidadeRemetente,
			bairroRemetente: 			data.remetente?.bairroRemetente,
			ruaRemetente: 				data.remetente?.ruaRemetente,
			numeroRemetente: 			data.remetente?.numeroCasaRemetente,

			nomeReclamado:				data.reclamado?.nomeReclamado,
			extraReclamado:				data.reclamado?.infoExtraReclamado,
			telefoneReclamado:			data.reclamado?.telefoneReclamado,
			emailReclamado:				data.reclamado?.emailReclamado,
			cepReclamado:				data.reclamado?.cepReclamado,
			ufReclamado:				data.reclamado?.ufReclamado,
			cidadeReclamado:			data.reclamado?.cidadeReclamado,
			bairroReclamado:			data.reclamado?.bairroReclamado,
			ruaReclamado:				data.reclamado?.ruaReclamado,
			numeroReclamado:			data.reclamado?.numeroCasaReclamado,

			descricaoAssunto:			data.assuntoOcorrencia,
			tipoOcorrencia:				data.tipo?.id,
			formaEnvio:					data.forma?.id,
			classificacao:				Number(data.procedencia),
			descricao:					data.descricaoOcorrencia,
			contrato:					data.contrato?.id,
			tema:						data.tema?.id,
			assunto:					data.assunto?.id,
			complexidade:				data.complexidade?.id,

			quem:						Number(data.criticidade.criticidadeQuem)?Number(data.criticidade.criticidadeQuem):null,
			quando:						Number(data.criticidade.criticidadeQuando)?Number(data.criticidade.criticidadeQuando):null,
			quanto:						Number(data.criticidade.criticidadeQuanto)?Number(data.criticidade.criticidadeQuanto):null,
			como:						Number(data.criticidade.criticidadeComo)?Number(data.criticidade.criticidadeComo):null,
			historicoNip:				Number(data.temHistoricoNips),
			acaoJudicial:				Number(data.temAcaoJudicial),
			cartaAutomatica:			Number(data.enviarCarta),
		})

		form.current.getFieldInstance('celularRemetente').setValue(data.remetente.celularRemetente)
	}

	useEffect(() => {
		const getData = async () => {
			await api.get(`api/${props.controller}/exibir/${props.match.params.id}`)
			.then(({data}) => {
				if (data.ok === 1) {
					setData(data.retorno[0])
					setFormData(data.retorno[0])
				} else {
					message.error(data.mensagem)
				}
			})
			.catch(err => {
				// message.error('Erro ao carregar registros')
			})
		}

		getData()
	}, [])

	useEffect(() => {
		calculateCriticidade({
			quem: Number(data?.criticidade.criticidadeQuem),
			quando: Number(data?.criticidade.criticidadeQuando),
			quanto: Number(data?.criticidade.criticidadeQuanto),
			como: Number(data?.criticidade.criticidadeComo),
		})

		setProtocoloAnterior(data?.protocoloAnterior)
	}, [data])


	const required = { required: true, message: 'Campo obrigatório!' }

	const optionsCriticidade = [
		{value: 1, label: '1 Ponto'},
		{value: 2, label: '2 Pontos'},
		{value: 3, label: '3 Pontos'}
	]

	return (
		<Card className="gx-card" title={<><IntlMessages id={`sidebar.${props.controller}.edit`} />{` - ${data?.protocolo}`}</>}>
			<Form form={form} ref={formRef} name="form_basic" colon={false} layout="horizontal" onFinish={handleSubmit} labelCol={{span: 9}}>

				<Form.Item label="Qual a finalidade desta ocorrência?" name="finalidade" rules={[{ required: false, message: 'Informe a finalidade desta ocorrência!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione a finalidade' controller="finalidades" />
				</Form.Item>


				<Divider orientation="left" style={{marginTop: '50px'}}>Protocolo de Instância Anterior</Divider>
				<Form.Item label="Possui Protocolo de instância anterior?" name="protocoloAnterior" valuePropName='checked'>
					<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} onChange={setProtocoloAnterior}/>
				</Form.Item>
				{(protocoloAnterior && 
					<Form.Item label="Número de Protocolo da instância anterior:" name="numProtocoloAnterior" rules={[required]} wrapperCol={{span: 6}} onChange={e => setProtAnt(e.target.value)}>
						<Input />
					</Form.Item>
				)}

				<Divider orientation="left" style={{marginTop: '50px'}}>Informe seus dados (Todos os campos com * são obrigatórios)</Divider>
				<Form.Item label="Cliente de outro Estado (Intercâmbio)?" name="clienteOutroEstado">
					<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} onChange={setClienteOutroEstado} disabled={true}/>
				</Form.Item>
				<Form.Item 
					label={(
						<Tooltip 
							title={
								<>
								<p>Para beneficiário, utilizar carteira ou CPF.</p>
								<p>Para cooperado, utilizar CRM.</p>
								<p>Outros casos, utilizar CNPJ</p>
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
					<Input.Search maxLength={17} loading={loadingCodigo} disabled={true}/>
				</Form.Item>
				<Form.Item label="Nome:" name="nomeRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 12}}>
					<Input />
				</Form.Item>
				<Form.Item label="Celular:" name="celularRemetente" rules={[required]} wrapperCol={{span: 6}} >
					<MaskedInput mask="(00) 00000-0000" ref={celularRemetenteRef} maskOptions={{lazy: true}} />
				</Form.Item>
				<Form.Item label="Telefone:" name="telefoneRemetente" wrapperCol={{span: 6}}>
					<MaskedInput mask="(00) 00000-0000" maskOptions={{lazy: true}} />
				</Form.Item>
				<Form.Item label="Email:" name="emailRemetente" rules={[clienteOutroEstado?required:{}]} wrapperCol={{span: 8}}>
					<Input />
				</Form.Item>
				<Form.Item label="Data de nascimento:" name="dataNascimentoRemetente" wrapperCol={{span: 8}}>
					<DatePicker format="DD/MM/YYYY" />
				</Form.Item>
				<Form.Item label="Sexo:" name="sexoRemetente" rules={[required]} wrapperCol={{span: 8}}>
					<Radio.Group>
						<Radio value='M'>Masculino</Radio>
						<Radio value='F'>Feminino</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="CEP:" name="cepRemetente" wrapperCol={{span: 8}}>
					<MaskedInput mask="00000-000" maskOptions={{lazy: true}} />
				</Form.Item>
				<Form.Item label="UF:" name="ufRemetente" wrapperCol={{span: 2}}>
					<Input maxLength={2} />
				</Form.Item>
				<Form.Item label="Cidade:" name="cidadeRemetente" wrapperCol={{span: 8}}>
					<Input />
				</Form.Item>
				<Form.Item label="Bairro:" name="bairroRemetente" wrapperCol={{span: 8}}>
					<Input />
				</Form.Item>
				<Form.Item label="Rua:" name="ruaRemetente" wrapperCol={{span: 8}}>
					<Input />
				</Form.Item>
				<Form.Item label="Numero:" name="numeroRemetente" wrapperCol={{span: 3}}>
					<Input />
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
					<MaskedInput mask="00000-000" maskOptions={{lazy: true}}/>
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
					<CustomSelect placeholder='Selecione a forma de envio' controller="formas" />
				</Form.Item>
				<Form.Item label="Você classifica está ocorrência como:" name="classificacao" rules={[required]} wrapperCol={{span: 8}}>
					<Radio.Group>
						<Radio value={1}>Procedente</Radio>
						<Radio value={0}>Improcedente</Radio>
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
					<CustomSelect placeholder='Selecione o assunto' controller="assuntos" />
				</Form.Item>
				<Form.Item label="Complexidade:" name="complexidade" rules={[required]} wrapperCol={{span: 6}}>
					<CustomSelect placeholder='Selecione a complexidade' controller="complexidades" />
				</Form.Item>

				
				<Divider orientation="left" style={{marginTop: '50px'}}>Análise de Criticidade</Divider>
				<Form.Item label="Quem?" name="quem" rules={[required]} wrapperCol={{span: 4}}>
					<Select placeholder="Selecione a pontuacao" options={optionsCriticidade} onChange={e => calculateCriticidade({quem: e})} />
				</Form.Item>
				<Form.Item label="Quando?" name="quando" rules={[required]} wrapperCol={{span: 4}}>
					<Select placeholder="Selecione a pontuacao" options={optionsCriticidade} onChange={e => calculateCriticidade({quando: e})} />
				</Form.Item>
				<Form.Item label="Quanto?" name="quanto" rules={[required]} wrapperCol={{span: 4}}>
					<Select placeholder="Selecione a pontuacao" options={optionsCriticidade} onChange={e => calculateCriticidade({quanto: e})} />
				</Form.Item>
				<Form.Item label="Como?" name="como" rules={[required]} wrapperCol={{span: 4}}>
					<Select placeholder="Selecione a pontuacao" options={optionsCriticidade} onChange={e => calculateCriticidade({como: e})} />
				</Form.Item>
				<Form.Item label="Criticidade:" name="criticidade" wrapperCol={{span: 6}}>
					<Tag style={{margin: 0, padding: '5px 15px 5px 15px', fontSize: 16}} color={criticidade.color}>{criticidade.level}</Tag>
				</Form.Item>
				<Form.Item label="Beneficiário com histórico de NIP's?" name="historicoNip" valuePropName='checked'>
					<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} />
				</Form.Item>
				<Form.Item label="Beneficiário com histórico de ação judicial?" name="acaoJudicial" valuePropName='checked'>
					<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} />
				</Form.Item>
				<Form.Item label="Deseja que o sistema envie carta automática?" name="cartaAutomatica" valuePropName='checked'>
					<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} />
				</Form.Item>

				<Form.Item label=' ' wrapperCol={{span: 24}}>
					<Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Salvar</Button>
				</Form.Item>
				
			</Form>
		</Card>
	)
};

export default Edit;