import React, { useRef, useState } from "react"
import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Tooltip} from "antd"
import Auxiliary from "util/Auxiliary"

import L from 'leaflet'
import { Circle, FeatureGroup, MapContainer, TileLayer, Marker } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { api } from "../../util/Api"

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
	// Raio da Terra em quilômetros
	const raioTerra = 6371
  
	// Converte as latitudes e longitudes de graus para radianos
	const lat1Rad = toRadians(lat1)
	const lon1Rad = toRadians(lon1)
	const lat2Rad = toRadians(lat2)
	const lon2Rad = toRadians(lon2)
  
	// Diferenças nas latitudes e longitudes
	const deltaLat = lat2Rad - lat1Rad
	const deltaLon = lon2Rad - lon1Rad
  
	// Fórmula de Haversine para calcular a distância entre dois pontos em uma esfera
	const a =
		Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  
	// Distância em quilômetros
	return raioTerra * c
}
  
// Função auxiliar para converter graus para radianos
function toRadians(graus) {
	return graus * (Math.PI / 180)
}

L.Icon.Default.mergeOptions({
	iconRetinaUrl:
	  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
	iconUrl:
	  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
	shadowUrl:
	  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
})

const Dashboard = () => {
	const [layer, setLayer] = useState(null)
	const [initialCircles, setInitialCircles] = useState([])
	const [circles, setCircles] = useState([])
	const [markers, setMarkers] = useState([])
	const [distance, setDistance] = useState()
	
	const [loading, setLoading] = useState(false)

	const featureGroupRef = useRef()

	const getData = async filter => {
		setLoading(true)

		let res = []
		await api.get('/indicadores/log-cerca-virtual', { params: filter })
			.then(({ data }) => {
				if (data.Result === 1) {
					res = data.Data
				} else {
					message.error('Ocorreu um erro ao tentar carregar os dados.')
				}
			})
			.catch(err => console.log('err', err))

		const circlesHelper = []
		const markersHelper = []

		res.forEach(item => {
			circlesHelper.push({ lat: item.lat, lng: item.lon, rad: item.raio })

			item.logs.forEach(item => { markersHelper.push({
				lat: item.lat,
				lng: item.lon,
				cdGuia: item.guia,
				cdProcedimento: item.procedimento,
				cdMedico: item.cdMedico,
				tipoLocal: item.tipoLocal,
				distancia: item.distanciaMetrosArea,
				dataHora: item.dataHora
			}) })
		})

		setCircles(circlesHelper)
		setMarkers(markersHelper)

		setLoading(false)
	}

	useState(() => {
		getData()
		setInitialCircles([{ lat: -5.7863289362114925, lng: -35.19982627509986, rad: 20 }])
	}, [])

	const _onCreated = e => {
		let lat = e.layer._latlng.lat
		let lng = e.layer._latlng.lng
		let rad = e.layer._mRadius

		setLayer({ lat, lng, rad })
		setCircles(prevCircles => [...prevCircles, { lat, lng, rad }])


		const layers = featureGroupRef.current.getLayers()

		// A condição abaixo garante que só tenha 1 layer desenhado no mapa por vez.
		// Maior q 1 pois se já existir um layer no mapa essa variável vai estar com 2 layers nesse momento,
		// um por ser o inicial e outro por conta que a lib adicionou o novo layer mas ainda não o excluiu.
		// Isso acontece pois essa função é chamada assim que o novo layer é adicionado.
		if (layers.length > 1) return featureGroupRef.current.removeLayer(e.layer)
	}
	
	const _onEdited = e => {
		const editedCircles = Object.values(e.layers._layers).map(item => {
			let lat = item._latlng.lat
			let lng = item._latlng.lng
			let rad = item._mRadius

			return { lat, lng, rad }
		})

		setCircles(editedCircles)
	}

	const _onDeleted = () => {
		setCircles([])
	}

	const handleCopy = textToCopy => {
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				message.success('Coordenadas copiadas para a área de transferência.')
			})
			.catch((err) => {
				message.error('Falha ao copiar coodenadas.', err.message)
			})
	}
	

	const handleCalc = e => {
		console.log('submit', e)

		let { latLngInitial, latLngFinal } = e

		let xLat1 = Number(latLngInitial.split(', ')[0])
		let yLat1 = Number(latLngInitial.split(', ')[1])
		let xLat2 = Number(latLngFinal.split(', ')[0])
		let yLat2 = Number(latLngFinal.split(', ')[1])

		const d = calcularDistancia(xLat1, yLat1, xLat2, yLat2)
		setDistance((d*1000).toFixed(2))
	}

	const handleSubmit = values => {
		const filter = {
			cdPrestador: 	values.cdPrestador,
			cdGuia: 		values.cdGuia,
			cdProcedimento: values.cdProcedimento,
			cdMedico: 		values.cdMedico,
			tipoLocal: 		values.tipoLocal,
			dtInicial: 		values.periodo?.[0] ? values.periodo[0].format('DD/MM/YYYY') : null,
			dtFinal: 		values.periodo?.[1] ? values.periodo[1].format('DD/MM/YYYY') : null
		}

		getData(filter)
	}

	return (
		<Auxiliary>
			<Row style={{height: '100%'}}>
				<Col xl={18} lg={18} md={16} sm={12} xs={24}>
					<MapContainer center={[-5.7863289362114925, -35.19982627509986]} zoom={18} scrollWheelZoom style={{height: '100%', width: '100%'}}>
						<FeatureGroup ref={featureGroupRef}>
							<EditControl
								position="topright"
								onCreated={_onCreated}
								onEdited={_onEdited}
								onDeleted={_onDeleted}
								draw={{
									rectangle: false,
									polyline: false,
									polygon: false,
									circlemarker: false,
									circle: true,
									marker: false
								}}
								edit={{
									edit: true,
									remove: true
								}}
							/>
							{initialCircles.map((circle, index) => (
								<Circle key={'ini-'+index} center={[circle.lat, circle.lng]} radius={circle.rad} />
							)).concat(circles.map((circle, index) => (
								<Circle key={'sec-'+index} center={[circle.lat, circle.lng]} radius={circle.rad} />
							))).concat(markers.map((marker, index) => (
								<Marker
									key={'mrk-'+index}
									position={[marker.lat, marker.lng]}
									title={`
										LAT: ${marker.lat}
										LON: ${marker.lng}
										CD_GUIA: ${marker.cdGuia}
										CD_PROC: ${marker.cdProcedimento}
										CD_MEDICO: ${marker.cdMedico}
										TIPO_LOCAL: ${marker.tipoLocal}
										DISTÂNCIA: ${marker.distancia}
										DATA: ${marker.dataHora}
									`.replace(/\t/g, '')}
									eventHandlers={{
										click: () => handleCopy(`${marker.lat}, ${marker.lng}`),
										mouseover: () => 
											<Tooltip 
												title={
													<>
													<p>Para beneficiário, utilizar carteira ou CPF.</p>
													<p>LAT: {marker.lat}</p>
													<p>LON: {marker.lng}</p>
													<p>CD_GUIA: {marker.cdGuia}</p>
													<p>CD_PROC: {marker.cdProcedimento}</p>
													<p>CD_MEDICO: {marker.cdMedico}</p>
													<p>TIPO_LOCAL: {marker.tipoLocal}</p>
													<p>DISTÂNCIA: {marker.distancia}</p>
													<p>DATA: {marker.dataHora}</p>
													</>
												}
												color="#00995d"
												placement="topRight"
												style={{ maxWidth: 500, zIndex: 2000 }}
											>
												teste
											</Tooltip>
									}}
									riseOnHover
								/>
							)))}
						</FeatureGroup>
						<TileLayer
							attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</MapContainer>
				</Col>
				<Col xl={6} lg={6} md={6} sm={12} xs={24}>
					<Card className="gx-card">
						<Form layout="vertical" onFinish={handleSubmit}>
							<Form.Item name="cdPrestador" label="Código do Prestador:">
								<Input />
							</Form.Item>
							<Form.Item name="cdGuia" label="Código da Guia:">
								<Input />
							</Form.Item>
							<Form.Item name="cdProcedimento" label="Código do Procedimento:">
								<Input />
							</Form.Item>
							<Form.Item name="cdMedico" label="Código do médico:">
								<Input />
							</Form.Item>
							<Form.Item name="tipoLocal" label="Local de atendimento:">
								<Select defaultValue="">
									<Select.Option key="">Todos</Select.Option>
									<Select.Option key="C">Clínica</Select.Option>
									<Select.Option key="D">Domiciliar</Select.Option>
									<Select.Option key="E">Escolar</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item label="Período" name="periodo" labelCol={{xs: {span: 24}, sm: {span: 24}}}>
								<DatePicker.RangePicker format='DD/MM/YYYY' />
							</Form.Item>
							<Form.Item>
								<Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Calcular distância</Button>
							</Form.Item>
							{ distance && `A distância é de ${distance} metros.` }
						</Form>
					</Card>
					<Card className="gx-card">
						<Form layout="vertical" onFinish={handleCalc}>
							<Form.Item name="latLngInitial" label="Coordenadas Iniciais:">
								<Input placeholder="-5.7863252, -35.1998252" />
							</Form.Item>
							<Form.Item name="latLngFinal" label="Coordenadas Finais:">
								<Input placeholder="-5.7863252, -35.1998252" />
							</Form.Item>
							<Form.Item>
								<Button className="gx-mb-0" type="primary" htmlType="submit">Calcular distância</Button>
							</Form.Item>
							{ distance && `A distância é de ${distance} metros.` }
						</Form>
					</Card>
				</Col>
			</Row>
		</Auxiliary>
	)
}

export default Dashboard
