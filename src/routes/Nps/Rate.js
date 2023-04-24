import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd"
import { number } from "prop-types";
import { api } from "../../util/Api";

const NpsRate = props => {
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState();
    const [infoMessage, setInfoMessage] = useState();
    const [titleMessage, setTitleMessage] = useState();

    const handleSubmit = values => {
        setLoading(true)

        if (typeof score !== 'number') {
            message.error('Informe uma nota para a avaliação')
            return
        }

        const body = {
            ocorrenciaId: props.match.params.id,
            nota: score,
            descricao: values.descricao
        }

        api.post('api/nps/adicionar', body)
        .then(({data}) => {
            if (data.ok === 1) {
                message.success('Avalaição enviada com sucesso')
                setTitleMessage('Sua avaliação foi enviada!')
                setInfoMessage('Obrigado por responder à nossa pesquisa de satisfação da Ouvidoria Unimed Natal!')
            }
        })
        .catch(err => message.error('Não foi possível enviar a avaliação'))

        setLoading(false)
    }

    const handleScoreClick = value => setScore(value)

    const renderScoreButtons = () => {
        const buttons = []
        const colors = ['#b62325', '#d31e28', '#e95223', '#ea6f22', '#f6a726', '#fdc829', '#ecdb0d', '#e5e044', '#c2d234', '#c2d234', '#66b44e']
        for (let i = 0; i <= 10; i++) {
            buttons.push(
                <Button
                    key={i}
                    className={score === i ? 'button-selected' : ''}
                    onClick={() => handleScoreClick(i)}
                    style={{ 
                        margin: 5,
                        width: 80,
                        height: 80,
                        backgroundColor: score === i ? colors[i]+'70' : colors[i],
                        color: '#fff',
                    }}
                >
                    {i}
                </Button>
            )
        }
        return buttons
    }

    const CustomMessage = ({title, children}) => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                <Typography.Title level={3} style={{fontWeight: 400}}>{title}</Typography.Title>
                <Typography.Title level={5} style={{fontWeight: 400}}>{children}</Typography.Title>
            </div>
        )
    }

    useEffect(() => {
        const verifyHash = async () => {
            console.log(props.match.params)
            api.get(`api/nps/validar/${props.match.params.id}`, {params: {hash: props.match.params.hash}})
            .then(({data}) => {
                if (data.ok === 1 && data.autenticado === false) {
                    console.log(data)
                    setTitleMessage('Sua avaliação foi enviada!')
                    setInfoMessage('Obrigado por responder a nossa pesquisa de satisfação da Ouvidoria Unimed Natal!')
                }
            })
            .catch(err => {
                setTitleMessage('Erro!')
                setInfoMessage('Ocorreu um erro ao tentar recuperar as informações da ocorrência.')
            })
        }

        verifyHash()
    }, [])

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card
                className="gx-card"
                title={<h2 className="title gx-mb-4">Pesquisa de Satisfação</h2>}
                style={{width: '80%'}}
            >
                {(infoMessage && <CustomMessage title={titleMessage}>{infoMessage}</CustomMessage>) ||
                    <Form colon={false} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item label="Em uma escala de 0 a 10, o quanto você indicaria a Unimed Natal à um amigo ou familiar?">
                            {renderScoreButtons()}
                        </Form.Item>
                        <Form.Item name="descricao" label="Em poucas palavras, descreva o que motivou sua nota sobre a  indicação (opcional)">
                            <Input.TextArea maxLength={100} style={{resize: 'none'}} rows={5}/>
                        </Form.Item>
                        <Form.Item name="descricao">
                            <Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Enviar</Button>
                        </Form.Item>
                    </Form>
                }
            </Card>
        </div>
    )
}

export default NpsRate