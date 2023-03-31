import * as Icons from '@ant-design/icons'

const getIconeMovimentacao = tipo => {
	switch (tipo) {
		case 'Última Iteração': 		return {dot: <Icons.CheckOutlined style={{fontSize: 15}}/>}
		case 'Ocorrencia Finalizada': 	return {dot: <Icons.CheckOutlined style={{fontSize: 15}}/>}
		case 'Encaminhamento': 			return {color: '#096dd9'}
		case 'Ocorrencia Encaminhada': 	return {color: '#096dd9'}
		case 'Pausa Negada':			return {dot: <Icons.StopOutlined style={{fontSize: 15}} />, color: '#cf1322'}
		case 'Pausa concedida':			return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#00aeff'}
		case 'Pausa Concedida':			return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#00aeff'}
		case 'Solicitação de Pausa':    return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#ffbb00'}
		case 'Solicitacao de Pausa':    return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#ffbb00'}
		default: 						return null;
	}
}

export default getIconeMovimentacao