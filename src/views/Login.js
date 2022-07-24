import React, { useEffect, useState } from 'react';
import LoginService from '../service/LoginService';
import { useHistory  } from "react-router-dom";
import toastConfig from '../config/toastConfig';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [getusername, setUsername] = useState('');
    const [getpassword, setPassword] = useState('');
    const [statusPassword, setStatusPassword] = useState(false);
    const history = useHistory();
    const theme = createTheme();

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const togglePassword = () => {
        setStatusPassword(!statusPassword);
    }

    const handleOnchangeInput = (event) => {
        if (event.target.name === 'username'){
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleLogin = async (e) => {  
        e.preventDefault();
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
                const dataReduxLogin = {
                    username: data.data.user.dataloginUsername,
                }
                const dataToken = {
                    accessToken: data.data.user.dataloginToken,
                    refreshToken: data.data.user.dataloginRefreshToken
                }
                props.userLoginSuccess(dataReduxLogin);
                localStorage.setItem('token', JSON.stringify(dataToken));
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

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <i className="fas fa-lock"></i> */}
                        <i className="fas fa-futbol"></i>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={getusername} 
                        onChange={(event) => handleOnchangeInput(event)} 
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={!statusPassword ? "password" : "text"}
                        id="password"
                        autoComplete="current-password"
                        value={getpassword} 
                        onChange={(event) => handleOnchangeInput(event)}
                        />
                        <FormControlLabel
                        control={<Checkbox onChange={togglePassword} value="showPassword" color="primary" />}
                        label="Show password"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                        </Button>
                        <Grid style={{ justifyContent: 'right' }} container>
                        {/* <Grid item xs>
                            <Link style={{pointerEvents: 'none', color: 'white'}} href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link style={{color : 'black'}} to="/register" className='MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-101ca9i-MuiTypography-root-MuiLink-root'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
                </ThemeProvider>
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