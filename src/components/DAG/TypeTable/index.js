import { Radio } from 'antd'
export const TypeTable = (props) => {
	const { type, typeArr, setType } = props
	return (
		<Radio.Group
			onChange={(e) => setType(e.target.value)}
			defaultValue={type}
		>
			{typeArr.map((k) => {
				return (
					<Radio.Button key={k} value={k}>
						{k}
					</Radio.Button>
				)
			})}
		</Radio.Group>
	)
}
