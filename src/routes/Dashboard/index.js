import React, { useRef, useState } from "react"
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from "antd"
import Auxiliary from "util/Auxiliary"

import L from 'leaflet'
import { Circle, FeatureGroup, MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { api } from "../../util/Api"
import MarkerClusterGroup from "react-leaflet-markercluster"

import 'react-leaflet-markercluster/dist/styles.min.css'; // Para os clusters


const MapUpdater = ({ position }) => {
	const map = useMap() // Acessa o mapa atual
	map.setView(position, map.getZoom()) // Atualiza o centro do mapa
	return null
}

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
	// eslint-disable-next-line
	const [layer, setLayer] = useState(null)
	const [circles, setCircles] = useState([])
	const [markers, setMarkers] = useState([])
	const [distance, setDistance] = useState()
	const [center, setCenter] = useState([-5.7863289362114925, -35.19982627509986])
	
	const [loading, setLoading] = useState(false)

	const featureGroupRef = useRef()

	const getData = async filter => {
		setLoading(true)

		let res = []
		await api.get('/indicadores/log-cerca-virtual', { params: filter })
			.then(({ data }) => {
				console.log('t3este')
				if (data.Result === 1) {
					res = data.Data
				} else {
					message.error(data.Message)
					return setLoading(false)
				}
			})
			.catch(err => {
				message.error('Falha ao consultar os dados.')
				return setLoading(false)
			})

		const circlesHelper = []
		const markersHelper = []

		res.forEach(item => {
			circlesHelper.push({ nmPrestador: item.nmPrestador, lat: item.lat, lng: item.lon, rad: item.raio, color: '#3388ff' })

			item.logs.forEach(item => {
				markersHelper.push({
					lat: item.lat,
					lng: item.lon,
					cdGuia: item.guia,
					cdProcedimento: item.procedimento,
					cdMedico: item.cdMedico,
					tipoLocal: item.tipoLocal,
					distancia: item.distanciaMetrosArea,
					dataHora: item.dataHora
				})

				if (item.tipoLocal !== 'C') {
					circlesHelper.push({
						lat: item.latLocalAtendimento,
						lng: item.lonLocalAtendimento,
						rad: item.raioLocalAtendimento,
						color: item.tipoLocal === 'E' ? '#72db1b' : '#ffee00'
					})
				}
			})
		})

		const uniqueCircles = circlesHelper.reduce((r, o) => {
			const exists = r.some( item => 
				item.lat === o.lat &&
				item.lng === o.lng &&
				item.rad === o.rad &&
				item.color === o.color
			)

			if (!exists) r.push(o)

			return r
		}, [])
		  
		
		setCircles(uniqueCircles)
		setMarkers(markersHelper)
		setCenter([parseFloat(markersHelper[0].lat), parseFloat(markersHelper[0].lng)])

		setLoading(false)
	}


	useState(() => {
		// setInitialCircles([{ lat: -5.7863289362114925, lng: -35.19982627509986, rad: 20 }])
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

	const handleCopy = async textToCopy => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(textToCopy)
			} else {
				// Caso esteja funcionando em HTTP, o código clipboard não vai
				// funcionar. O código abaixo replica a funcionaldiade mas pode
				// não funcionar em alguns navegadores por ser uma técnica obsoleta.
				const textarea = document.createElement("textarea");
				textarea.value = textToCopy;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}
			message.success('Coordenadas copiadas para a área de transferência.')
		} catch (e) {
			console.log(e)
		}

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
					<MapContainer center={center} zoom={18} maxZoom={20} scrollWheelZoom style={{height: '100%', width: '100%'}} >
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
									circle: false,
									marker: false
								}}
								edit={{
									edit: false,
									remove: false
								}}
							/>
							{circles.map((circle, index) => (
								<Circle key={'sec-'+index} center={[circle.lat, circle.lng]} radius={circle.rad} color={circle.color}>
									{/* <Popup>
										<p><b>{circle.nmPrestador}</b></p>
									</Popup> */}
								</Circle>
							))}
							<MarkerClusterGroup
								showCoverageOnHover={false} // Remove o destaque do "raio" do cluster
								// spiderfyOnMaxZoom={true}    // Expande os marcadores no zoom máximo
								maxClusterRadius={30}       // Diminui o alcance do agrupamento
								disableClusteringAtZoom={18} // Desativa o cluster em níveis altos de zoom
								
							  
							>
								{markers.map((marker, index) => (
								<Marker
									key={'mrk-'+index}
									position={[marker.lat, marker.lng]}
									title={`${marker.lat}, ${marker.lng}`}
									riseOnHover
								>
									<Popup>
										<div>
										<p style={{ justifyContent: 'center' }}>
											<span style={{ marginRight: 5 }}><b>{marker.lat}, {marker.lng}</b></span>
											<i
												className="icon icon-copy"
												style={{ color: '#00995D', cursor: 'pointer', position: 'relative', top: 3, fontSize: 16 }}
												onClick={() => handleCopy(`${marker.lat}, ${marker.lng}`)}
											/>
										</p>
										<div><b>CD_GUIA:</b> {marker.cdGuia}</div>
										<div><b>CD_PROC:</b> {marker.cdProcedimento}</div>
										<div><b>CD_MEDICO:</b> {marker.cdMedico}</div>
										<div><b>TIPO_LOCAL:</b> {marker.tipoLocal}</div>
										<div><b>DISTÂNCIA:</b> {marker.distancia}</div>
										<div><b>DATA:</b> {marker.dataHora}</div>
										</div>
									</Popup>
								</Marker>
								))}
							</MarkerClusterGroup>
						</FeatureGroup>
						<TileLayer
							attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							maxZoom={20}
						/>
						<MapUpdater position={center}/>
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
							<Form.Item name="tipoLocal" label="Local de atendimento:" initialValue="">
								<Select>
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
								<Button className="gx-mb-0" type="primary" htmlType="submit" loading={loading}>Buscar</Button>
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
