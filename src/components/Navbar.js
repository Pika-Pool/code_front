function Navbar(props) {
	return (
		<nav className='w-full flex justify-between p-4 bg-gray-800'>
			<h1 className='font-bold uppercase text-2xl'>
				<a className='text-indigo-400' href='/'>
					App Name
				</a>
			</h1>
			<div className='status'>
				<span className='text-yellow-400 mr-3'>Connection:</span>
				{props.connectionStatus ? (
					<span className='text-green-400 uppercase'>Good</span>
				) : (
					<span className='text-red-400 uppercase'>Disconnected</span>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
