import { useRef, useState } from 'react'
import { api } from "util/Api"
import { useAuth } from '../../../../authentication'

import { Divider, Modal, Row, Tooltip, Form, Input, Button, Switch, message } from 'antd'
import * as Icons from '@ant-design/icons'

import Draggable from 'react-draggable'
import Text from '../../../../components/Crud/DataDisplay/Text'
import CustomSelect from '../../../../components/Crud/Fields/CustomSelect'
import CustomUpload from '../../../../components/Crud/Fields/CustomUpload'

export const InfoModal = ({record}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const draggleRef = useRef(null);

    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <>
        <span onClick={showModal}>Visualizar</span>
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Detalhes da interação
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={1000}
        >
            <Row>
                <Text span={5} label="Data de recebimento">{record.createdAt}</Text>
                <Text span={8} label="Usuário que Encaminhou/Respondeu">
                    <span>{record.usuario}</span>
                    {record.setorUsuario && <><br/><span>({record.setorUsuario})</span></>}
                </Text>
                <Text span={5} label="Enviador por">{record.setorOrigem}</Text>
                <Text span={6} label="Localização atual">{record.setorDestino}</Text>
                <Text span={24} label="Visualizado por">
                    {record.visualizadoPor.map(item => 
                        <div style={{width: '100%'}}>{item}</div>
                    )}
                </Text>
                <Divider />
                <Text span={24} label="Mensagem">{record.mensagem}</Text>
                {record.causaRaiz &&  <><Divider /><Text span={24} label="Causa Raiz">{record.causaRaiz}</Text></>}
                {record.acoesMelhoria && <><Divider /><Text span={24} label="Ações de Melhoria">{record.acoesMelhoria}</Text></>}
            </Row>
        </Modal>
        </>
    );
};

export const InfoModalSovnet = ({record}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const draggleRef = useRef(null);

    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <>
        <Tooltip title='Detalhes'>
            <Icons.EyeOutlined onClick={showModal} style={{fontSize: 18, padding: 2}} className='gx-link'/>
        </Tooltip>
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Detalhes da interação
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={1000}
        >
            <Row>
                <Text span={5} label="Data de recebimento">{record.createdAt}</Text>
                <Text span={8} label="Usuário que Encaminhou/Respondeu">
                    <span>{record.usuario}</span>
                    {record.setorUsuario && <><br/><span>({record.setorUsuario})</span></>}
                </Text>
                <Text span={5} label="Enviador por">{record.setorOrigem}</Text>
                <Text span={6} label="Localização atual">{record.setorDestino}</Text>
                <Divider />
                <Text span={24} label="Mensagem">{record.mensagem}</Text>
                {record.causaRaiz &&  <><Divider /><Text span={24} label="Causa Raiz">{record.causaRaiz}</Text></>}
                {record.acoesMelhoria && <><Divider /><Text span={24} label="Ações de Melhoria">{record.acoesMelhoria}</Text></>}
            </Row>
        </Modal>
        </>
    );
};

export const InfoModalSovnetDinamico = ({record}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const draggleRef = useRef(null);

    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <>
        <Tooltip title='Detalhes'>
            <Icons.EyeOutlined onClick={showModal} style={{fontSize: 18, padding: 2}} className='gx-link'/>
        </Tooltip>
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Detalhes da interação
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={1000}
        >
            <Row>
                <Text span={4} label="Data de recebimento">{record.createdAt}</Text>
                <Text span={8} label="Usuário que Encaminhou/Respondeu">
                    <span>{record.nomeUsuario}</span>
                    {record.setorUsuario && <><br/><span>({record.setorUsuario})</span></>}
                </Text>
                <Text span={6} label="Enviador por">{record.setorRemetente?.nomeCcusto}</Text>
                <Text span={6} label="Localização atual">{record.setorReceptor?.nomeCcusto}</Text>
                <Divider />
                <Text span={24} label="Mensagem">{record.resposta?.mensagemResposta}</Text>
                {record.resposta?.causaRaizResposta &&  <><Divider /><Text span={24} label="Causa Raiz">{record.resposta?.causaRaizResposta}</Text></>}
                {record.resposta?.acoesMelhoriaResposta && <><Divider /><Text span={24} label="Ações de Melhoria">{record.resposta?.acoesMelhoriaResposta}</Text></>}
            </Row>
        </Modal>
        </>
    );
};

