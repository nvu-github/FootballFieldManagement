import React from 'react';
// import classNames from 'classnames';
// import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import { useHistory, Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "reactstrap";

const MenuLogin = (props) => {

    const { isLogin, userLogout} = props;
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const history = useHistory();

    const signout = async () => {
        userLogout();
        localStorage.removeItem('token');
        history.push("/login");
    }

    const dropdownToggle = (e) => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            {/* <ul className="list-reset header-nav-right">
                <li>
                    {!isLogin 
                    ? <Link to="/login" className="button button-primary button-wide-mobile button-sm">Sign in</Link>
                    : <button className="button button-primary button-wide-mobile button-sm" onClick={ () => {signout()}}>Sign out</button>
                    }
                </li>
            </ul> */}
            {/* <Dropdown 
                className='dropdownLogin'
                nav
                isOpen={dropdownOpen}
                toggle={(e) => dropdownToggle(e)}
                >
                <DropdownToggle className='dropdownToggleLogin' caret nav>
                    <p>
                    <i className="far fa-bell"></i>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                    </p>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem style={{ cursor: "pointer" }} tag="a"><i className="fas fa-exchange-alt"></i> Change password</DropdownItem>
                    <DropdownItem style={{ cursor: "pointer" }} onClick={() => {signout()}} tag="a"> <i className="fas fa-sign-out-alt"></i> Logout</DropdownItem>
                </DropdownMenu>
                </Dropdown> */}
            { isLogin
                ? (
                    <Dropdown className='dropdownLogin' isOpen={dropdownOpen} group toggle={dropdownToggle}>
                        <DropdownToggle className='dropdownToggleLogin' nav caret>
                        <i className="fas fa-user"></i> Hello, {(props.dataLogin.userInfo) ? props.dataLogin.userInfo.username  : ''}
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem style={{ cursor: "pointer" }}><i className="fas fa-exchange-alt"></i> Change password</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem style={{ cursor: "pointer" }} onClick={() => {signout()}}><i className="fas fa-sign-out-alt"></i> Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
                : <Link to="/login" style={{color: 'black', fontSize: '16px'}}><i className="fas fa-user"></i> Sign in</Link>
            }
            
                
        </>
    );
}

const mapStateToProps = state =>{
    return {
        isLogin: state.userLogin.isLogin,
        dataLogin: state.userLogin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => dispatch(actions.LogoutUser()),
        showLoad: () => dispatch(actions.showLoader()),
        hideLoad: () => dispatch(actions.hideLoader()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLogin);