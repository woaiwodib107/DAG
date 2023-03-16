import './index.css'
import {
	CheckCircleTwoTone,
	ClockCircleTwoTone,
	MinusCircleTwoTone,
	CodepenOutlined,
} from '@ant-design/icons'
import cn from 'classnames'
const titleColor = ['#e5e6eb', '#d9f2d2', '#fbe6c9']
const borderColor = ['#d4d6e3', '#9dd397', '#f4d3a8']
const contentColor = ['#f8f8fa', '#f6fef2', '#fdfde8']

const SubNode = (props) => {
	const {
		width,
		subnode,
		setSelectedNode,
		selectedNode,
		setVisible,
		setMousePosition,
		setRightNode,
	} = props
	const handleSubNodeClick = (subnode, event) => {
		event.stopPropagation()
		setSelectedNode(subnode)
		// setRightNode(subnode)
	}
	const handleSubNodeContextMenu = (subnode, event) => {
		event.stopPropagation()
		event.preventDefault()
		setVisible(true)
		setMousePosition({
			left: event.clientX,
			top: event.clientY,
		})
		// setRightNode(subnode)
	}
	return (
		<div
			className={cn('subNode', {
				dashed: selectedNode.id === subnode.id,
			})}
			style={{ width }}
			onClick={(event) => handleSubNodeClick(subnode, event)}
			onContextMenu={(event) => handleSubNodeContextMenu(subnode, event)}
		>
			<CodepenOutlined />
			<div style={{ marginLeft: 5 }}>
				{'标题:' + subnode.name + ' ' + subnode.detail}
			</div>
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
	const {
		nodes,
		nodesPos,
		setSelectedNode,
		selectedNode,
		visible,
		setVisible,
		mousePosition,
		setMousePosition,
		setRightNode,
	} = props
	const hasChildren = (node) => node.count > 1
	const handleContextMenu = (node, event) => {
		event.preventDefault()
		setVisible(true)
		setRightNode(node)
		setMousePosition({
			left: event.clientX,
			top: event.clientY,
		})
	}

	const handleClick = (node) => {
		setSelectedNode(node)
		setRightNode(node)
	}
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
								className={cn('nodeContainer', {
									dashed: node.id === selectedNode.id,
								})}
								style={{
									borderColor: borderColor[node.state],
								}}
								onContextMenu={(event) =>
									handleContextMenu(node, event)
								}
								onClick={() => handleClick(node)}
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
													subnode={subnode}
													key={subnode.id}
													width={`${
														100 /
														Math.min(5, node.count)
													}%`}
													setSelectedNode={
														setSelectedNode
													}
													selectedNode={selectedNode}
													setMousePosition={
														setMousePosition
													}
													setVisible={setVisible}
													setRightNode={setRightNode}
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
