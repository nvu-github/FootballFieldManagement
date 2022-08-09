import React from 'react';
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
            <Dropdown className='dropdownLogin' isOpen={dropdownOpen} group toggle={dropdownToggle}>
                <DropdownToggle className='dropdownToggleLogin' caret>
                <i className="fas fa-user"></i>
                </DropdownToggle>
                <DropdownMenu right>
                { isLogin
                ? (
                <>
                    <DropdownItem disabled>Xin chào, <span className='font-weight-bold'>{(props.dataLogin.userInfo) ? props.dataLogin.userInfo.username  : ''}</span></DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem style={{ cursor: "pointer" }}><i className="fas fa-exchange-alt"></i> Đổi mật khẩu</DropdownItem>
                    <DropdownItem style={{ cursor: "pointer" }} onClick={() => {signout()}}><i className="fas fa-sign-out-alt"></i> Đăng xuất</DropdownItem>
                </>
                )
                : (
                <>
                    <Link style={{color: 'black'}} to="/login"><DropdownItem style={{ cursor: "pointer" }} onClick={() => {signout()}}><i className="fas fa-sign-in-alt"></i> Đăng nhập</DropdownItem></Link>
                </>
                ) 
            }
            </DropdownMenu>
            </Dropdown>
                
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