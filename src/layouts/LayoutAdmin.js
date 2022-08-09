import React, { useRef, useEffect} from "react";
// import PerfectScrollbar from "perfect-scrollbar";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import DemoNavbar from "../components/admin/Navbars/DemoNavbar";
import Footer from "../components/admin/Footer/Footer";
import Sidebar from "../components/admin/Sidebar/Sidebar";
// import FixedPlugin from "../components/admin/FixedPlugin/FixedPlugin";

import { routes } from "../routes";
// var ps;

const LayoutAdmin = (props) => {
    const mainPanel = useRef();
    const location = useLocation();
    const routesSystem = routes;
    const noRoutes = ['/login', '/notfound', '/register'];

    const styleAdmin = {
        position: "relative",
        float: "right",
        width: "calc(100% - 260px)",
        backgroundColor: "#f4f3ef"
    }

    useEffect(() => {
        mainPanel.current.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);
    
    return (
        <>
            <div style={(noRoutes.includes(location.pathname)) ? {backgroundColor: 'white'} : {backgroundColor: '#f4f3ef'}} className="wrapper">
                {!noRoutes.includes(location.pathname)
                ? <Sidebar routes={routesSystem} {...props} />
                : '' }
                <div style={(noRoutes.includes(location.pathname)) ? {backgroundColor: 'white'} : styleAdmin} className="main-panel" ref={mainPanel}>
                    {/* <div style={(noRoutes.includes(location.pathname)) ? {marginTop: 0} : {marginTop: '130px'}} className="container container-main"> */}
                    <DemoNavbar {...props} />
                    {props.children}
                    {/* </div> */}
                {!noRoutes.includes(location.pathname)
                ? <Footer fluid />
                : ''}
                </div>
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
