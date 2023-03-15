import { Button, Space } from 'antd'
export const AnalysisButton = (props) => {
	const { analysis, setAnalysis } = props
	return (
		<Space wrap>
			<Button
				id="top"
				onClick={(e) =>
					setAnalysis({
						top: analysis.top - 3,
						bottom: analysis.bottom,
					})
				}
			>
				上游分析
			</Button>
			<Button
				id="bottom"
				onClick={(e) =>
					setAnalysis({
						top: analysis.top,
						bottom: analysis.bottom + 3,
					})
				}
			>
				下游分析
			</Button>
		</Space>
	)
}
