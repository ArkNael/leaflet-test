import { Container, Title, Extra, CustomDivider } from './styles'

const CardTitle = ({children, extra, ...rest}) => {
    return (
        <Container {...rest}>
            <Title>
                {children}
            </Title>
            <Extra>
                {extra && <><CustomDivider type='vertical'/>{extra}</>}
            </Extra>
        </Container>
    )
}

export default CardTitle