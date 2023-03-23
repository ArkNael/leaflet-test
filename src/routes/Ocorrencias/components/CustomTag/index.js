import { Tag } from "antd"
import * as Icons from '@ant-design/icons';

const CustomTag = ({children, ...rest}) => {
	let color, icon = ''

	switch (children) {
		case 'Primeira Iteração':		color = '';			   icon = <Icons.RightOutlined />;     								   	 break;
		case 'Ocorrencia Criada':		color = '';			   icon = <Icons.RightOutlined />;     								   	 break;

		case 'Encaminhamento':			color = 'blue';      icon = <Icons.ArrowRightOutlined />;   children = 'Encaminhado';	  	break;
		case 'Ocorrencia Encaminhada':	color = 'blue';      icon = <Icons.ArrowRightOutlined />;   children = 'Encaminhado';	  	break;

		case 'Solicitação de Pausa':	color = 'volcano';	   icon = <Icons.ClockCircleOutlined />;  children = 'Pausa Solicitada'; break;
		case 'Solicitacao de Pausa':	color = 'volcano';	   icon = <Icons.ClockCircleOutlined />;  children = 'Pausa Solicitada'; break;

		case 'Pausa concedida':			color = 'cyan';      icon = <Icons.ClockCircleOutlined />;  								break;
		case 'Pausa Negada':			color = 'red';       icon = <Icons.StopOutlined />;  								  	  	break

		case 'Resposta':				color = 'green';     icon = <Icons.ArrowLeftOutlined />;    								break;
		case 'Ocorrencia Respondida':	color = 'green';     icon = <Icons.ArrowLeftOutlined />;    children = 'Respondido';		break;

		case 'Última Iteração':			color = '';			   icon = <Icons.CheckOutlined />;									   	 break;

		default: break;
	}

	return (
		<Tag icon={icon} color={color} {...rest}>{children}</Tag>
	)
}

export default CustomTag