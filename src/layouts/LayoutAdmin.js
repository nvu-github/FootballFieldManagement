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

var ps;

const LayoutAdmin = (props) => {

    // const [backgroundColor] = useState("black");
    // const [activeColor] = useState("info");
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
            <div className="wrapper">
                {/* <Sidebar
                    {...props}
                    routes={routes}
                    bgColor={backgroundColor}
                    activeColor={activeColor}
                /> */}
                <Header routes={routes} />
                <div className="main-panel" ref={mainPanel}>
                    {/* <DemoNavbar {...props} /> */}
                    {props.children}
                    {/* {routes.map((prop, key) => {
                        return (
                            <Route
                                path={prop.layout + prop.path}
                                component={prop.component}
                                key={key}
                            />
                        );
                    })} */}
                    <Footer fluid />
                </div>
                <Loader />
            </div>
        </>
    );
}

export default LayoutAdmin;
