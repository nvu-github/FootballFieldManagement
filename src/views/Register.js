import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';
import toastConfig from '../config/toastConfig';
import LoginService from '../service/LoginService';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

const SignUp = (props) => {
    const theme = createTheme();
    const history = useHistory();
    const [username, setUsername]       = useState('');
    const [password, setPassword]       = useState('');
    const [nameUser, setNameUser]     = useState('');
    // const [lastName, setLastName]       = useState('');
    const [rePassword, setRePassword]   = useState('');

    useEffect(() => {
        document.title = 'Register';
    });

    const handleOnchangeInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        if (nameInput === 'nameUser') {
            setNameUser(value);
        } else if (nameInput === 'username') {
            setUsername(value);
        } else if (nameInput === 'password') {
            setPassword(value);
        } else {
            setRePassword(value);
        }
    }

    const handleOnSubmitInput = async (e) => {
        e.preventDefault();
        try {
            props.showLoad();
            if (nameUser === '' || username === '' || password === '' || rePassword === '') {
                toastConfig('Error', 'Vui lòng nhập đầy đủ thông tin đăng ký!');
                return;
            } 
            if (password !== rePassword) {
                toastConfig('Error', 'Mật khẩu không trùng khớp!');
                return;
            }
            const dataRegister = {
                nameUser,
                username,
                password
            }   
            const ResRegister = await LoginService.handleRegister(dataRegister);

            if (ResRegister.data.Mess === 'Success') {
                props.hideLoad();
                toastConfig('Success', 'Đăng ký tài khoản thành công');
                return history.push('/login');
            } else if (ResRegister.data.Mess === 'Exists') {
                props.hideLoad();
                toastConfig('Error', 'Tên đăng nhập đã tồn tại');
                return;
            } else {
                props.hideLoad();
                toastConfig('Error', 'Đăng ký tài khoản thất bại');
                return;
            }
        } catch(e) {
            console.log(e);
        }
        
    }

    return (
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
                Đăng ký
            </Typography>
            <Box component="form" onSubmit={handleOnSubmitInput} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    onChange={handleOnchangeInput}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    onChange={handleOnchangeInput}
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="nameUser"
                    onChange={handleOnchangeInput}
                    label="Họ tên"
                    name="nameUser"
                    autoComplete="nameUser"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    onChange={handleOnchangeInput}
                    label="Tên đăng nhập"
                    name="username"
                    autoComplete="username"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    onChange={handleOnchangeInput}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="re-password"
                    label="Nhập lại mật khẩu"
                    onChange={handleOnchangeInput}
                    type="password"
                    id="re-password"
                    autoComplete="re-new-password"
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid> */}
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    {/* <Link style={{color : 'black'}} href="#" variant="body2">
                    Already have an account? Sign in
                    </Link> */}
                    <Link style={{color : 'black'}} to="/login" className='MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-101ca9i-MuiTypography-root-MuiLink-root'> Đã có tài khoản? Đăng nhập</Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}

const mapStateToProps = state =>({
});

const mapDispatchToProps = dispatch => {
    return {
        showLoad: () => dispatch(actions.showLoader()),
        hideLoad: () => dispatch(actions.hideLoader()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);