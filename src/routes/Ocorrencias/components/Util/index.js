import { Popconfirm, message } from 'antd'
import { ModalEncaminhar, ModalFinalizar, ModalResponderPausa } from '../../components/Modal'

export const menuInteracoes = (rec, status, historyPush) => {
    const items = [
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
        }
    ]

    if (status !== 'Ocorrencia Encaminhada' && status !== 'Última Iteração' && status !== 'Pausa Concedida') {
        items.push(
            {
                key: '2',
                label: <ModalEncaminhar record={rec} historyPush={historyPush}/>,
                icon: <i className="icon icon-forward" />
            }
        )
    }

    if (status === 'Solicitacao de Pausa') {
        items.push(
            {
                key: '2',
                label: <ModalResponderPausa record={rec} />,
                icon: <i className="icon icon-forward" />
            }
        )
    }

    if (status !== 'Última Iteração') {
        items.push({
            key: '3',
            label: <ModalFinalizar record={rec} />,
            icon: <i className="icon icon-check" />
        })
    }

    items.push({
        key: '4',
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
    })

    return items

}