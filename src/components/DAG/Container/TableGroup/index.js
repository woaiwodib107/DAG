import dagre from 'dagre'
import { Node } from '../Node'
import { Edge } from '../Edge'
import { Card } from 'antd'

const getLayoutPos = (nodes, edges) => {
	const dagreGraph = new dagre.graphlib.Graph()
	dagreGraph.setDefaultEdgeLabel(() => ({}))
	dagreGraph.setGraph({ rankdir: 'TB' })
	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, {
			width: node.nodeWidth,
			height: node.nodeHeight,
		})
	})
	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target)
	})
	dagre.layout(dagreGraph)
	let nodesPos = {}
	nodes.forEach((node) => {
		const nodeWithPosition = dagreGraph.node(node.id)
		nodesPos[node.id] = {
			x: nodeWithPosition.x - node.nodeWidth / 2,
			y: nodeWithPosition.y - node.nodeHeight / 2,
		}
	})
	return nodesPos
}

export const TableGroup = (props) => {
	const {
		nodes,
		edges,
		nodesObj,
		display,
		type,
		nodesLayer,
		setSelectedNode,
		selectedNode,
		visible,
		setVisible,
		mousePosition,
		setMousePosition,
		setRightNode,
	} = props
	let layoutEdges = [],
		layoutNodes = [],
		layoutNodesObj = {}
	const nodeWidth = 172
	const nodeHeight = 80
	const border = 5
	const titleHeight = 36
	const flag = 1
	if (flag) {
	}
	switch (display) {
		case 'Merge':
			{
				let otherNodes = []
				const selectedLayer = selectedNode.layer
				nodes.forEach((node) => {
					if (node.layer <= selectedLayer) {
						node.nodeWidth = nodeWidth
						node.nodeHeight = nodeHeight
						node.count = 1
						node.type = 'Grid'
						node.nodes = [node]
						layoutNodesObj[node.id] = {
							nodeWidth,
							nodeHeight,
						}
						layoutNodes.push(node)
					}
				})
				Object.values(nodesObj).forEach((node) => {
					if (node.layer > selectedLayer) otherNodes.push(node)
				})
				const l = otherNodes.length
				const widthCount = l > 5 ? 5 : l
				const heightCount = Math.ceil(l / widthCount)
				const width = widthCount * (nodeWidth + border) + border
				const height =
					heightCount * (nodeHeight + border) + border + titleHeight
				const nodeTem = {
					id: 'Merge' + selectedLayer + 1,
					layer: selectedLayer + 1,
					count: otherNodes.length,
					type: 'Merge',
					name: '共有' + otherNodes.length + '节点',
					nodeWidth: width,
					nodeHeight: height,
					nodes: otherNodes,
					state: 0,
				}
				layoutNodes.push(nodeTem)
				// console.log(selectedLayer, otherNodes)
				edges.forEach((edge) => {
					if (
						nodesObj[edge.source].layer <= selectedLayer &&
						nodesObj[edge.target].layer <= selectedLayer
					) {
						edge.sourceNodeHeight =
							layoutNodesObj[edge.source].nodeHeight
						edge.sourceNodeWidth =
							layoutNodesObj[edge.source].nodeWidth
						edge.targetNodeHeight =
							layoutNodesObj[edge.target].nodeHeight
						edge.targetNodeWidth =
							layoutNodesObj[edge.target].nodeWidth
						layoutEdges.push(edge)
					}
				})
				layoutEdges.push({
					source: selectedNode.id,
					target: nodeTem.id,
					type: 'solid',
					sourceNodeHeight:
						layoutNodesObj[selectedNode.id].nodeHeight,
					sourceNodeWidth: layoutNodesObj[selectedNode.id].nodeWidth,
					targetNodeHeight: height,
					targetNodeWidth: width,
				})
			}
			break
		case 'Hierarchy':
			{
				const layoutNodesObj = {}
				// nodes.forEach((node) => {
				Object.keys(nodesLayer).forEach((layer) => {
					const nodesArr = nodesLayer[layer]
					const l = nodesArr.length
					const widthCount = l > 5 ? 5 : l
					const heightCount = Math.ceil(l / widthCount)
					const width = widthCount * (nodeWidth + border) + border
					const height =
						heightCount * (nodeHeight + border) +
						border +
						titleHeight
					let node = {
						id: 'Hierarchy' + layer,
						layer,
						count: l,
						type: 'Hierarchy',
						name: '共有' + l + '节点',
						nodeWidth: width,
						nodeHeight: height,
						nodes: nodesArr,
						state: 0,
					}
					layoutNodesObj[node.id] = {
						nodeWidth: node.nodeWidth,
						nodeHeight: node.nodeHeight,
					}
					layoutNodes.push(node)
				})
				// const layerLen = Object.keys(nodesLayer).length
				let last = ''
				Object.keys(nodesLayer).forEach((layer, index) => {
					if (last != '') {
						const source = 'Hierarchy' + last,
							target = 'Hierarchy' + layer
						layoutEdges.push({
							source,
							target,
							type: 'solid',
							sourceNodeHeight: layoutNodesObj[source].nodeHeight,
							sourceNodeWidth: layoutNodesObj[source].nodeWidth,
							targetNodeHeight: layoutNodesObj[target].nodeHeight,
							targetNodeWidth: layoutNodesObj[target].nodeWidth,
						})
					}
					last = layer
				})
			}
			break
		case 'Grid':
			{
				nodes.forEach((node) => {
					node.nodeWidth = nodeWidth
					node.nodeHeight = nodeHeight
					node.count = 1
					node.type = 'Grid'
					node.nodes = [node]
					layoutNodesObj[node.id] = {
						nodeWidth,
						nodeHeight,
					}
					layoutNodes.push(node)
				})
				layoutEdges = edges.map((edge) => {
					edge.sourceNodeHeight =
						layoutNodesObj[edge.source].nodeHeight
					edge.sourceNodeWidth = layoutNodesObj[edge.source].nodeWidth
					edge.targetNodeHeight =
						layoutNodesObj[edge.target].nodeHeight
					edge.targetNodeWidth = layoutNodesObj[edge.target].nodeWidth
					return edge
				})
			}
			break
	}
	const nodesPos = getLayoutPos(layoutNodes, layoutEdges)
	return (
		<g>
			<Node
				nodes={layoutNodes}
				nodesPos={nodesPos}
				nodeWidth={nodeWidth}
				nodeHeight={nodeHeight}
				selectedNode={selectedNode}
				setSelectedNode={setSelectedNode}
				visible={visible}
				setVisible={setVisible}
				mousePosition={mousePosition}
				setMousePosition={setMousePosition}
				setRightNode={setRightNode}
			/>
			<Edge edges={layoutEdges} nodesPos={nodesPos} />
		</g>
	)
	// <Card title="Card title" bordered={false}>
	// 	Card content
	// </Card>
}
