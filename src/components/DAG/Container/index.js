import { TableGroup } from './TableGroup'
import { TableCluster } from './TableCluster'
import { select } from 'd3'
let analysisNodes = []
let analysisEdges = []
let analysisNodesSet = new Set()
const dealData = (
	analysis,
	nodes,
	edges,
	selectedNode,
	nodesLayer,
	nodesObj,
	clickType,
	nowNode
) => {
	const layer = selectedNode.layer
	let selectedLayer = []
	let analysisLayer = {}
	// if (nodesLayer.hasOwnProperty(layer - 1))
	// 	selectedLayer = selectedLayer.concat(nodesLayer[layer - 1])
	// if (nodesLayer.hasOwnProperty(layer + 1))
	// 	selectedLayer = selectedLayer.concat(nodesLayer[layer + 1])
	let { bottom, top } = analysis
	top = layer - 1 + top
	bottom = layer + 1 + bottom
	if (top < 1) top = 1
	const maxBottom = Object.keys(nodesLayer).length
	if (bottom > maxBottom) bottom = maxBottom

	for (let i = top; i <= bottom; i++) {
		selectedLayer = selectedLayer.concat(nodesLayer[i])
		analysisLayer[i] = []
	}
	selectedLayer.map((id) => {
		analysisLayer[nodesObj[id].layer].push(nodesObj[id])
		if (!analysisNodesSet.has(id)) {
			analysisNodesSet.add(id)
			analysisNodes.push(nodesObj[id])
		}
	})

	if (clickType == 'father') {
		const edgeArrBottom = nodesObj[nowNode.id].edgeArrBottom
		Object.keys(edgeArrBottom).forEach((source) => {
			source = parseInt(source)
			if (!analysisNodesSet.has(source)) {
				analysisNodesSet.add(source)
				const type = edgeArrBottom[source]
				analysisNodes.push(nodesObj[source])
				analysisEdges.push({
					source,
					target: nowNode.id,
					type,
				})
			}
		})
	}
	if (clickType == 'child') {
		const edgeTop = nodesObj[nowNode.id].edgeArrTop
		Object.keys(edgeTop).forEach((target) => {
			target = parseInt(target)
			if (!analysisNodesSet.has(target)) {
				analysisNodesSet.add(target)
				const type = edgeTop[target]
				analysisNodes.push(nodesObj[target])
				analysisEdges.push({
					target,
					source: nowNode.id,
					type,
				})
			}
		})
	}
	// const selectedLayerSet = new Set(selectedLayer)
	let edgesTmp = []
	let edgesTmpSet = new Set()
	analysisEdges.concat(edges).forEach((edge) => {
		if (
			analysisNodesSet.has(edge.source) &&
			analysisNodesSet.has(edge.target) &&
			!edgesTmpSet.has(edge.source + '-' + edge.target)
		) {
			edgesTmpSet.add(edge.source + '-' + edge.target)
			edgesTmp.push(edge)
		}
	})

	// analysisEdges.forEach((edge) => {
	// 	if (
	// 		analysisNodesSet.has(edge.source) &&
	// 		analysisNodesSet.has(edge.target)
	// 	)
	// 		edgesTmp.push(edge)
	// })
	analysisEdges = edgesTmp
	return { analysisNodes, analysisEdges, analysisLayer }
}

export const Container = (props) => {
	const {
		nodesLayer,
		analysis,
		nodes,
		edges,
		nodesObj,
		display,
		type,
		visible,
		setVisible,
		mousePosition,
		setMousePosition,
		setSelectedNode,
		selectedNode,
		clickType,
		setRightNode,
		nowNode,
	} = props
	const { analysisNodes, analysisEdges, analysisLayer } = dealData(
		analysis,
		nodes,
		edges,
		selectedNode,
		nodesLayer,
		nodesObj,
		clickType,
		nowNode
	)
	// console.log(display)
	return (
		<TableGroup
			nodes={analysisNodes}
			nodesLayer={analysisLayer}
			edges={analysisEdges}
			nodesObj={nodesObj}
			display={display}
			type={type}
			clickType={clickType}
			selectedNode={selectedNode}
			setSelectedNode={setSelectedNode}
			visible={visible}
			setVisible={setVisible}
			mousePosition={mousePosition}
			setMousePosition={setMousePosition}
			setRightNode={setRightNode}
		/>
	)
	// switch (display) {
	// 	case 'Grid':
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
	// 	case 'Grid':
	// 		return <TableGroup layut={'Grid'} table={'sigle'} type={type} />
	// 	case 'cluster':
	// 		return 1
	// }
}
