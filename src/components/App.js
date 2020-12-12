import '../styles/App.css';
import Navbar from './Navbar.js';
import SideBar from './Sidebar.js';
import RoutesPage from './RoutesPage.js';
import OverviewPage from './OverviewPage.js';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
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
							<Route exact path='/bverview'>
								<OverviewPage />
							</Route>
							<Route exact path='/routes'>
								<RoutesPage />
							</Route>
						</Switch>
					</BrowserRouter>
				</div>
				<SideBar />
			</div>
		</div>
	);
}

export default App;
