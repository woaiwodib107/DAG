import './index.css'
import { DisplayButton } from './DisplayButton'
import { AnalysisButton } from './AnalysisButton'
import { Container } from './Container'
import { TypeTable } from './TypeTable'
import { useState } from 'react'
import { data } from './data'
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

export const DAG = () => {
	const [firstNode, setFirstNode] = useState('9')
	const [display, setDisplay] = useState('grid')
	const [analysis, setAnalysis] = useState({ top: 0, bottom: 0 })
	const { typeArr, nodesObj, nodesLayer } = deal(data)
	const { nodes, edges } = data
	const [type, setType] = useState(typeArr[0])
	const width = 1000
	const height = 1000
	return (
		<div>
			<DisplayButton setDisplay={setDisplay} />
			<TypeTable typeArr={typeArr} type={type} setType={setType} />
			<AnalysisButton analysis={analysis} setAnalysis={setAnalysis} />
			<svg width={width} height={height}>
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
			</svg>
		</div>
	)
}
