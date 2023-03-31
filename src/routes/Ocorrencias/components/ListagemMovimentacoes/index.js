import { Table, Timeline, Dropdown, List, Row, Col } from "antd"
import * as Icons from '@ant-design/icons';

import Text from '../../../../components/Crud/DataDisplay/Text'
import CustomTooltip from "../Tooltip";
import {InfoModal, InfoModalSovnet, InfoModalSovnetAcoes, InfoModalSovnetDinamico} from "../Modal";
import CustomTag from "../CustomTag";
import getIconeMovimentacao from "../IconeMovimentacao";

const movimentacoes = [		
    {
        id: 1,
        tempoSetor: '',
        createdAt: '15/02/2023 15:48:51',
        usuario: 'LUIS ROBERTO LOPES DE ALMEIDA',
        setorUsuario: 'OUVIDORIA',
        setorOrigem: 'OUVIDORIA    ',
        setorDestino: 'Remetente',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Prezado (a) Sr.(a) Ana Lucia, boa tarde. Inicialmente, agradecemos o registro de vossa demanda junto a esta Ouvidoria que possibilita a análise e, se necessário, à adequação dos processos/serviços de atendimento ao cliente, gerando um ciclo de melhoria contínua. Logo que recepcionamos o relato de V.S.ª, acionamos o setor responsável que nos repassou a seguinte informação: Caro(a) beneficiário(a), esperamos que esteja bem! Pedimos desculpas pelo inconveniente. Queremos que cada usuário tenha uma experiência única com o nosso Jeito de Cuidar. Informamos que o Canal SAC atende pelo nº 0800 084 2323 e é um canal exclusivo para cancelamento de contrato, reclamações, sugestões e elogios. O canal 3220 6400 é canal de Marcação de Consultas. Com a LGPD, por questões de privacidade e segurança, o detalhamento não é enviado na fatura, mas o beneficiário pode solicitar através do e-mail nrc.unimednatal.com.br e também está disponível no Aplicativo Unimed Natal Cliente. Referente ao relato de contato com os canais da Unimed Natal, foi identificado através da monitoria que a beneficiária verbaliza a palavra "Fatura" e a URA a direciona para o Setor Financeiro. Após a transferência o contato segue em andamento com o setor ao qual não possuímos acesso as informações. Respondendo sobre a fatura com descriminação de utilização, informo que seguimos nossa linha de pensamento baseados nas informações que recebemos dos gestores e estruturado na Resolução 509 da ANS bem como na LGPD. Considerando a possibilidade de vulnerabilidade do acesso a fatura/boleto, entendemos que o detalhamento deve ser preservado. Desta forma, encerraremos esse atendimento junto a Ouvidoria da Unimed Natal. Atenciosamente. Roberto Lopes',
        tipo: 'Última Iteração'
    },
    {
        id: 2,
        tempoSetor: '4h, 42min, 34seg',
        createdAt: '15/02/2023 11:06:17',
        usuario: 'KEZIA SUERDA EUFRASIO DE OLIVEIRA ARRAIS',
        setorUsuario: 'FATURAMENTO',
        setorOrigem: 'ATENDIMENTO FINANCEIRO',
        setorDestino: 'OUVIDORIA',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Bom dia! Respondendo sobre a fatura com descriminação de utilização, informo que seguimos nossa linha de pensamento baseados nas informações que recebemos dos gestores e estruturado na Resolução 509 da ANS bem como na LGPD. Considerando a possibilidade de vulnerabilidade do acesso a fatura/boleto, entendemos que o detalhamento deve ser preservado.',
        tipo: 'Resposta',
        causaRaiz: 'Solicitação de fatura detalhada.',
        acoesMelhoria: 'Informei a beneficiária que, nos casos específico do detalhamento, a mesma poderá solicitar nos canais de atendimento da Unimed Natal. At.te Geiza Araujo'
    },
    {
        id: 3,
        tempoSetor: '2h, 26min, 39seg',
        createdAt: '15/02/2023 08:39:38',
        usuario: 'LUIS ROBERTO LOPES DE ALMEIDA',
        setorUsuario: 'OUVIDORIA',
        setorOrigem: 'OUVIDORIA',
        setorDestino: 'ATENDIMENTO FINANCEIRO',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Prezado gestor,  Encaminhado ao setor conforme interação de Kissia.',
        tipo: 'Encaminhamento'
    },
    {
        id: 4,
        tempoSetor: '4seg',
        createdAt: '13/02/2023 09:34:30',
        usuario: 'KISSIA BENTO DA SILVA',
        setorUsuario: 'SETOR DE ATENDIMENTO PRESENCIAL',
        setorOrigem: 'NÚCLEO DE RETENÇÃO',
        setorDestino: 'OUVIDORIA',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Bom dia! Reclamação pertinente ao setor financeiro, responsável por disponibilizar as faturas via correios ou e-mail com as informações solicitada. Para auxiliar disponibilizo o demonstrativo de coparticipação dos meses 11/2022,12/2022,01/2023 e 02/2023 e explico como acessar esse demonstrativo no aplicativo Unimed Natal beneficiário.',
        causaRaiz: 'Indisponibilidade do demonstrativo de coparticipação nas faturas mensais.',
        acoesMelhoria: 'Voltarmos a disponibilizar o demonstrativo de coparticipação nas faturas.',
        tipo: 'Resposta'
    },  
    {    
        id: 5,
        tempoSetor: '17h, 11min, 28seg',
        createdAt: '10/02/2023 16:23:02',
        usuario: 'MARA BETANIA CAVALCANTI TEIXEIRA FREIRE',
        setorUsuario: 'OUVIDORIA',
        setorOrigem: 'OUVIDORIA',
        setorDestino: 'NÚCLEO DE RETENÇÃO',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Prezado gestor,  A ANS, órgão regulador do setor de saúde suplementar, através do art. 3°, inciso VI, da Resolução Normativa n° 323/2013, determina que as Ouvidorias das Operadoras de planos de saúde forneçam em até 07 dias uteis, respostas conclusivas às demandas dos seus beneficiários, podendo pactuar um prazo maior, não superior a 30 (trinta) dias úteis, nos casos excepcionais ou de maior complexidade, devidamente justificados. Lembramos que o prazo para as áreas responderem à Ouvidoria é de até 2 dias úteis e o nosso é de até de 5 dias úteis, para que possamos atender ao programa Ouvidoria de Excelência da Unimed do Brasil. Ao não cumprir as regras da ANS, a operadora comete infrações administrativas, ficando sujeita às penalidades previstas na Resolução Normativa n° 124, que podem variar de uma advertência à multa pecuniária de no mínimo R$ 30.000,00. Contamos com o comprometimento e a vossa responsabilidade, evitando assim que a Unimed Natal se exponha a tais penalidades.',
        tipo: 'Encaminhamento'
    },
    {
        id: 6,
        tempoSetor: '9min, 1seg',
        createdAt: '10/02/2023 16:14:01',
        usuario: 'SHEILA KARLA BORGES DE PAULA',
        setorUsuario: 'SETOR DE TELEATENDIMENTO',
        setorOrigem: 'SETOR DE TELEATENDIMENTO',
        setorDestino: 'OUVIDORIA',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Caro(a) beneficiário(a), esperamos que esteja bem! Pedimos desculpas pelo inconveniente. Queremos que cada usuário tenha uma experiência única com o nosso Jeito de Cuidar. Informamos que o Canal SAC atende pelo nº 0800 084 2323 e é um canal exclusivo para cancelamento de contrato, reclamações, sugestões e elogios. O canal 3220 6400 é canal de Marcação de Consultas. Com a LGPD, por questões de privacidade e segurança, o detalhamento não é enviado na fatura, mas o beneficiário pode solicitar através do e-mail nrc.unimednatal.com.br e também está disponível no Aplicativo Unimed Natal Cliente. Referente ao relato de contato com os canais da Unimed Natal, foi identificado através da monitoria que a beneficiária verbaliza a palavra "Fatura" e a URA a direciona para o Setor Financeiro. Após a transferência o contato segue em andamento com o setor ao qual não possuímos acesso as informações.',
        tipo: 'Resposta'
    },
    {
        id: 7,
        tempoSetor: '1d, 8h, 59min, 20seg',
        createdAt: '09/02/2023 07:14:41',
        usuario: 'LUIS ROBERTO LOPES DE ALMEIDA',
        setorUsuario: 'OUVIDORIA',
        setorOrigem: 'OUVIDORIA',
        setorDestino: 'SETOR DE TELEATENDIMENTO',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Concedida',
        tipo: 'Pausa concedida'
    }, 
    {
        id: 8,
        tempoSetor: '14h, 21min, 19seg',
        createdAt: '08/02/2023 16:53:22',
        usuario: 'SHEILA KARLA BORGES DE PAULA',
        setorUsuario: 'SETOR DE TELEATENDIMENTO',
        setorOrigem: 'SETOR DE TELEATENDIMENTO',
        setorDestino: 'OUVIDORIA',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Solicito a pausa para análise referente ao canal que prestou o atendimento a beneficiária e o protocolo fornecido.',
        tipo: 'Solicitação de Pausa'
    },
    {
        id: 9,
        tempoSetor: '1d, 7h, 24min, 3seg',
        createdAt: '07/02/2023 09:29:19',
        usuario: 'LUIS ROBERTO LOPES DE ALMEIDA',
        setorUsuario: 'OUVIDORIA',
        setorOrigem: 'OUVIDORIA',
        setorDestino: 'SETOR DE TELEATENDIMENTO',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Prezado gestor,  A ANS, órgão regulador do setor de saúde suplementar, através do art. 3°, inciso VI, da Resolução Normativa n° 323/2013, determina que as Ouvidorias das Operadoras de planos de saúde forneçam em até 07 dias uteis, respostas conclusivas às demandas dos seus beneficiários, podendo pactuar um prazo maior, não superior a 30 (trinta) dias úteis, nos casos excepcionais ou de maior complexidade, devidamente justificados. Lembramos que o prazo para as áreas responderem à Ouvidoria é de até 2 dias úteis e o nosso é de até de 5 dias úteis, para que possamos atender ao programa Ouvidoria de Excelência da Unimed do Brasil. Ao não cumprir as regras da ANS, a operadora comete infrações administrativas, ficando sujeita às penalidades previstas na Resolução Normativa n° 124, que podem variar de uma advertência à multa pecuniária de no mínimo R$ 30.000,00. Contamos com o comprometimento e a vossa responsabilidade, evitando assim que a Unimed Natal se exponha a tais penalidades.',
        tipo: 'Encaminhamento'
    },
    {
        id: 10,
        tempoSetor: '8min, 53seg',
        createdAt: '07/02/2023 09:20:25',
        usuario: 'SOVNET',
        setorUsuario: '',
        setorOrigem: 'SOVNET',
        setorDestino: 'OUVIDORIA',
        visualizadoPor: ['ROSEANE ARAUJO', 'KISSIA SILVA', 'RAFAELLA SOTERO', 'SHEILA', 'KEZIA ARRAIS', 'LUIS ALMEIDA', 'Giana Melo', 'CLEYTON SILVA', 'MARA FREIRE'],
        mensagem: 'Ocorrência recebida pela ouvidoria',
        tipo: 'Primeira Iteração'
    }
]

