import { Tag } from "antd"
import * as Icons from '@ant-design/icons';

const CustomTag = ({children, ...rest}) => {
	let color, icon = ''

	switch (children) {
		case 'Primeira Iteração':		color = '';			   icon = (<Icons.RightOutlined />);     break;
		case 'Encaminhamento':			color = 'blue';      icon = (<Icons.ArrowRightOutlined />);     break;
		case 'Solicitação de Pausa':	color = 'volcano';	   icon = (<Icons.ClockCircleOutlined />);     break;
		case 'Pausa concedida':			color = 'cyan';      icon = (<Icons.ClockCircleOutlined />);     break;
		case 'Última Iteração':			color = '';			   icon = (<Icons.CheckOutlined />);     break;
		case 'Resposta':				color = 'green';     icon = (<Icons.ArrowLeftOutlined />);     break;
		default: break;
	}

	return (
		<Tag icon={icon} color={color} {...rest}>{children}</Tag>
	)
}

export default CustomTag