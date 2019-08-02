import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    head : {
        padding : theme.spacing(4),
        backgroundColor: '#c51162'
      },
    foot : {
    padding : theme.spacing(4),
    backgroundColor: '#c51162'
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(27),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

class ForgotPassword extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userid : '',
            email : '',
            otp : null,
            password : '',
            reenter_password : '',
            show_emailForm : 1,
            show_otpForm : 0,
            show_newPasswordForm : 0,
            validateEmail : null,
            validateOtp : null,
            validatePassword : null,
            validateReenterPassword : null,
            message : ''
        }
    }

    handleEmail = (e) => {
        if(e.target.value !== null){
            let regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let Email = e.target.value;
            if(!regEmail.test(Email)){
                this.setState({
                    validateEmail : "error",
                    email : e.target.value,
                    message : ''
                })

            }else{
                this.setState({
                    validateEmail : null,
                    email : e.target.value,
                    message : ''
                })
            }
        } else {
            this.setSate({
                validateEmail : "error",
                email : e.target.value,
                message : ''
            })
        }
      }

    handlePassword = (e) => {
        if(e.target.value.length >= 8){
            this.setState({
                password : e.target.value,
                validatePassword : null,
                message : ''
            })
        } else {
            this.setState({
                password : e.target.value,
                validatePassword : "error",
                message : ''
            })
        }
    }

    handleReenterPassword = (e) => {
        if(e.target.value.length >= 8){
            this.setState({
                reenter_password : e.target.value,
                validateReenterPassword : null,
                message : ''
            })
        } else {
            this.setState({
                reenter_password : e.target.value,
                validateReenterPassword : "error",
                message : ''
            })
        }

    }

    handlePasswordSubmit = (e) => {

        e.preventDefault();
        if(this.state.password !== '' && this.state.reenter_password !== ''){
            if(this.state.validatePassword === null && this.state.validateReenterPassword === null){
                if(this.state.password === this.state.reenter_password){

                    let obj ={
                        user_registration_id : this.state.userid,
                        user_password : this.state.password 
                    }

                    fetch('http://localhost:3005/SaveNewPassword', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(obj)
                    }).then((response) => {
                        response.json().then(json => {
                            this.setState({
                                message : json.message,
                                redirect : 1
                            })
                        }).catch(err => console.log(err))

                    }).catch((err) => {
                        console.log(err);
                    })  

                } else {
                    this.setState({
                        message : "Passwords do not match"
                    })
                }
            } else {
                this.setState({
                    message : "Enter 8 or more than 8 characters"
                })
            }
        } else {
            this.setState({
                message : "Enter 8 or more than 8 characters"
            })
        }

    }

    handleOtp = (e) => {
        this.setState({
            otp : e.target.value,
            message : ''
        })
    }

    handleEmailSubmit = (e) => {
        e.preventDefault();
        if(this.state.email !== '' && this.state.validateEmail === null){
            let obj = {
                user_email : this.state.email
            }

            fetch('http://localhost:3005/ForgotPassword', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then((response) => {
                    if(response.status === 200){
                        response.json().then(json => {
                            this.setState({
                                show_emailForm : 0,
                                show_otpForm : 1,
                                show_newPasswordForm : 0,
                                message : json.message
                            })
                        }).catch(err => console.log(err))
                    } else {
                        response.json().then(json => {
                            this.setState({
                                message : json.message
                            })
                        }).catch(err => console.log(err))
                    }
                    
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            this.setState({
                validateEmail : "error"
            })
        }

    }

    handleOtpSubmit = (e) => {

        e.preventDefault();
        if(this.state.otp !== ''){
            let obj = {
                user_email : this.state.email,
                otp_requested : this.state.otp
            }

            fetch('http://localhost:3005/ForgotPasswordCheckOtp', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then((response) => {
                    if(response.status === 200){
                        
                        response.json().then( json => {
                            this.setState({
                                userid : json.userid,
                                show_emailForm : 0,
                                show_otpForm : 0,
                                show_newPasswordForm : 1,
                                message : json.message
                            })
                        }).catch(err => console.log(err))
                        
                    } else {
                        response.json().then( json => {
                            this.setState({
                                userid : json.userid,
                                show_emailForm : 0,
                                show_otpForm : 1,
                                show_newPasswordForm : 0,
                                message : json.message
                            })
                        }).catch(err => console.log(err))
                    }
                    
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            this.setState({
                validateOtp : "error",
                message : "Please Enter Otp"
            })
        }

    }

    render(){
        return (
        (this.state.redirect)?<Redirect to={'/Signin'}/>:((this.state.show_emailForm === 1 && this.state.show_otpForm ===0 && this.state.show_newPasswordForm === 0)?<EnterEmailForm value={this.state} handleEmail={this.handleEmail} handleEmailSubmit={this.handleEmailSubmit} />:((this.state.show_emailForm === 0 && this.state.show_otpForm ===1 && this.state.show_newPasswordForm === 0)?<EnterOtpForm value={this.state} handleOtp = {this.handleOtp}  handleOtpSubmit={this.handleOtpSubmit} />:<EnterNewPassoword value={this.state} handlePassword = {this.handlePassword}  handlePasswordSubmit={this.handlePasswordSubmit}  handleReenterPassword={this.handleReenterPassword} />))
        )
    }
}

function EnterEmailForm(props) {
    const classes = useStyles();

    return (
    <div>
    <div className ={classes.head}>
        </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Grid container>
                <Grid item>
                {(props.value.message !== '')? <Box textAlign="center" bgcolor="error.main" color="error.contrastText" p={1} m={1} style={{ width: '20rem'}}>
                    {props.value.message}
                </Box>:<Box textAlign="center" p={1} m={1} color="error.contrastText" style={{ width: '20rem'}}>{props.value.message}</Box>}
                    
                </Grid>
            </Grid>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={props.handleEmailSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            error = {props.value.validateEmail === "error"}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            value = {props.value.email}
                            onChange={props.handleEmail}
                            label="Enter Email"
                            type="email"
                            id="email"
                            autoComplete="current-email"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Submit
                </Button>
                <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2" onClick={() => history.push('/Signin')}>
                                Go to Login
                            </Link>
                            </Grid>
                        </Grid>
          </form>
      </div>
    </Container>
    <div className ={classes.foot}></div>
  </div>)
}

function EnterOtpForm(props) {
    const classes = useStyles();

    return (
    <div>
    <div className ={classes.head}>
        </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <Grid container>
                <Grid item>
                {(props.value.message !== '')? <Box textAlign="center" bgcolor="error.main" color="error.contrastText" p={1} m={1} style={{ width: '20rem'}}>
                    {props.value.message}
                </Box>:<Box textAlign="center" p={1} m={1} color="error.contrastText" style={{ width: '20rem'}}>{props.value.message}</Box>}
                    
                </Grid>
            </Grid>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            OTP
          </Typography>
          <form className={classes.form} noValidate onSubmit={props.handleOtpSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                                error = {props.value.validateOtp === "error"}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="otp"
                                value = {props.value.otp}
                                onChange={props.handleOtp}
                                label="Enter Otp"
                                type="otp"
                                id="otp"
                                autoComplete="current-otp"
                            />
                        </Grid>
                    </Grid>
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                    </Button>
                    <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2" onClick={() => history.push('/Signin')}>
                                Go to Login
                            </Link>
                            </Grid>
                        </Grid>
          </form>
      </div>
    </Container>
    <div className ={classes.foot}></div>
    </div>
    )
}

function EnterNewPassoword (props) {
    const classes = useStyles();

    return (
    <div>
    <div className ={classes.head}>
        </div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Grid container>
                    <Grid item>
                    {(props.value.message !== '')? <Box textAlign="center" bgcolor="error.main" color="error.contrastText" p={1} m={1} style={{ width: '20rem'}}>
                        {props.value.message}
                    </Box>:<Box textAlign="center" p={1} m={1} color="error.contrastText" style={{ width: '20rem'}}>{props.value.message}</Box>}
                        
                    </Grid>
                </Grid>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter New Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={props.handlePasswordSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                        error = {props.value.validatePassword === "error"}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value = {props.value.password}
                                        onChange={props.handlePassword}
                                        label="Enter New Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                        error = {props.value.validateReenterPassword === "error"}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value = {props.value.reenter_password}
                                        onChange={props.handleReenterPassword}
                                        label="Re-Enter New Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                            </Grid>
                        </Grid>
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2" onClick={() => history.push('/Signin')}>
                                Go to Login
                            </Link>
                            </Grid>
                        </Grid>
                </form>
            </div>
        </Container>
        <div className ={classes.foot}></div>
    </div>
    )   
}

export default ForgotPassword
