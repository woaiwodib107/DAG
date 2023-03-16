import './index.css'
import { DisplayButton } from './DisplayButton'
import { AnalysisButton } from './AnalysisButton'
import { Container } from './Container'
import { TypeTable } from './TypeTable'
import { useState, useRef, useEffect } from 'react'
import { data } from './data'
import * as d3 from 'd3'

const deal = (data) => {
	const typeArr = Object.keys(data.nodes[0])
	let nodesObj = {},
		nodesLayer = {}

	data.nodes.forEach((node) => {
		nodesLayer.hasOwnProperty(node.layer)
			? nodesLayer[node.layer].push(node.id)
			: (nodesLayer[node.layer] = [node.id])
		nodesObj[node.id] = node
		nodesObj[node.id].edgeArrTop = {}
		nodesObj[node.id].edgeArrBottom = {}
	})
	data.edges.forEach((edge) => {
		const { source, target, type } = edge
		nodesObj[source].edgeArrTop[target] = type
		nodesObj[target].edgeArrBottom[source] = type
	})
	// console.log(nodesLayer)
	return { typeArr, nodesObj, nodesLayer }
}
const { typeArr, nodesObj, nodesLayer } = deal(data)

export const DAG = () => {
	const [firstNode, setFirstNode] = useState('9')
	const [display, setDisplay] = useState('Grid')
	const [analysis, setAnalysis] = useState({ top: 0, bottom: 0 })
	const { nodes, edges } = data
	const [type, setType] = useState('')
	const width = 1000
	const height = 1000
	const svgRef = useRef()
	const gRef = useRef()

	const zoomed = (event) => {
		gRef.current &&
			d3.select(gRef.current).attr('transform', event.transform)
	}

	const zoom = d3.zoom().extent([
		[0, 0],
		[width, height],
	])

	const bindZoom = () => {
		svgRef.current &&
			d3.select(svgRef.current).call(zoom.on('zoom', zoomed))
	}

	const unbindZoom = () => {
		svgRef.current && d3.select(svgRef.current).call(zoom.on('zoom', null))
	}
	useEffect(() => {
		bindZoom()
		return function cleanup() {
			unbindZoom()
		}
	}, [])
	return (
		<div className="rootContainer">
			<div className="leftPanel">
				<TypeTable typeArr={typeArr} type={type} setType={setType} />
			</div>
			<div className="rightPanel">
				<div className="rightPanelTop">
					<DisplayButton setDisplay={setDisplay} />
				</div>
				<div className="rightPanelContent">
					<AnalysisButton
						analysis={analysis}
						setAnalysis={setAnalysis}
					/>
					<svg width={width} height={height} ref={svgRef}>
						<g ref={gRef}>
							<Container
								firstNode={firstNode}
								nodesLayer={nodesLayer}
								analysis={analysis}
								nodes={nodes}
								edges={edges}
								nodesObj={nodesObj}
								display={display}
								type={type}
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	)
}