export const Listagem = () => {

	const movimentacoesColumns = [
		{
			title: 'Data / hora',
			dataIndex: 'createdAt',
            render: ((item, record) => { return (
                <>
                    <span>{item}</span>
                    {record.tempoSetor && <>
                        <Text label="Tempo no setor" style={{marginTop: 5}}>({record.tempoSetor})</Text>
                    </>}
                </>
            )})
		},
		{
			title: 'Usuário',
			dataIndex: 'usuario',
            render: ((item, record) => { return (
                <>
                <span>{item}</span>
                {record.setorUsuario && <><br/><span>({record.setorUsuario})</span></>}
                </>
            )})
		},
		{
			title: 'Origem',
			dataIndex: 'setorOrigem',
		},
		{
			title: 'Destino',
			dataIndex: 'setorDestino',
		},
		{
            title: 'Ação',
			render: (text, record) => (
				<div>
					<Dropdown menu={{items: submenus(record)}}>
						<span className="gx-link ant-dropdown-link">
							Opções
							<Icons.CaretDownOutlined />
						</span>
					</Dropdown>
				</div>
			  ),
			  width: '8%'
		},
	]

    const submenus = rec => {
        let items = [{
            key: '1',
            label: (
                <span style={{ paddingLeft: "5px" }}><InfoModal record={rec}/></span>
            ),
            icon: (<i className="icon icon-eye" />)
        }]

        if (movimentacoes[0].id === rec.id) {
            items.push({
                key: '2',
                label: <InfoModalSovnetAcoes record={rec} labelType='text'/>,
                icon: <i className="gx-link icon icon-add"/>
            })
        }

        return items
    };

    return (
        <Table
            size='small'
            pagination={false}
            columns={movimentacoesColumns}
            dataSource={movimentacoes}
            style={{fontSize: 10}}
        />
    )
}

