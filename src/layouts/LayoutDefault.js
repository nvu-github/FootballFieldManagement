import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loader from '../components/elements/LoadPage';
import  { ReactNotifications }  from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import '../assets/style/page.scss';
import {connect} from 'react-redux';

const LayoutDefault = ({ children }) => {
    const valueRouter = children.props.location.pathname;
    return (
        <>
            <ReactNotifications />
            {valueRouter !== '/login'
            ? <Header navPosition="right" className="reveal-from-bottom" />
            : ''
            }
            <main className="site-content">
                {children}
            </main>
            {valueRouter !== '/login' && <Footer />}
            <Loader />
        </>
  )
};

const mapStateToProps = state =>{
    return {
        userLogin: state.userLogin.userInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutDefault);  