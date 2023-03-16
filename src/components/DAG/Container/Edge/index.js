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
				// console.log(targetY - sourceY)  50
				const R = 25
				// let R = (targetY - sourceY) / 2
				let path = ''
				if (Math.abs(targetX - sourceX) < 50) {
					path = `M ${sourceX} ${sourceY} L${targetX} ${targetY}`
				} else {
					if (sourceX == targetX) {
						path = `M ${sourceX} ${sourceY} L${targetX} ${targetY}`
					} else {
						if (sourceX < targetX) {
							path = `M ${sourceX} ${sourceY} L${sourceX} ${
								targetY - R - R
							} Q ${sourceX} ${targetY - R}, ${sourceX + R} ${
								targetY - R
							} L ${targetX - R} ${targetY - R} Q${targetX} ${
								targetY - R
							},${targetX} ${targetY}`
						} else {
							path = `M ${sourceX} ${sourceY} L${sourceX} ${
								targetY - R - R
							} Q ${sourceX} ${targetY - R}, ${sourceX - R} ${
								targetY - R
							} L ${targetX + R} ${targetY - R} Q${targetX} ${
								targetY - R
							},${targetX} ${targetY}`
						}
					}
				}
				return (
					<g key={source + '-' + target}>
						<defs>
							<marker
								id="triangle"
								markerUnits="strokeWidth"
								markerWidth="5"
								markerHeight="4"
								refX="0"
								refY="2"
								orient="auto"
							>
								<path d="M 0 0 L 5 2 L 0 4 z" />
							</marker>
						</defs>
						<path
							d={path}
							stroke="black"
							fill="transparent"
							strokeDasharray={type == 'dotted' ? '5,5' : ''}
							markerEnd="url(#triangle)"
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
