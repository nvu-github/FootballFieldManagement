import React, { useRef, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import HeaderNavbar from "../components/admin/layout/HeaderNavbar";
import Footer from "../components/admin/layout/Footer";
import Sidebar from "../components/admin/layout/Sidebar";

import { routes } from "../routes";

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
                    <HeaderNavbar {...props} />
                    <div className="content">
                    {props.children}
                    </div>
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
