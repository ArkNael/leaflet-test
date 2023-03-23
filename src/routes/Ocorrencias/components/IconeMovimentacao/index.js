import { Tooltip } from 'antd'
import * as Icons from '@ant-design/icons'

const getIconeMovimentacao = tipo => {
	switch (tipo) {
		case 'Última Iteração': 		return {dot: <Icons.CheckOutlined style={{fontSize: 15}}/>}
		case 'Encaminhamento': 			return {color: '#096dd9'}
		case 'Ocorrencia Encaminhada': 	return {color: '#096dd9'}
		case 'Pausa concedida':			return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#00aeff'}
		case 'Pausa Concedida':			return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#00aeff'}
		case 'Solicitação de Pausa':    return {dot: <Icons.ClockCircleOutlined style={{fontSize: 15}} />, color: '#ffbb00'}
		case 'Solicitacao de Pausa':    return {dot: <Tooltip title='Pausa Solicitada'><Icons.ClockCircleOutlined style={{fontSize: 15}} /></Tooltip>, color: '#ffbb00'}
		default: 						return null;
	}
}

export default getIconeMovimentacao