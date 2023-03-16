import { Card, Col, Row } from 'antd'
export const Node = (props) => {
	const { nodes, nodesPos } = props
	const fill = ['#e5e6eb', '#d9f2d2', '#fbe6c9']
	return (
		<g>
			{nodes.map((node) => {
				return (
					<g key={node.id}>
						<rect
							width={node.nodeWidth}
							height={node.nodeHeight}
							x={nodesPos[node.id].x}
							y={nodesPos[node.id].y}
							fill={fill[node.state]}
						></rect>
						<text
							x={nodesPos[node.id].x + node.nodeWidth / 2}
							y={nodesPos[node.id].y + node.nodeHeight / 2}
						>
							{node.id}
						</text>
					</g>
				)
			})}
		</g>
	)
}
