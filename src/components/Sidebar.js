function Sidebar(props) {
	return (
		<aside className='h-full bg-red-300' style={{ width: '25%' }}>
			<ul className='text-white text-base font-medium rounded-md'>
				<li className='capitalize p-2 border-b border-red-500 tracking-widest'>
					Overview
				</li>
				<li className='capitalize p-2 border-b border-red-500 tracking-widest'>
					Routes
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
