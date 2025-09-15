interface LoadingProps {
	text?: string
	size?: 'small' | 'medium' | 'large'
}

export default function Loading({ text = 'Loading...', size = 'medium' }: LoadingProps) {
	const spinnerSize = size === 'small' ? 24 : size === 'large' ? 56 : 40
	const borderWidth = size === 'small' ? 3 : size === 'large' ? 6 : 4

	return (
		<div className="loading-container">
			<div
				className="spinner"
				style={{
					width: `${spinnerSize}px`,
					height: `${spinnerSize}px`,
					borderWidth: `${borderWidth}px`,
					borderTopWidth: `${borderWidth}px`
				}}
			/>
			<span className="loading-text">{text}</span>
		</div>
	)
}
