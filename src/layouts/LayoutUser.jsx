import React, { useRef, useEffect} from "react";
// import PerfectScrollbar from "perfect-scrollbar";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

// import DemoNavbar from "../components/admin/Navbars/DemoNavbar";
// import Footer from "../components/admin/Footer/Footer";
import Footer from '../components/layout/Footer';
// import Sidebar from "../components/admin/Sidebar/Sidebar";
// import FixedPlugin from "../components/admin/FixedPlugin/FixedPlugin";
import Header from "../components/layout/Header";
// import Sidebar from "../components/admin/Sidebar"
import IconChat from "../components/elements/IconChat";

import { routes } from "../routes";

// var ps;

const LayoutUser = (props) => {
    const mainPanel = useRef();
    const location = useLocation();
    const routesSystem = routes;
    const noRoutes = ['/login', '/notfound', '/register'];

    useEffect(() => {
        mainPanel.current.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);
    
    return (
        <>
            <div style={(noRoutes.includes(location.pathname)) ? {backgroundColor: 'white'} : {backgroundColor: '#f4f3ef'}} className="wrapper">
                {!noRoutes.includes(location.pathname)
                ? <Header routes={routesSystem} />
                : '' }
                <div style={(noRoutes.includes(location.pathname)) ? {backgroundColor: 'white'} : {backgroundColor: '#f4f3ef'}} className="main-panel" ref={mainPanel}>
                    <div style={(noRoutes.includes(location.pathname)) ? {marginTop: 0} : {marginTop: '120px'}} className="container container-main">
                    {props.children}
                    </div>
                {!noRoutes.includes(location.pathname)
                ? <Footer fluid />
                : ''}
                </div>
                <IconChat />
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.userLogin.isLogin
    }
};

export default connect(mapStateToProps, null)(LayoutUser);
