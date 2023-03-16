import { Radio } from 'antd'
import './iconfont.css'

export const DisplayButton = (props) => {
	const { setDisplay } = props
	return (
		<Radio.Group
			onChange={(e) => setDisplay(e.target.value)}
			defaultValue=""
		>
			{/* <Radio.Button value="grid">
				<i clasee="iconfont icon-flag"></i>
			</Radio.Button> */}
			<Radio.Button value="grid">grid</Radio.Button>
			<Radio.Button value="merge">merge</Radio.Button>
			{/* <Radio.Button value="d">Chengdu</Radio.Button> */}
		</Radio.Group>
	)
}
