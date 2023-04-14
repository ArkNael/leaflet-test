import { Tag } from "antd"
import * as Icons from '@ant-design/icons';

const CustomTag = ({children, textOnly=false, ...rest}) => {
	let color, icon = ''

	switch (children) {
		case 'Ocorrencia Criada':		color = '';			   icon = <Icons.RightOutlined />;     	  children = 'Iniciado';	   	 break
		case 'Ocorrencia Encaminhada':	color = 'blue';      icon = <Icons.ArrowRightOutlined />;   children = 'Encaminhado';	  	break
		case 'Solicitacao de Pausa':	color = 'volcano';	   icon = <Icons.ClockCircleOutlined />;  children = 'Pausa Solicitada'; break
		case 'Pausa Concedida':			color = 'cyan';      icon = <Icons.ClockCircleOutlined />;  								break
		case 'Pausa Negada':			color = 'red';       icon = <Icons.StopOutlined />;  								  	  	break
		case 'Ocorrencia Respondida':	color = 'green';     icon = <Icons.ArrowLeftOutlined />;    children = 'Respondido';		break
		case 'Ocorrencia Finalizada':	color = '';			   icon = <Icons.CheckOutlined />;		  children = 'Finalizado';   	 break
		case 'Ocorrencia Escalada':		color = 'purple';	  icon = <Icons.ArrowUpOutlined />;		 children = 'Escalado';   	 	break

		default: break
	}

	return (
		((!textOnly && <Tag icon={icon} color={color} {...rest}>{children}</Tag>) || children)
	)
}

export default CustomTag