export const ListagemSimples = () => {

    const submenus = rec => {
        let items = [{
            key: '1',
            label: (
                <span style={{ paddingLeft: "5px" }}><InfoModal record={rec}/></span>
            ),
            icon: (<i className="icon icon-eye" />)
        }]

        if (movimentacoes[0].id === rec.id) {
            items.push({
                key: '2',
                label: <InfoModalSovnetAcoes record={rec} labelType='text'/>,
                icon: <i className="gx-link icon icon-add"/>
            })
        }

        return items
    };

    return (
        <List
            loading={false}
            itemLayout="horizontal"
            dataSource={movimentacoes}
            renderItem={(rec) => (
                <List.Item
                    actions={[
                        <Dropdown menu={{items: submenus(rec)}}>
                            <span className="gx-link ant-dropdown-link">
                                Opções
                                <Icons.CaretDownOutlined />
                            </span>
                        </Dropdown>
                    ]}
                >
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} label='Data / hora'>{rec.createdAt}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={8} label='Usuário'>{rec.usuario}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} label='Setor de origem'>{rec.setorOrigem}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={5} label='Localização atual'>{rec.setorDestino}</Text>
                        </CustomTooltip>
                 
                </List.Item>
            )}
        />
    )
}

export const ListagemSovnet = () => {
    return (
        <List
            size="small"
            style={{fontSize: 12}}
            loading={false}
            itemLayout="horizontal"
            dataSource={movimentacoes}
            renderItem={(rec) => (
                <List.Item style={{alignItems: 'flex-start', display: 'block'}}>
                    <Row>
                        <Text span={4} label='Data / hora'>
                            {rec.createdAt}
                            {rec.tempoSetor && <>
                                <Text label="Tempo no setor" style={{marginTop: 5}}>({rec.tempoSetor})</Text>
                            </>}
                        </Text>
                        <Text style={{paddingLeft: 0}} span={6} label='Usuário'>{rec.usuario}</Text>
                        <Text span={4} label='Setor de origem'>{rec.setorOrigem}</Text>
                        <Text span={4} label='Localização atual'>{rec.setorDestino}</Text>
                        <Text span={4} label="Visualizado por">
                            {rec.visualizadoPor.map(item => { return (
                                <div style={{width: '100%'}}>{item}</div>
                            )})}
                        </Text>
                        <Text span={2} style={{paddingRight: 0}} label='Ações'>
                            <InfoModalSovnet record={rec}/>
                            {(movimentacoes[0].id === rec.id) && <InfoModalSovnetAcoes record={rec}/>}
                        </Text>
                    </Row>
                </List.Item>
            )}
        />
    )
}

