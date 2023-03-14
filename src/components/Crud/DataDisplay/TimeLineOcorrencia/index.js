import { Timeline, Row, Col } from 'antd'
import Text from '../Text'
import * as Icons from '@ant-design/icons';

const Component = () => {
    return (
        <Timeline mode='left'>
            <Timeline.Item style={{fontSize: 13}} dot={<Icons.CheckOutlined />}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0, color: 'green'}} span={14} label="Última Iteração" colon={false} />
                        <Text style={{padding: 0}} span={10} label={'Data / hora'}>15/02/2023 15:48:51</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">LUIS ROBERTO LOPES DE ALMEIDA (OUVIDORIA)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                        OUVIDORIA
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            Remetente
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(4h, 42min, 34seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>15/02/2023 11:06:17</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">KEZIA SUERDA EUFRASIO DE OLIVEIRA ARRAIS (FATURAMENTO)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            ATENDIMENTO FINANCEIRO
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(2h, 26min, 39seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>15/02/2023 08:39:38</Text>
                    </Row>
                } 
                children={<>
                <Text label="Usuário que Encaminhou/Respondeu">LUIS ROBERTO LOPES DE ALMEIDA (OUVIDORIA)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            ATENDIMENTO FINANCEIRO
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(4seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>13/02/2023 09:34:30</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">KISSIA BENTO DA SILVA (SETOR DE ATENDIMENTO PRESENCIAL)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            NÚCLEO DE RETENÇÃO
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(17h, 11min, 28seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>10/02/2023 16:23:02</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">MARA BETANIA CAVALCANTI TEIXEIRA FREIRE (OUVIDORIA)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            NÚCLEO DE RETENÇÃO
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(9min, 1seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>10/02/2023 16:14:01</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">SHEILA KARLA BORGES DE PAULA (SETOR DE TELEATENDIMENTO)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            SETOR DE TELEATENDIMENTO
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item dot={<Icons.ClockCircleOutlined className="timeline-clock-icon" />} color="#00aeff" style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(1d, 8h, 59min, 20seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>09/02/2023 07:14:41</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que respondeu solicitação">LUIS ROBERTO LOPES DE ALMEIDA (OUVIDORIA)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                        OUVIDORIA
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                        SETOR DE TELEATENDIMENTO
                        </Col>
                    </Row>	
                </Text>
            </> } />
            <Timeline.Item dot={<Icons.ClockCircleOutlined className="timeline-clock-icon" />} color="#ffbb00" style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(14h, 21min, 19seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>08/02/2023 16:53:22</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que solicitou pausa">SHEILA KARLA BORGES DE PAULA (SETOR DE TELEATENDIMENTO)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            SETOR DE TELEATENDIMENTO
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                    </Row>
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}}
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0}} span={15} label={'Tempo Total setor'}>(1d, 7h, 24min, 3seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>07/02/2023 09:29:19</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">LUIS ROBERTO LOPES DE ALMEIDA (OUVIDORIA)</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            SETOR DE TELEATENDIMENTO
                        </Col>
                    </Row>
                </Text>
            </> } />
            <Timeline.Item style={{fontSize: 13}} 
                label={
                    <Row style={{margin: 0}}>
                        <Text style={{padding: 0, color: 'green'}} span={7} label="Primeira Iteração" colon={false} />
                        <Text style={{padding: 0}} span={8} label={'Tempo Total setor'}>(8min, 53seg)</Text>
                        <Text style={{padding: 0}} span={9} label={'Data / hora'}>07/02/2023 09:20:25</Text>
                    </Row>
                } 
                children={ <>
                <Text label="Usuário que Encaminhou/Respondeu">SOVNET</Text>
                <Text label={<Row><Col span={13}>Origem</Col><Col span={11}>Destino</Col></Row>} colon={false}>
                    <Row>
                        <Col span={11}>
                            SOVNET
                        </Col>
                        <Col span={2}>
                            <Icons.ArrowRightOutlined />
                        </Col>
                        <Col span={11}>
                            OUVIDORIA
                        </Col>
                    </Row>
                </Text>
            </> } />
        </Timeline>
    )
}

export default Component