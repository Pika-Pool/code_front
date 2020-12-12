import '../styles/Box.css';

function Box(props) {
	return (
		<div className={`Box ${props.className}`}>
			<h2>{props.heading}</h2>
			<div className='space-y-2 pl-3'>{props.children}</div>
		</div>
	);
}

export default Box;