export const ListagemSovnetComTags = () => {
    return (
        <List
            size="small"
            style={{fontSize: 12}}
            loading={false}
            itemLayout="horizontal"
            dataSource={movimentacoes}
            renderItem={(rec) => (
                <List.Item style={{alignItems: 'flex-start', display: 'block'}}>
                    <Row>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} colon={false} style={{paddingLeft: 0, paddingRight: 0}}>
                                <CustomTag style={{width: '100%'}}>{rec.tipo}</CustomTag>
                            </Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} label='Data / hora'>
                                {rec.createdAt}
                                {rec.tempoSetor && <>
                                    <Text label="Tempo no setor" style={{marginTop: 5}}>({rec.tempoSetor})</Text>
                                </>}
                            </Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text style={{paddingLeft: 0}} span={6} label='Usuário'>{rec.usuario}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} label='Setor de origem'>{rec.setorOrigem}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} label='Localização atual'>{rec.setorDestino}</Text>
                        </CustomTooltip>
                        <Text span={2} style={{paddingRight: 0}} label='Ações'>
                            <InfoModalSovnet record={rec}/>
                            {(movimentacoes[0].id === rec.id) && <InfoModalSovnetAcoes record={rec}/>}
                        </Text>
                    </Row>
                </List.Item>
            )}
        />
    )
}

