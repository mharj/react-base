import React from 'react'; // eslint-disable-line no-unused-vars
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...routeProps}) => (
	<Route
		{...routeProps}
		render={(props) => {
			return routeProps.isValid ? <Component {...props} /> : <Redirect to={routeProps.failPath?routeProps.failPath:'/'} />;
		}}
	/>
);
export default PrivateRoute;
