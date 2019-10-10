import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
 
import Header from '../components/Header';
import Login from '../components/Login'; 
import Dashboard from '../components/Dashboard'; 

export default class Routes extends React.Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
                  <Scene key="header" component={Header} title="Header"/>
                  <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
			    </Stack>
			 </Router>
			)
	}
}