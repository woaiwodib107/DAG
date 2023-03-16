import { Card, Col, Row } from 'antd'
export const Edge = (props) => {
	const { edges, nodesPos } = props

	return (
		<g>
			{edges.map((edge) => {
				const {
					source,
					target,
					type,
					sourceNodeWidth,
					sourceNodeHeight,
					targetNodeWidth,
				} = edge
				const sourceX = nodesPos[source].x + sourceNodeWidth / 2
				const sourceY = nodesPos[source].y + sourceNodeHeight
				const targetX = nodesPos[target].x + targetNodeWidth / 2
				const targetY = nodesPos[target].y
				return (
					<g key={source + '-' + target}>
						<line
							strokeDasharray={type == 'dotted' ? '5,5' : ''}
							x1={sourceX}
							y1={sourceY}
							x2={targetX}
							y2={targetY}
							stroke="black"
						/>
					</g>
				)
			})}
		</g>
	)
}
