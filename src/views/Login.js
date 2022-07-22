import React, { useState } from 'react';
import '../assets/style/Login.scss'
import LoginService from '../service/LoginService';
import { useHistory  } from "react-router-dom";
import toastConfig from '../config/toastConfig';
import { connect } from 'react-redux';
import * as actions from "../store/actions";

const Login = (props) => {

    const [getusername, setUsername] = useState('');
    const [getpassword, setPassword] = useState('');
    const history = useHistory();

    const handleOnchangeInput = (event) => {
        if (event.target.name === 'username'){
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleLogin = async () => {  
        try {
            props.showLoad();
            const username = getusername;
            const password = getpassword; 
            if (username === '' || password === '') {
                props.hideLoad();
                toastConfig('Error', 'Username or password is NULL!');
                return;
            }
            const data = await LoginService.handleLogin(username, password);
            if (data.data.dataloginStatus === 'success') {
                props.userLoginSuccess(data.data.user);
                props.hideLoad();
                toastConfig('Success', 'Login success!');
                return history.push("/");
            } else if (data.data.dataloginStatus === 'errpassword') {
                props.hideLoad();
                toastConfig('Error', 'Password incorrect!');
                return;
            } else {
                props.hideLoad();
                toastConfig('Error', 'Account not exists!');
                return;
            }
        } catch(e) {
            console.log(e);
        }
    }

    const OtherMethods = props => (
        <div id="alternativeLogin">
            <label>Or sign in with:</label>
            <div id="iconGroup">
            <Facebook />
            <Google />
            </div>
        </div>
    );

    const Facebook = props => (
        <i className="fab fa-facebook-f iconfacebook"></i>
      );
      
    const Google = props => (
        <i className="fab fa-google-plus-g icongoogle"></i>
    );

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    return (
        <>
            <div className='login-container'>
                <div id="loginform">
                    <FormHeader title="Login" />
                    <form method='post' action=''>
                        <div className="rowinp">
                            <label>Username</label>
                            <input type='text' 
                            name='username' 
                            value={getusername} 
                            onChange={(event) => handleOnchangeInput(event)} 
                            placeholder='Enter your username'/>
                        </div>
                        <div className="rowinp">
                            <label>Password</label>
                            <input type='password' 
                            name='password' 
                            value={getpassword} 
                            onChange={(event) => handleOnchangeInput(event)}
                            placeholder='Enter your password'/>
                        </div>
                        <div id="button" className="rowinp">
                            <button type='button' onClick={event => {handleLogin(event)}} name='sublogin'>Log in</button>
                        </div>
                        <OtherMethods />
                    </form>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state =>({
    isLogin: state.userLogin.isLogin
});

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.LoginUser(userInfo)),
        showLoad: () => dispatch(actions.showLoader()),
        hideLoad: () => dispatch(actions.hideLoader()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);