import '../styles/Box.css';

function Box(props) {
	return (
		<div className={`Box bg-gray-800 rounded-lg p-3 ${props.className}`}>
			{props.children}
		</div>
	);
}

export default Box;
