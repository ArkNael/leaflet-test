import { Popconfirm, message } from 'antd'
import { ModalEncaminhar, ModalFinalizar, ModalResponderPausa } from '../../components/Modal'
import { api } from '../../../../util/Api'
import moment from 'moment'
import { Link } from 'react-router-dom'

export const menuInteracoes = (rec, status, historyPush, data) => {

    const deleteReg = async (key) => {
        await api.get(`api/ocorrencias/excluir/${key}`)
        .then(({data}) => {
            if (data.ok === 1) {
                message.success(data.mensagem)
                historyPush(`/ocorrencias`)
            } else {
                message.error(data.mensagem)
            }
        })
        .catch((err) => {
            message.error('Erro ao excluir registro')
        })
    }

    const items = [
        {
            key: '1',
            label: (
                <Link to={`/ocorrencias/editar/${rec}`}>
					<span style={{ paddingLeft: "5px" }}>Editar ocorrência</span>
				</Link>
            ),
            icon: (<i className="icon icon-edit" />)
        }
    ]

    if (status !== 'Ocorrencia Encaminhada' && status !== 'Última Iteração' && status !== 'Pausa Concedida' && status !== 'Solicitacao de Pausa' && status !== 'Ocorrencia Finalizada') {
        items.push(
            {
                key: '2',
                label: <ModalEncaminhar record={rec} historyPush={historyPush} />,
                icon: <i className="icon icon-forward" />
            }
        )
    }
    
    if (status === 'Solicitacao de Pausa') {
        items.push(
            {
                key: '2',
                label: <ModalResponderPausa record={rec} historyPush={historyPush} />,
                icon: <i className="icon icon-forward" />
            }
        )
    }

    if (status !== 'Última Iteração' && status !== 'Ocorrencia Finalizada') {
        items.push({
            key: '3',
            label: <ModalFinalizar record={rec} historyPush={historyPush} finalidade={data.finalidade?.nomeFinalidade}/>,
            icon: <i className="icon icon-check" />
        })
    }

    items.push({
        key: '4',
        label: (
            <Popconfirm
                title="Deseja excluir o registro?"
                onConfirm={e => { deleteReg(rec) }}
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

export const getSetorAnterior = async (id, setter) => {
    if (id) {
        await api.get('api/ocorrencias/exibir/'+id)
        .then(({data}) => {
            if (data.ok === 1 && data.retorno.length > 0) {
                let movimentacoes = data.retorno[0].movimentacoes.sort((a, b) => b.id - a.id)
                if (setter) {
                    setter(movimentacoes[0].setorRemetente?.nomeCcusto)
                }
                return movimentacoes[0].setorRemetente?.nomeCcusto
            }
        })
    }
}

export const getTempoSetor = data => {
    let newData = []
    
    if (data) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            let duration
            
            if (i === 0) {
                if (item.tipoMovimentacao.nome === 'Ocorrencia Finalizada') {
                    duration = moment.duration(moment(item.createdAt, 'DD/MM/YYYY HH:mm:ss').diff(moment(data[i+1].createdAt, 'DD/MM/YYYY HH:mm:ss')))
                } else {
                    duration = moment.duration(moment().diff(moment(item.createdAt, 'DD/MM/YYYY HH:mm:ss')))
                }
            } else {
                duration = moment.duration(moment(data[i-1].createdAt, 'DD/MM/YYYY HH:mm:ss').diff(moment(item.createdAt, 'DD/MM/YYYY HH:mm:ss')))
            }

            const days = Math.floor(duration.asDays()); // Extrai o número de dias inteiros
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            let formattedDiff = ''

            if (days > 0) formattedDiff += `${days}d `
            if (hours > 0) formattedDiff += `${hours}h `
            if (minutes > 0) formattedDiff += `${minutes}min `
            if (seconds > 0) formattedDiff += `${seconds}s`

            item.tempoSetor = formattedDiff

            newData.push(item)
        }
    }

    return newData
}

export const getSituacaoLabel = value => {

	switch (value) {
		case 'Ocorrencia Criada':		    return 'Ocorrência Criada'
		case 'Ocorrencia Encaminhada':      return 'Encaminhado'
		case 'Solicitacao de Pausa':	    return 'Pausa Solicitada'
		case 'Pausa Concedida':		       	return 'Pausa Concedida'
		case 'Pausa Negada':		        return 'Pausa Negada'
		case 'Resposta':			        return 'Resposta'
		case 'Ocorrencia Respondida':       return 'Respondido';
		case 'Ocorrencia Finalizada':	   	return 'Finalizado';

		default: break;
	}
}