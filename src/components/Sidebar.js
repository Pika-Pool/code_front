function Sidebar(props) {
	return (
		<aside
			className={`bg-gray-800 self-stretch ${props.className}`}
			style={{ width: '25%' }}
		>
			<ul className='text-white text-base font-medium rounded-md'>
				<li
					className='capitalize p-3 pl-5 border-b-2 border-indigo-400 tracking-widest cursor-pointer'
					onClick={() => props.onChangePageView('overview')}
				>
					<div>Overview</div>
				</li>
				<li
					className='capitalize p-3 pl-5 border-b-2 border-indigo-400 tracking-widest cursor-pointer'
					onClick={() => props.onChangePageView('routes')}
				>
					<div>Routes</div>
				</li>
			</ul>
		</aside>
	);
}

// function createList(arr) {
// 	return arr.map((obj, index) => {
// 		if ('subRoutes' in obj) {
// 			return (
// 				<div>
// 					<li className='border-b border-gray-50 my-3' key={index}>
// 						{obj.routeName}
// 					</li>
// 					<ul className='pl-3'>{createList(obj.subRoutes)}</ul>
// 				</div>
// 			);
// 		} else {
// 			return (
// 				<li className='border-b border-gray-50 my-2' key={index}>
// 					{obj.routeName}
// 				</li>
// 			);
// 		}
// 	});
// }

export default Sidebar;
