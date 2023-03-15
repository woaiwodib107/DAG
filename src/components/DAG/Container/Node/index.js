import { Card, Col, Row } from 'antd'
export const Node = (props) => {
	const { nodes, nodesPos, nodeWidth, nodeHeight } = props
	const fill = ['#e5e6eb', '#d9f2d2', '#fbe6c9']
	return (
		<g>
			{nodes.map((node) => {
				return (
					<g key={node.id}>
						<rect
							width={nodeWidth}
							height={nodeHeight}
							x={nodesPos[node.id].x}
							y={nodesPos[node.id].y}
							fill={fill[node.state]}
						></rect>
						<text
							x={nodesPos[node.id].x + nodeWidth / 2}
							y={nodesPos[node.id].y + nodeHeight / 2}
						>
							{node.name}
						</text>
					</g>
				)
			})}
		</g>
	)
}
