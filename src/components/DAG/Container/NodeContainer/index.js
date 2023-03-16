export const NodeContainer = (props) => {
	const { nodes, x, y } = props
	const l = nodes.length()
	const border = 5
	const eachWidth = 150
	const eachHeight = 30
	const widthCount = l > 5 ? 5 : l
	const heightCount = Math.ceil(l / widthCount)
	const titleHeight = 36
	const width = widthCount * (eachWidth + border) + border
	const height = heightCount * (eachWidth + border) + border
	return (
		<g>
			<rect width={width} height={height} x={x} y={y}>
				<text x={x + 10} y={y + 5}>
					共{l}个节点
				</text>
				{nodes.map((node, index) => {
					return (
						<g>
							<rect
								height={eachHeight}
								width={eachWidth}
								x={x + index * eachWidth + border}
								y={y + index * eachHeight + border}
							>
								{node.name}
							</rect>
						</g>
					)
				})}
			</rect>
		</g>
	)
}
