import dagre from 'dagre'
import { Node } from '../Node'
import { Edge } from '../Edge'
import { Card } from 'antd'
const dagreLayout = (nodes, edges, nodeWidth = 172, nodeHeight = 36) => {
	const dagreGraph = new dagre.graphlib.Graph()
	dagreGraph.setDefaultEdgeLabel(() => ({}))
	// const getLayoutedElements = (nodes, edges) => {
	dagreGraph.setGraph({ rankdir: 'TB' })
	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, {
			width: nodeWidth,
			height: nodeHeight,
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
			x: nodeWithPosition.x - nodeWidth / 2 + 20,
			y: nodeWithPosition.y - nodeHeight / 2 + 20,
		}
	})
	return nodesPos
	// }
}
export const TableGroup = (props) => {
	const { nodes, edges, nodesObj, display, type } = props
	const nodeWidth = 172
	const nodeHeight = 36
	const width = 1000
	const height = 1000
	const nodesPos = dagreLayout(nodes, edges, nodeWidth, nodeHeight)
	return (
		<svg width={width} height={height}>
			<Node
				nodes={nodes}
				nodesPos={nodesPos}
				nodeWidth={nodeWidth}
				nodeHeight={nodeHeight}
			/>
			<Edge
				nodes={nodes}
				edges={edges}
				nodesPos={nodesPos}
				nodeWidth={nodeWidth}
				nodeHeight={nodeHeight}
			/>
		</svg>
	)
	// <Card title="Card title" bordered={false}>
	// 	Card content
	// </Card>
}
