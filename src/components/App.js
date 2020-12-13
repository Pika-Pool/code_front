import '../styles/App.css';
import Navbar from './Navbar.js';
import SideBar from './Sidebar.js';
import RoutesPage from './RoutesPage.js';
import OverviewPage from './OverviewPage.js';

import React from 'react';
import * as uuid from 'uuid';
import io from 'socket.io-client';
import qs from 'qs';

let socket;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			routes: [],
			connectionStatus: false,
			pageView: 'overview',
		};

		this.addNewRoute = this.addNewRoute.bind(this);
		this.onChangePageView = this.onChangePageView.bind(this);
	}

	componentDidMount() {
		const roomId = qs.parse(window.location.search, {
			ignoreQueryPrefix: true,
		}).roomId;

		if (!roomId) return;

		socket = io(
			process.env.REACT_APP_SOCKET_SERVER_URL || 'ws://localhost:8080',
			{
				autoconnect: false,
				query: {
					roomId,
					clientType: 'browser',
				},
				reconnectionAttempts: 10,
			}
		);

		socket
			.connect()
			.on('connect', () => {
				this.setState({ connectionStatus: true });
				console.log('connection successful');
				socket.emit('message', 'hello from client');
			})
			.on('error', err => console.log(err))
			.on('disconnect', reason => {
				if (
					reason === 'io server disconnect' ||
					reason === 'io client disconnect'
				) {
					// the disconnection was initiated by the server/client
					// do not reconnect
					console.log('io server disconnect');
					return;
				}
				socket.connect();
			});
		// .on('reconnect_failed', );
	}

	onChangePageView(pageView) {
		this.setState({ pageView });
	}

	addNewRoute(newRoute) {
		if (!newRoute) return;

		// include only cleaned json_data and form_data
		const { json_data_user, form_data_user, ...relevantData } = newRoute;
		relevantData.id = uuid.v4();

		const routesList = this.state.routes;
		routesList.push(relevantData);
		this.setState({ routes: routesList }, () => {
			socket.emit('appJsonData', JSON.stringify(this.state));
		});
	}

	deleteRoute(id) {
		const newRoutesList = this.state.routes.filter(route => {
			if (route.key === id) return false;
			return true;
		});

		this.setState({ routes: newRoutesList }, () => {
			socket.emit('appJsonData', JSON.stringify(this.state));
		});
	}

	render() {
		return (
			<div className='h-full flex flex-col'>
				<Navbar connectionStatus={this.state.connectionStatus} />
				<div className='flex items-start flex-1'>
					<div className='flex-1'>
						{this.state.pageView.toLowerCase() === 'overview' ? (
							<OverviewPage />
						) : (
							<RoutesPage
								addNewRoute={this.addNewRoute}
								routesList={this.state.routes}
							/>
						)}
					</div>
					<SideBar onChangePageView={this.onChangePageView} />
				</div>
			</div>
		);
	}
}

export default App;
