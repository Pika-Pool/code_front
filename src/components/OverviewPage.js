import Box from './Box.js';

function OverviewPage(props) {
	return (
		<div className='p-5 grid grid-cols-2 gap-5'>
			<Box
				className='col-span-full'
				heading={
					<span className='space-x-3'>
						<span>{props.appName}</span>
						<small className='text-gray-200 text-opacity-50'>
							v{props.appVersion}
						</small>
					</span>
				}
			>
				<p>My very first app</p>
			</Box>

			<Box className='col-span-full' heading='Start your app locally'>
				<p>Navigate into the project folder</p>
				<code>cd Destination/{props.appName}</code>

				<p>Start your server locally</p>
				<code>python manage.py startserver</code>
			</Box>
		</div>
	);
}

OverviewPage.defaultProps = {
	appName: 'TodoApp',
	appVersion: '1.0.0',
};

export default OverviewPage;
