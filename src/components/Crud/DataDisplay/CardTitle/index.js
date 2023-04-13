import { Container, Title, Extra, CustomDivider } from './styles'

const CardTitle = ({children, extra, extraDivider=true, extraFontSize=16, ...rest}) => {
    return (
        <Container {...rest}>
            <Title>
                {children}
            </Title>
            <Extra>
                {extra && <>{extraDivider && <CustomDivider type='vertical'/>}<span style={{fontSize: extraFontSize}}>{extra}</span></>}
            </Extra>
        </Container>
    )
}

export default CardTitle