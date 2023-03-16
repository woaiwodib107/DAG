import { Radio } from 'antd'
import './iconfont.css'

export const DisplayButton = (props) => {
	const { setDisplay } = props
	return (
		<Radio.Group
			onChange={(e) => setDisplay(e.target.value)}
			defaultValue=""
		>
			{/* <Radio.Button value="Grid">
				<i clasee="iconfont icon-flag"></i>
			</Radio.Button> */}
			<Radio.Button value="Grid">子节点展开</Radio.Button>
			<Radio.Button value="Merge">部分子节点聚合</Radio.Button>
			<Radio.Button value="Hierarchy">所有节点聚合</Radio.Button>
			{/* <Radio.Button value="d">Chengdu</Radio.Button> */}
		</Radio.Group>
	)
}
