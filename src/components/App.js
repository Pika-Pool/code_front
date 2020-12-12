import '../styles/App.css';
import Navbar from './Navbar.js';
import SideBar from './Sidebar.js';
import RoutesPage from './RoutesPage.js';
import OverviewPage from './OverviewPage.js';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { routes: [] };

		this.addNewRoute = this.addNewRoute.bind(this);
	}

	addNewRoute(newRoute) {
		const routesList = this.state.routes;
		routesList.push(newRoute);
		this.setState({ routes: routesList });
	}

	render() {
		return (
			<div className='h-full flex flex-col'>
				<Navbar connectionStatus={true} />
				<div className='flex items-start flex-1'>
					<div className='flex-1'>
						<BrowserRouter>
							<Switch>
								<Route exact path='/'>
									<OverviewPage />
								</Route>
								<Route exact path='/overview'>
									<OverviewPage />
								</Route>
								<Route exact path='/routes'>
									<RoutesPage
										addNewRoute={this.addNewRoute}
										routesList={this.state.routes}
									/>
								</Route>
							</Switch>
						</BrowserRouter>
					</div>
					<SideBar />
				</div>
			</div>
		);
	}
}

export default App;
