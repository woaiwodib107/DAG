import './index.css'
import { DisplayButton } from './DisplayButton'
import { AnalysisButton } from './AnalysisButton'
import { Container } from './Container'
import { TypeTable } from './TypeTable'
import { useState, useRef, useEffect } from 'react'
import { data } from './data'
import * as d3 from 'd3'
import { Button } from 'antd'

const deal = (data) => {
	const typeArr = Object.keys(data.nodes[0])
	let nodesObj = {},
		nodesLayer = {}

	data.nodes.forEach((node) => {
		nodesLayer.hasOwnProperty(node.layer)
			? nodesLayer[node.layer].push(node.id)
			: (nodesLayer[node.layer] = [node.id])
		nodesObj[node.id] = node
		nodesObj[node.id].edgeArrTop = {}
		nodesObj[node.id].edgeArrBottom = {}
	})
	data.edges.forEach((edge) => {
		const { source, target, type } = edge
		nodesObj[source].edgeArrTop[target] = type
		nodesObj[target].edgeArrBottom[source] = type
	})
	// console.log(nodesLayer)
	return { typeArr, nodesObj, nodesLayer }
}
const { typeArr, nodesObj, nodesLayer } = deal(data)

export const DAG = () => {
	const [display, setDisplay] = useState('Grid')
	const [analysis, setAnalysis] = useState({ top: 0, bottom: 0 })
	const { nodes, edges } = data
	const [type, setType] = useState('')
	const width = 1000
	const height = 1000
	const svgRef = useRef()
	const gRef = useRef()

	const zoomed = (event) => {
		gRef.current &&
			d3.select(gRef.current).attr('transform', event.transform)
	}

	const zoom = d3.zoom().extent([
		[0, 0],
		[width, height],
	])

	const bindZoom = () => {
		svgRef.current &&
			d3.select(svgRef.current).call(zoom.on('zoom', zoomed))
	}

	const unbindZoom = () => {
		svgRef.current && d3.select(svgRef.current).call(zoom.on('zoom', null))
	}
	useEffect(() => {
		bindZoom()
		return function cleanup() {
			unbindZoom()
		}
	}, [])
	// -1代表没有点击，0代表点击了左键，1代表点击了右键
	const [rightNode, setRightNode] = useState(-1)
	const [nowNode, setNowNode] = useState('')
	const [visible, setVisible] = useState(false)
	const [mousePosition, setMousePosition] = useState({
		left: 0,
		top: 0,
	})
	const [selectedNode, setSelectedNode] = useState(nodesObj['9'])
	const [clickType, setClickType] = useState('None')

	const handleExpandParent = () => {
		setClickType('father')
		setNowNode(rightNode)
		setVisible(false)
		setMousePosition({ left: 0, top: 0 })
	}

	const handleExpandChild = () => {
		setClickType('child')
		setNowNode(rightNode)
		setVisible(false)
		setMousePosition({ left: 0, top: 0 })
	}
	return (
		<div className="rootContainer">
			<div className="leftPanel">
				<TypeTable typeArr={typeArr} type={type} setType={setType} />
			</div>
			<div className="rightPanel">
				<div className="rightPanelTop">
					<DisplayButton setDisplay={setDisplay} />
				</div>
				<div className="rightPanelContent">
					<AnalysisButton
						analysis={analysis}
						setAnalysis={setAnalysis}
					/>
					<div
						className="menu"
						style={{
							left: mousePosition.left,
							top: mousePosition.top,
							display: visible ? 'flex' : 'none',
						}}
					>
						<Button onClick={handleExpandParent}>展开父节点</Button>
						<Button onClick={handleExpandChild}>展开子节点</Button>
					</div>
					<svg width={width} height={height} ref={svgRef}>
						<g ref={gRef}>
							<Container
								nodesLayer={nodesLayer}
								analysis={analysis}
								nodes={nodes}
								edges={edges}
								nodesObj={nodesObj}
								display={display}
								type={type}
								visible={visible}
								nowNode={nowNode}
								clickType={clickType}
								setVisible={setVisible}
								mousePosition={mousePosition}
								setMousePosition={setMousePosition}
								selectedNode={selectedNode}
								setSelectedNode={setSelectedNode}
								setRightNode={setRightNode}
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	)
}
