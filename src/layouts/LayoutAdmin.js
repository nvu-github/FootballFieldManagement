import React, { useRef, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { useLocation } from "react-router-dom";

// import DemoNavbar from "../components/admin/Navbars/DemoNavbar";
import Footer from "../components/admin/Footer/Footer";
// import Sidebar from "../components/admin/Sidebar/Sidebar";
// import FixedPlugin from "../components/admin/FixedPlugin/FixedPlugin";
import Header from "../components/layout/Header";

import routes from "../routes";
import  { ReactNotifications }  from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Loader from '../components/elements/LoadPage';
import { connect } from "react-redux";

var ps;

const LayoutAdmin = (props) => {
    const mainPanel = useRef();
    const location = useLocation();

    useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current);
            document.body.classList.toggle("perfect-scrollbar-on");
        }
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                document.body.classList.toggle("perfect-scrollbar-on");
            }
            };
    }, []);

    useEffect(() => {
        mainPanel.current.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);

    return (
        <>
            <ReactNotifications />
            <div style={(!props.isLogin) ? {backgroundColor: 'white'} : {backgroundColor: '#f4f3ef'}} className="wrapper">
                {(location.pathname !== '/notfound' && location.pathname !== '/login' && location.pathname !== '/register')
                ? <Header routes={routes} />
                : '' }
                <div style={(!props.isLogin) ? {backgroundColor: 'white'} : {backgroundColor: '#f4f3ef'}} className="main-panel" ref={mainPanel}>
                    {props.children}
                {(location.pathname !== '/notfound' && location.pathname !== '/login' && location.pathname !== '/register')
                ? <Footer fluid />
                : ''}
                </div>
                <Loader />
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.userLogin.isLogin
    }
};

export default connect(mapStateToProps, null)(LayoutAdmin);
