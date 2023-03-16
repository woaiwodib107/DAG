import { TableGroup } from './TableGroup'
import { TableCluster } from './TableCluster'
const dealData = (analysis, nodes, edges, firstNode, nodesLayer, nodesObj) => {
	const layer = nodesObj[firstNode].layer
	let firstLayer = []
	let analysisLayer = {}
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
		analysisLayer[i] = []
	}

	const analysisNodes = firstLayer.map((id) => {
		analysisLayer[nodesObj[id].layer].push(nodesObj[id])
		return nodesObj[id]
	})
	const firstLayerSet = new Set(firstLayer)
	let analysisEdges = []
	edges.forEach((edge) => {
		if (firstLayerSet.has(edge.source) && firstLayerSet.has(edge.target))
			analysisEdges.push(edge)
	})
	return { analysisNodes, analysisEdges, analysisLayer }
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
	const { analysisNodes, analysisEdges, analysisLayer } = dealData(
		analysis,
		nodes,
		edges,
		firstNode,
		nodesLayer,
		nodesObj
	)
	console.log(display)
	return (
		<TableGroup
			nodes={analysisNodes}
			nodesLayer={analysisLayer}
			edges={analysisEdges}
			nodesObj={nodesObj}
			display={display}
			type={type}
		/>
	)
	// switch (display) {
	// 	case 'grid':
	// 		return (
	// 			<TableGroup
	// 				nodes={analysisNodes}
	// 				nodesLayer={analysisLayer}
	// 				edges={analysisEdges}
	// 				nodesObj={nodesObj}
	// 				display={display}
	// 				type={type}
	// 			/>
	// 		)
	// 		break
	// 	case 'cluster':
	// 		return <TableCluster type={type} nodesLayer={nodesLayer} />
	// }

	// switch (display) {
	// 	case 'grid':
	// 		return <TableGroup layut={'grid'} table={'sigle'} type={type} />
	// 	case 'cluster':
	// 		return 1
	// }
}
