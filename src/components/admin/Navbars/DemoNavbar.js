import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import routes from "../../../routes";
import * as actions from "../../../store/actions";

const Header = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [color, setColor] = React.useState("transparent");
    const sidebarToggle = React.useRef();
    const location = useLocation();
    const history = useHistory();
    const toggle = () => {
        if (isOpen) {
        setColor("transparent");
        } else {
        setColor("dark");
        }
        setIsOpen(!isOpen);
    };
    const dropdownToggle = (e) => {
        setDropdownOpen(!dropdownOpen);
    };
    const getBrand = () => {
        const locationPath = props.children.props.location.pathname;
        let brandName = "";
        routes.map((prop, key) => {
        // if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // }
        if (locationPath === (prop.layout + prop.path)) {
            brandName = prop.name;
        }
        return null;
        });
        return brandName;
    };
    const openSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
        sidebarToggle.current.classList.toggle("toggled");
    };
    // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
    const updateColor = () => {
        if (window.innerWidth < 993 && isOpen) {
        setColor("dark");
        } else {
        setColor("transparent");
        }
    };
    React.useEffect(() => {
        window.addEventListener("resize", updateColor.bind(this));
    });
    React.useEffect(() => {
        if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
        ) {
        document.documentElement.classList.toggle("nav-open");
        sidebarToggle.current.classList.toggle("toggled");
        }
    }, [location]);

    const signout = async () => {
        props.userLogout();
        history.push("/login");
    }

    return (
        // add or remove classes depending if we are on full-screen-maps page or not
        <Navbar
        color={
            props.children.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : color
        }
        expand="lg"
        className={
            props.children.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
                (color === "transparent" ? "navbar-transparent " : "")
        }
        >
        <Container fluid>
            <div className="navbar-wrapper">
            <div className="navbar-toggle">
                <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
                >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
                </button>
            </div>
            <NavbarBrand href="/">{getBrand()}</NavbarBrand>
            </div>
            <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar className="justify-content-end">
            <form>
                <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                </InputGroupAddon>
                </InputGroup>
            </form>
            <Nav navbar>
                <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={(e) => dropdownToggle(e)}
                >
                <DropdownToggle caret nav>
                <i className="far fa-bell"></i>
                    <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                    </p>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem style={{ cursor: "pointer" }} tag="a"><i className="fas fa-exchange-alt"></i> Change password</DropdownItem>
                    <DropdownItem style={{ cursor: "pointer" }} onClick={() => {signout()}} tag="a"> <i className="fas fa-sign-out-alt"></i> Logout</DropdownItem>
                </DropdownMenu>
                </Dropdown>
            </Nav>
            </Collapse>
        </Container>
        </Navbar>
    );
}

const mapStateToProps = state =>{
    return {
        isLogin: state.userLogin.isLogin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(actions.LogoutUser()),
        showLoad: () => dispatch(actions.showLoader()),
        hideLoad: () => dispatch(actions.hideLoader()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
