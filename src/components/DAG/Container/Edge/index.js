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
				let R = (targetY - sourceY) / 2
				let path = ''
				if (sourceX == targetX) {
					path = `M ${sourceX} ${sourceY} L${targetX} ${targetY}`
				} else {
					if (sourceX < targetX) {
						path = `M ${sourceX} ${sourceY} Q ${sourceX} ${
							sourceY + R
						}, ${sourceX + R} ${sourceY + R} L ${targetX - R} ${
							targetY - R
						} Q${targetX} ${targetY - R},${targetX} ${targetY}`
					} else {
						path = `M ${sourceX} ${sourceY} Q ${sourceX} ${
							sourceY + R
						}, ${sourceX - R} ${sourceY + R} L ${targetX + R} ${
							targetY - R
						} Q${targetX} ${targetY - R},${targetX} ${targetY}`
					}
				}
				return (
					<g key={source + '-' + target}>
						<path
							d={path}
							stroke="black"
							fill="transparent"
							strokeDasharray={type == 'dotted' ? '5,5' : ''}
							// x1={sourceX}
							// y1={sourceY}
							// x2={targetX}
							// y2={targetY}
						/>
					</g>
				)
			})}
		</g>
	)
}
