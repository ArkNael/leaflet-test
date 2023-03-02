import { Col } from 'antd'
import { Container, ContainerItem, Label, Text } from './styles'


const Component = ({label, children, ...rest}) => {
    return (
        <Col {...rest}>
            <Container>
                <ContainerItem>
                    <Label>{label}:</Label>
                </ContainerItem>
                <ContainerItem>
                    <Text>{children}</Text>
                </ContainerItem>
            </Container>
        </Col>
    )
}

export default Component