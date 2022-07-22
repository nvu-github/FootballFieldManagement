import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

const AppRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
    Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

    return (
        <Route
        {...rest}
        render={props => (
            <Layout>
            <Component {...props} />
            </Layout>
        )} />
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.userLogin.isLogin,
        dataLogin: state.userLogin
    }
};

const mapDispatchToProps = dispatch => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);