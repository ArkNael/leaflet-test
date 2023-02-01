import { Button, Card, Form, Input, Select, message, Divider, Switch, DatePicker, Radio } from 'antd';
import React, { useState, useEffect } from 'react';

import { api } from "util/Api"

import moment from 'moment';

import * as Icons from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";
import CustomSelect from '../../components/Crud/Fields/CustomSelect'
import CustomUpload from '../../components/Crud/Fields/CustomUpload'
import { MaskedInput } from 'antd-mask-input';



const Add = (props) => {
	const [origem, setOrigem] = useState()
	const [finalidade, setFinalidade] = useState()
	const [destino, setDestino] = useState()
	const [protocoloAnterior, setProtocoloAnterior] = useState(false)
	const [clienteOutroEstado, setClienteOutroEstado] = useState(false)
	const [sexo, setSexo] = useState('M')
	const [tema, setTema] = useState('M')

	const [form] = Form.useForm()


	const handleSubmit = async (values) => { }


	const required = { required: true, message: 'Campo obrigatório!' }

	const formas = [
		{value: 'Aplicativos', 	label: 'Aplicativos'},
		{value: 'E-mail', 		label: 'E-mail'},
		{value: 'Outros', 		label: 'Outros'},
		{value: 'Site', 		label: 'Site'},
		{value: 'Telefone', 	label: 'Telefone'},
		{value: 'Totem', 		label: 'Totem'}
	]

	const complexidades = [
		{value: 'Complexa', 			label: 'Complexa'},
		{value: 'Simples', 				label: 'Simples'},
		{value: 'Primeira Instância',	label: 'Primeira Instância'}
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
				<Form.Item label="Quem está abrindo a ocorrencia?" name="origem" rules={[{ required: true, message: 'Informe quem está abrindo a ocorrencia!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione a origem' controller="origens" onChange={setOrigem} />
				</Form.Item>
				<Form.Item label="Qual a finalidade desta ocorrência?" name="finalidade" rules={[{ required: true, message: 'Informe a finalidade desta ocorrência!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione a finalidade' controller="finalidades" onChange={setFinalidade} />
				</Form.Item>
				<Form.Item label="A quem se destina a ocorrência?" name="destino" rules={[{ required: true, message: 'Informe a quem se destina esta ocorrência!' }]} wrapperCol={{span: 10}}>
					<CustomSelect placeholder='Selecione o destino' controller="destinos" onChange={setDestino} />
				</Form.Item>


				{(origem && finalidade && destino) && <>
					<Divider orientation="left" style={{marginTop: '50px'}}>Protocolo de Instância Anterior</Divider>
					<Form.Item label="Possui Protocolo de instância anterior?" name="protocoloAnterior">
						<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} onChange={setProtocoloAnterior}/>
					</Form.Item>
					{(!protocoloAnterior && <>
						<Form.Item label="Canal Anterior:" name="canalAnterior" rules={[required]} wrapperCol={{span: 6}}>
							<Input />
						</Form.Item>
						<Form.Item label="Nome do Atendente:" name="nomeAtendente" rules={[required]} wrapperCol={{span: 12}}>
							<Input name="nomeAtendente"/>
						</Form.Item>
						<Form.Item label="Local:" name="local" rules={[required]} wrapperCol={{span: 8}}>
							<Input />
						</Form.Item>
						<Form.Item label="Data:" name="data" rules={[required]} wrapperCol={{span: 6}}>
							<DatePicker format="DD/MM/YYYY" />
						</Form.Item>
					</>) || (
						<Form.Item label="Número de Protocolo da instância anterior:" name="numProtocoloAnterior" rules={[required]} wrapperCol={{span: 6}}>
							<Input />
						</Form.Item>
					)}
					<Form.Item label="O paciente está internado?" name="pacienteInternado">
						<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} />
					</Form.Item>


					<Divider orientation="left" style={{marginTop: '50px'}}>Informe seus dados (Todos os campos com * são obrigatórios)</Divider>
					<Form.Item label="Cliente de outro estado(Intercâmbio)?" name="clienteOutroEstado">
						<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} onChange={setClienteOutroEstado}/>
					</Form.Item>
					<Form.Item label="Matrícula:" name="matricula" rules={[required]} wrapperCol={{span: 8}}>
						<Input />
					</Form.Item>
					<Form.Item label="Nome:" name="nome" rules={[required]} wrapperCol={{span: 12}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Telefone:" name="telefone" rules={[required]} wrapperCol={{span: 6}}>
						<MaskedInput mask="(00) 00000-0000" maskOptions={{lazy: true}}/>
					</Form.Item>
					<Form.Item label="Email:" name="email" rules={[required]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Data de nascimento:" name="dataNascimento" rules={[required]} wrapperCol={{span: 8}}>
						<DatePicker format="DD/MM/YYYY" disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Sexo:" name="sexo" rules={[required]} wrapperCol={{span: 8}}>
						<Radio.Group>
							<Radio value='M'>Masculino</Radio>
							<Radio value='F'>Feminino</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="CEP:" name="cep" rules={[required]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="UF:" name="uf" rules={[required, {max: 2, message: 'Informe apenas a sigla do estado!'}]} wrapperCol={{span: 3}}>
						<Input disabled={!clienteOutroEstado} maxLength={2} />
					</Form.Item>
					<Form.Item label="Cidade:" name="cidade" rules={[required]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Bairro:" name="bairro" rules={[required]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Rua:" name="rua" rules={[required]} wrapperCol={{span: 8}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
					<Form.Item label="Numero:" name="numero" rules={[required]} wrapperCol={{span: 3}}>
						<Input disabled={!clienteOutroEstado} />
					</Form.Item>
	

					<Divider orientation="left" style={{marginTop: '50px'}}>Preencha os dados da ocorrência:</Divider>
					<Form.Item label="Informe o assunto da ocorrência:" name="descricaoAssunto" rules={[required]} wrapperCol={{span: 10}}>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item label="Qual a forma de envio da ocorrência?:" name="formaEnvio" rules={[required]} wrapperCol={{span: 8}}>
						<Select options={formas} />
					</Form.Item>
					<Form.Item label="Deseja manter sigilo sobre seus dados?" name="sigilo">
						<Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} />
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
						<Select placeholder="Selecione a complexidade" options={complexidades} />
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


					<Divider orientation="left" style={{marginTop: '50px'}}></Divider>
					<Form.Item label="Histórico:" name="historico" wrapperCol={{span: 12}}>
						<Input.TextArea rows={4} />
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