import { Col } from 'antd'
import { Container } from './styles'

const CardTitle = ({children, ...rest}) => {
    return (
        <Container {...rest}>
            {children}
        </Container>
    )
}

export default CardTitle