import './index.css'
import {
	CheckCircleTwoTone,
	ClockCircleTwoTone,
	MinusCircleTwoTone,
	CodepenOutlined,
} from '@ant-design/icons'

const titleColor = ['#e5e6eb', '#d9f2d2', '#fbe6c9']
const borderColor = ['#d4d6e3', '#9dd397', '#f4d3a8']
const contentColor = ['#f8f8fa', '#f6fef2', '#fdfde8']

const SubNode = (props) => {
	const { width, detail, name } = props
	return (
		<div className="subNode" style={{ width }}>
			<CodepenOutlined />
			<div style={{ marginLeft: 5 }}>{'标题:' + name + ' ' + detail}</div>
		</div>
	)
}

const displayIcon = (state) => {
	switch (state) {
		case 0: {
			return <MinusCircleTwoTone twoToneColor="#5e617a" />
		}
		case 1: {
			return <CheckCircleTwoTone twoToneColor="#52c41a" />
		}
		case 2: {
			return <ClockCircleTwoTone twoToneColor="#faa548" />
		}
		default: {
			return <MinusCircleTwoTone twoToneColor="#5e617a" />
		}
	}
}

export const Node = (props) => {
	const { nodes, nodesPos } = props
	const hasChildren = (node) => node.count > 1

	return (
		<g>
			{nodes.map((node) => {
				return (
					<g key={node.id}>
						<foreignObject
							width={node.nodeWidth}
							height={node.nodeHeight}
							x={nodesPos[node.id].x}
							y={nodesPos[node.id].y}
						>
							<div
								className="nodeContainer"
								style={{
									borderColor: borderColor[node.state],
								}}
							>
								<div
									className="nodeContainerTitle"
									style={{
										background: titleColor[node.state],
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 5,
											top: '50%',
											transform: 'translateY(-50%)',
										}}
									>
										{displayIcon(node.state)}
									</div>
									{node.name}
								</div>
								<div
									className="nodeContainerContent"
									style={{
										justifyContent:
											node.type === 'Grid' &&
											!hasChildren(node) &&
											'center',
										alignItems:
											node.type === 'Grid' &&
											!hasChildren(node) &&
											'center',
										background: contentColor[node.state],
									}}
								>
									{node.type === 'Grid' && !hasChildren(node)
										? node.name + node.detail
										: node.nodes.map((subnode) => (
												<SubNode
													name={subnode.name}
													detail={subnode.detail}
													key={subnode.id}
													width={`${
														100 /
														Math.min(5, node.count)
													}%`}
												/>
										  ))}
								</div>
							</div>
						</foreignObject>
					</g>
				)
			})}
		</g>
	)
}
