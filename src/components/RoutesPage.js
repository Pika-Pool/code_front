import React from 'react';
import '../styles/RoutesPage.css';
import Modal from './Modal.js';

class RoutesPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddNewRouteModal: false,
			newRouteData: null,
			routePath: '',
			routeMethod: 'GET',
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		const key = event.currentTarget.name;
		let value = event.currentTarget.value;

		this.setState({
			[key]: value,
		});
	}

	render() {
		return (
			<div className='m-5'>
				{this.state.showAddNewRouteModal ? (
					<Modal
						onCreateNewRoute={newRouteData => {
							this.setState({
								showAddNewRouteModal: false,
								newRouteData,
							});
						}}
						routePath={this.state.routePath}
						routeMethod={this.state.routeMethod}
					/>
				) : (
					void 0
				)}

				<div className='font-semibold text-lg mb-2'>
					<h3>Add new route:</h3>
				</div>

				<form
					className='mb-5 flex space-x-5 new-routes'
					onSubmit={e => e.preventDefault()}
				>
					<div className='input-block'>
						<label htmlFor='routeMethod' className='sr-only'>
							Method:
						</label>
						<select
							id='routeMethod'
							name='routeMethod'
							value={this.state.routeMethod}
							onChange={this.onChange}
						>
							<option value='GET'>GET</option>
							<option value='POST'>POST</option>
							<option value='PUT'>PUT</option>
							<option value='DELETE'>DELETE</option>
						</select>
					</div>
					<div className='input-block'>
						<label htmlFor='routePath' className='sr-only'>
							Path:
						</label>
						<input
							type='text'
							id='routePath'
							name='routePath'
							placeholder='/foo'
							value={this.state.routePath}
							onChange={this.onChange}
						/>
					</div>

					<button
						type='submit'
						className='py-1 px-3 uppercase rounded-full text-white bg-blue-500'
						onClick={() =>
							this.setState({ showAddNewRouteModal: true })
						}
					>
						Add Route
					</button>
				</form>

				{/* list of current routes */}
				<div className='space-y-3'>
					<RouteBlock routeMethod='GET' routePath='/hello' />
					<RouteBlock routeMethod='GET' routePath='/hello' />
					<RouteBlock routeMethod='GET' routePath='/hello' />
				</div>
			</div>
		);
	}
}

function RouteBlock(props) {
	return (
		<div className='w-full flex rounded-sm overflow-hidden items-center ring-2 ring-gray-300'>
			<div className='method py-3 px-5 bg-blue-200 font-semibold'>
				{props.routeMethod}
			</div>
			<div type='text' className='path flex-1 p-3'>
				{props.routePath}
			</div>

			<button className='edit hover:bg-yellow-500 self-stretch p-2'>
				Edit
			</button>
			<button className='delete hover:bg-red-500 self-stretch p-2 '>
				Del
			</button>
		</div>
	);
}

export default RoutesPage;