export const InfoModalSovnetAcoes = ({record, labelType='icon'}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const draggleRef = useRef(null);

    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const handleSubmit = values => {
        setLoading(true)
        const submitRequest = () => {
            setTimeout(() => {

                console.log('#---------submit---------#')
                console.log('I: '+record.id)
                console.log('V: '+values.acoes)
                console.log('#---------end submit---------#')

                setOpen(false)
                setLoading(false)
                message.success('Ação registrada com sucesso!')
            }, 3000)
        }

        submitRequest()
    }

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <>
        {((labelType === 'icon') &&
            <Tooltip title='Ações'>
                <Icons.PlusSquareOutlined onClick={showModal} style={{fontSize: 18, padding: 2}} className='gx-link'/>
            </Tooltip>
        ) || 
            <span onClick={showModal} style={{ paddingLeft: "5px" }} className='gx-link'>Ações</span>
        }
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Campo de justificativa
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div onKeyDown={e => e.stopPropagation()} ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={1000}
        >
            <Form  layout="vertical" key={`form${record.id}`} onFinish={handleSubmit}>
                <Form.Item label="Ações" name="acoes" rules={[{required: true, message: 'Campo obrigatório!'}]}>
                    <Input.TextArea onKeyDown={e => e.stopPropagation()} rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Adicionar</Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export const ModalEncaminhar = ({historyPush, record}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const defaultText = `Prezado gestor, 

    A ANS, órgão regulador do setor de saúde suplementar, através do art. 3°, inciso VI, da Resolução Normativa n° 323/2013, determina que as Ouvidorias das Operadoras de planos de saúde forneçam em até 07 dias uteis, respostas conclusivas às demandas dos seus beneficiários, podendo pactuar um prazo maior, não superior a 30 (trinta) dias úteis, nos casos excepcionais ou de maior complexidade, devidamente justificados.

    Lembramos que o prazo para as áreas responderem à Ouvidoria é de até 2 dias úteis e o nosso é de até de 5 dias úteis, para que possamos atender ao programa Ouvidoria de Excelência da Unimed do Brasil.
Ao não cumprir as regras da ANS, a operadora comete infrações administrativas, ficando sujeita às penalidades previstas na Resolução Normativa n° 124, que podem variar de uma advertência à multa pecuniária de no mínimo R$ 30.000,00.

            Contamos com o comprometimento e a vossa responsabilidade, evitando assim que a Unimed Natal se exponha a tais penalidades.`

    const { authUser } = useAuth();

    const draggleRef = useRef(null);

    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const handleSubmit = async values => {
        setLoading(true)
        let body = {
            ocorrenciaId: record,
            setorReceptor: values.ccusto,
            resposta: values.desc,
            nomeUsuario: authUser.name.split(' ')[0],
            matriculaUsuario: authUser.cod_usuario,
            codCcustoUsuario: authUser.cod_setor,
            nomeCcustoUsuario: authUser.setor
        }

        await api.post(`api/movimentacoes/encaminhar/ocorrencia`, body)
        .then(({data}) => {
            if (data.ok === 1) {
                setOpen(false)
                message.success('Movimentação registrada com sucesso!')
                historyPush(`/ocorrencias/acompanhar/${record}`)
            } else {
                message.error(data.mensagem)
            }
        })
        .catch((err) => {
            message.error('Erro ao realizar movimentação!')
        })
        setLoading(false)
    }

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <>
        <span onClick={showModal} style={{ paddingLeft: "5px" }}>Encaminhar ocorrência</span>
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Encaminhar ocorrência
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div onClick={e => e.stopPropagation()} ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={600}
        >
            <Form  layout="vertical" key={`form${record.id}`} onFinish={handleSubmit}>
                <Form.Item label="Centro de custo" name="ccusto" rules={[{required: true, message: 'Campo obrigatório!'}]}>
                    <CustomSelect
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        controller='ccustos'
                        customKey='codigo'
                    />
                </Form.Item>
                <Form.Item label="Descreva o encaminhamento" name="desc" rules={[{required: true, message: 'Campo obrigatório!'}]} initialValue={defaultText}>
                    <Input.TextArea onKeyDown={e => e.stopPropagation()} rows={19} />
                </Form.Item>
                <Form.Item style={{textAlign: 'right'}}>
                    <Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Encaminhar</Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export const ModalFinalizar = ({historyPush, record, finalidade}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef(null);
    const [reversao, setReversao] = useState()

    const [form] = Form.useForm()

    const { authUser } = useAuth();


    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const handleSubmit = async values => {
        setLoading(false)

        let body = {
            ocorrenciaId: record,
            resposta: values.desc,
            formaSaida: values.forma,
            codReversao: values.codReversao,
            nomeUsuario: authUser.name.split(' ')[0],
            matriculaUsuario: authUser.cod_usuario,
            codCcustoUsuario: authUser.cod_setor,
            nomeCcustoUsuario: authUser.setor
        }

        const formData = new FormData();

		for (let key in body) formData.append(key, body[key] || '')
        
		if (values.anexos?.length > 0) {
			values.anexos?.map(element => formData.append('arquivos', element.originFileObj))
		}

        await api.post(`api/movimentacoes/finalizar/ocorrencia`, formData)
        .then(({data}) => {
            if (data.ok === 1) {
                setOpen(false)
                message.success('Movimentação registrada com sucesso!')
                historyPush(`/ocorrencias/acompanhar/${record}`)
            } else {
                message.error(data.mensagem)
            }
        })
        .catch((err) => {
            message.error('Erro ao finalizar ocorrência!')
        })

        setLoading(false)
    }

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    return (
        <>
        <span onClick={showModal} style={{ paddingLeft: "5px" }}>Finalizar ocorrência</span>
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Finalizar ocorrência
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div onClick={e => e.stopPropagation()} ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={600}
        >
            <Form form={form} layout="vertical" key={`form${record.id}`} onFinish={handleSubmit}>
                <Form.Item label="Descreva a solução" name="solucao" rules={[{required: true, message: 'Descreva a solução da ocorrência!'}]}>
                    <Input.TextArea onKeyDown={e => e.stopPropagation()} rows={5} />
                </Form.Item>
                <Form.Item label="Forma de envio da resposta" name="forma" rules={[{required: true, message: 'Informe a forma de envio da resposta!'}]}>
                    <CustomSelect
                        showSearch
                        controller='formas'
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>
                {finalidade === 'Reanálise' && <>
                    <Form.Item label="Reversão">
                        <Switch checkedChildren={<Icons.CheckOutlined />} unCheckedChildren={<Icons.CloseOutlined />} style={{marginLeft: '15px'}} onChange={setReversao} />
                    </Form.Item>
                    {reversao && 
                        <Form.Item label="Tipo de reversão" name="tipoReversao" rules={[{required: true, message: 'Informe a forma de envio da resposta!'}]}>
                            <CustomSelect controller="reversoes" />
                        </Form.Item>
                    }
                </>}
                <CustomUpload form={form} />
                <Form.Item style={{textAlign: 'right'}}>
                    <Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Finalizar</Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export const ModalResponderPausa = ({historyPush, record}) => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [acao, setAcao] = useState();
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const { authUser } = useAuth();
    

    const draggleRef = useRef(null);

    const showModal = () => setOpen(true)

    const handleOk = (e) => setOpen(false)

    const handleCancel = (e) => setOpen(false)

    const handleSubmit = async values => {
        let urlAction = acao === 'negar' ? '/negar/pausa' : '/conceder/pausa'

        let body = {
            ocorrenciaId: record,
            resposta: values.motivo,
            nomeUsuario: authUser.name.split(' ')[0],
            matriculaUsuario: authUser.cod_usuario,
            codCcustoUsuario: authUser.cod_setor,
            nomeCcustoUsuario: authUser.setor
        }

        await api.post(`api/movimentacoes${urlAction}`, body)
        .then(({data}) => {
            if (data.ok === 1) {
                setOpen(false)
                message.success('Movimentação registrada com sucesso!')
                historyPush(`/ocorrencias/acompanhar/${record}`)
            } else {
                message.error(data.mensagem)
            }
        })
        .catch((err) => {
            message.error('Erro ao responder pausa!')
        })
    }

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();

        if (!targetRect) return

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    return (
        <>
        <span onClick={showModal} style={{ paddingLeft: "5px" }}>Responder solicitação de pausa</span>
        <Modal
            title={
                <div
                    style={{ width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) setDisabled(false)
                    }}
                    onMouseOut={() => setDisabled(true)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    Encaminhar ocorrência
                </div>
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div onClick={e => e.stopPropagation()} ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            width={600}
        >
            <Form  layout="vertical" key={`form${record.id}`} onFinish={handleSubmit} >
                <Text label="Descrição do pedido">Necessário adicionar mais informações para concluir a solicitação.</Text>
                <Divider />
                <Text label="Solicitante">MARCOS PAULO DE LIMA SILVA</Text>
                <Text label="Matrícula">7912</Text>
                <Text label="Setor">COORDENAÇÃO DE GOV DE DADOS E GEST DE TI</Text>
                <Divider />
                <Form.Item label="Descrição da resposta" name="motivo" rules={[{required: true, message: 'Campo obrigatório!'}]}>
                    <Input.TextArea onKeyDown={e => e.stopPropagation()} rows={14} />
                </Form.Item>
                <Divider />
                    <Form.Item style={{textAlign: 'right'}}>
                        <Button
                            name='botao'
                            className="gx-mb-0"
                            style={{backgroundColor: '#db0000', color: 'white'}}
                            danger
                            htmlType="submit"
                            loading={acao==='negar'}
                            disabled={!(acao==='negar') && typeof acao !== 'undefined'}
                            icon={<Icons.CloseOutlined />}
                            onClick={e => setAcao('negar')}
                        >
                            Negar Pausa
                        </Button>
                        <Button
                            name='botao2'
                            className="gx-mb-0"
                            type="primary"
                            htmlType="submit"
                            loading={acao==='conceder'}
                            disabled={!(acao==='conceder') && typeof acao !== 'undefined'}
                            icon={<Icons.CheckOutlined />}
                            onClick={e => setAcao('conceder')}
                        >
                            Conceder Pausa
                        </Button>
                    </Form.Item>
            </Form>
        </Modal>
        </>
    );
};