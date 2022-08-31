import React, {useState} from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../store/actions";

const DropdownUser = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory();

    const dropdownToggle = (e) => {
        setDropdownOpen(!dropdownOpen);
    };

    const signout = async () => {
        props.userLogout();
        history.push("/login");
    }

    return (
        <>
            <Dropdown
            nav
            isOpen={dropdownOpen}
            toggle={(e) => dropdownToggle(e)}
            >
                <DropdownToggle caret nav>
                {/* <i className="far fa-bell"></i> */}
                    <i style={{ color: "black" }} className="fas fa-user-cog"></i>
                    <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                    </p>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a"><i className="fas fa-exchange-alt"></i> Change password</DropdownItem>
                    <DropdownItem onClick={() => {signout()}} tag="a"> <i className="fas fa-sign-out-alt"></i> Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownUser);