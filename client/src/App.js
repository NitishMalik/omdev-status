import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddTask from './components/tasks/AddTask';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/NotFound';
import Post from './components/post/Post';

//Check for token
if (localStorage.jwtToken) {
	//Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	//decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	//Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	//check for expired token
	const currentToken = Date.now() / 1000;
	if (decoded.exp < currentToken) {
		//Logout user
		store.dispatch(logoutUser());
		//TODO: clear current profile
		store.dispatch(clearCurrentProfile());

		//Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />

						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							{/*TODO : Check if switch case is needed here. Testing needed */}
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-Task" component={AddTask} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/feed" component={Posts} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
						</div>
						<Footer />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
