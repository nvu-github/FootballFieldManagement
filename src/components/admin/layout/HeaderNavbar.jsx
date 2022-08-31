import React, {useState, useRef, useEffect} from "react";
// import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
//   NavbarBrand,
  Nav,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
  Container,
//   InputGroup,
//   InputGroupText,
//   InputGroupAddon,
//   Input,
} from "reactstrap";
import { routes } from "../../../routes";
import Notification from "../elements/Notification";
import DropdownUser from "../elements/DropDownUser";

const HeaderNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("transparent");
    const sidebarToggle = useRef();
    const location = useLocation();

    const toggle = () => {
        if (isOpen) {
            setColor("transparent");
        } else {
            setColor("dark");
        }
        setIsOpen(!isOpen);
    };


    const getBrand = () => {
        const locationPath = props.children.props.location.pathname;
        let brandName = "";
        routes.map((prop, key) => {
        // if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        // }
        if (locationPath === (prop.path)) {
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
    useEffect(() => {
        window.addEventListener("resize", updateColor.bind(this));
    });
    useEffect(() => {
        if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
        ) {
        document.documentElement.classList.toggle("nav-open");
        sidebarToggle.current.classList.toggle("toggled");
        }
    }, [location]);

    return (
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
                <Link to="/">{getBrand()}</Link>
            </div>
            <NavbarToggler onClick={toggle}>
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar className="justify-content-end">
            {/* <form>
                <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                </InputGroupAddon>
                </InputGroup>
            </form> */}
                <Nav navbar>
                    <Notification />
                    <DropdownUser />
                </Nav>
            </Collapse>
        </Container>
        </Navbar>
    );
}

export default HeaderNavbar;
