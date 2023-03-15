import { TableGroup } from './TableGroup'
const dealData = (analysis, nodes, edges, firstNode, nodesLayer, nodesObj) => {
	const layer = nodesObj[firstNode].layer
	let firstLayer = nodesLayer[layer]
	// if (nodesLayer.hasOwnProperty(layer - 1))
	// 	firstLayer = firstLayer.concat(nodesLayer[layer - 1])
	// if (nodesLayer.hasOwnProperty(layer + 1))
	// 	firstLayer = firstLayer.concat(nodesLayer[layer + 1])
	let { bottom, top } = analysis
	top = layer - 1 + top
	bottom = layer + 1 + bottom
	if (top < 1) top = 1
	const maxBottom = Object.keys(nodesLayer).length
	if (bottom > maxBottom) bottom = maxBottom

	for (let i = top; i <= bottom; i++) {
		firstLayer = firstLayer.concat(nodesLayer[i])
	}

	const analysisNodes = firstLayer.map((id) => nodesObj[id])
	const firstLayerSet = new Set(firstLayer)
	let analysisEdges = []
	edges.forEach((edge) => {
		if (firstLayerSet.has(edge.source) && firstLayerSet.has(edge.target))
			analysisEdges.push(edge)
	})
	return { analysisNodes, analysisEdges }
}

export const Container = (props) => {
	const {
		nodesLayer,
		firstNode,
		analysis,
		nodes,
		edges,
		nodesObj,
		display,
		type,
	} = props
	const { analysisNodes, analysisEdges } = dealData(
		analysis,
		nodes,
		edges,
		firstNode,
		nodesLayer,
		nodesObj
	)
	console.log(analysis)
	return (
		<TableGroup
			nodes={analysisNodes}
			edges={analysisEdges}
			nodesObj={nodesObj}
			display={display}
			type={type}
		/>
	)

	// switch (display) {
	// 	case 'grid':
	// 		return <TableGroup layut={'grid'} table={'sigle'} type={type} />
	// 	case 'cluster':
	// 		return 1
	// }
}
