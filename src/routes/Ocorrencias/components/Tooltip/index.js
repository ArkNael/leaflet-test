import { Tooltip } from "antd"
import Text from "../../../../components/Crud/DataDisplay/Text"

const ListaVisualizado = ({data}) => {
    let componentList = data.map(item => <div style={{width: '100%'}}>{item}</div>)

    return (
        <Text span={24} label="Visualizado por">{componentList}</Text>
    )
}

const CustomTooltip = ({children, placement='leftTop', title, type, data=[], ...rest}) => {
    if (type === 'visualizacoes') title = <ListaVisualizado data={data}/>

    return (
        <Tooltip placement={placement} title={title} {...rest}>{children}</Tooltip>
    )
}

export default CustomTooltip