export const ListagemSovnetComTagsDinamico = ({data}) => {
    return (
        <List
            size="small"
            style={{fontSize: 12}}
            loading={false}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(rec) => 
                <List.Item style={{alignItems: 'flex-start', display: 'block'}}>
                    <Row>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} colon={false} style={{paddingLeft: 0, paddingRight: 0}}>
                                <CustomTag style={{width: '100%'}}>{rec.tipoMovimentacao.nome}</CustomTag>
                            </Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={4} label='Data / hora'>
                                {rec.createdAt}
                                {rec.tempoSetor && <>
                                    <Text label="Tempo no setor" style={{marginTop: 5}}>({rec.tempoSetor})</Text>
                                </>}
                            </Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text style={{paddingLeft: 0}} span={4} label='Usuário'>{rec.nomeUsuario}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={5} label='Setor de origem'>{rec.setorRemetente?.nomeCcusto || 'OUVMED'}</Text>
                        </CustomTooltip>
                        <CustomTooltip type='visualizacoes' data={rec.visualizadoPor}>
                            <Text span={5} label='Localização atual'>{rec.setorReceptor?.nomeCcusto || 'Remetente'}</Text>
                        </CustomTooltip>
                        <Text span={2} style={{paddingRight: 0}} label='Ações'>
                            <InfoModalSovnetDinamico record={rec}/>
                            {(data[0].id === rec.id) && <InfoModalSovnetAcoes record={rec}/>}
                        </Text>
                    </Row>
                </List.Item>
            }
        />
    )
}

export const TimelineMovimentacoes = ({data}) => {
    data = movimentacoes

    let timelineItems = data.map((element, key) => {
            let label = ''
            if (key === 0) label = 'Última Iteração'
            if (key === data.length-1) label = 'Primeira Iteração'

            let config = {
                label
            }

            return (
                <Timeline.Item style={{fontSize: 13}} {...getIconeMovimentacao(element.tipo)}
                    label={
                        <Row style={{margin: 0, display: 'flex', justifyContent: 'flex-end'}}>
                            <Text style={{padding: 0, color: 'green'}} span={7} {...config} colon={false} />
                            {element.tempoSetor && <Text style={{padding: 0}} span={8} label="Tempo Total setor" colon={false}>({element.tempoSetor})</Text>}
                            <Text style={{padding: 0}} span={9} label={'Data / hora'} colon={false}>{element.createdAt}</Text>
                        </Row>
                    }
                    children={<>
                        <Text label="Usuário que Encaminhou/Respondeu">
                            {element.usuario}
                            {element.setorUsuario?(<><br/>({element.setorUsuario})</>):''}
                        </Text>
                        <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                            <Row>
                                <Col span={11}>{element.setorOrigem}</Col>
                                <Col span={2}><Icons.ArrowRightOutlined /></Col>
                                <Col span={11}>{element.setorDestino}</Col>
                            </Row>
                        </Text>
                    </>}
                />
            )
        }
    )

    return (
        <Timeline mode='left'>
            {timelineItems}
        </Timeline>
    )
}

export const TimelineMovimentacoesDinamico = ({data}) => {

    let timelineItems = data.map((element, key) => {
            let label = ''
            if (key === 0) label = 'Última Iteração'
            if (key === data.length-1) label = 'Primeira Iteração'

            let config = {
                label
            }

            return (
                <Timeline.Item style={{fontSize: 13}} {...getIconeMovimentacao(element.tipoMovimentacao.nome)}
                    label={
                        <Row style={{margin: 0, display: 'flex', justifyContent: 'flex-end'}}>
                            <Text style={{padding: 0, color: 'green'}} span={7} {...config} colon={false} />
                            {element.tempoSetor && <Text style={{padding: 0}} span={8} label="Tempo Total setor" colon={false}>({element.tempoSetor})</Text>}
                            <Text style={{padding: 0}} span={9} label={'Data / hora'} colon={false}>{element.createdAt}</Text>
                        </Row>
                    }
                    children={<>
                        <Text label={<><CustomTag textOnly={true}>{element.tipoMovimentacao.nome}</CustomTag> por</>}>
                            {element.nomeUsuario}
                            {element.setorUsuario?(<><br/>({element.setorUsuario})</>):''}
                        </Text>
                        <Text label={<Row><Col span={11}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                            <Row>
                                <Col span={9}>{element.setorRemetente?.nomeCcusto || 'OUVMED'}</Col>
                                <Col span={2}><Icons.ArrowRightOutlined /></Col>
                                <Col span={11}>{element.setorReceptor?.nomeCcusto || 'Remetente'}</Col>
                            </Row>
                        </Text>
                    </>}
                />
            )
        }
    )

    return (
        <Timeline mode='left'>
            {timelineItems}
        </Timeline>
    )
}