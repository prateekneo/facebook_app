import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom'
import { saveToken } from "../actions/index"


import { createBrowserHistory } from 'history'

import { connect } from 'react-redux';

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
    marginBottom: theme.spacing(12),
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

class SigninClass extends React.Component {
      constructor(props){
        super(props);
        this.state ={
          user_email : '',
          user_password : '',
          validateEmail : null,
          validatePassword : null,
          message : '',
          redirect : 0,
          handleEmailAddress : (e) => {
            if(e.target.value !== null){
                var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var Email = e.target.value;
                if(!regEmail.test(Email)){
                    this.setState({
                        validateEmail : "error",
                        user_email : e.target.value,
                        message : ''
                    })

                }else{
                    this.setState({
                        validateEmail : null,
                        user_email : e.target.value,
                        message : ''
                    })
                }
            } else {
                this.setSate({
                    validateEmail : "error",
                    user_email : e.target.value,
                    message : ''
                })
            }
          },
          handlePassword : (e) => {
            if(e.target.value.length >= 8){
              this.setState({
                  validatePassword : null,
                  user_password : e.target.value,
                  message : ''
              })
            } else {
              this.setState({
                  validatePassword : "error",
                  user_password : e.target.value,
                  message : ''
              })
            }
          },
          handleSubmit : (e) => {
            e.preventDefault(); 
            if(this.state.user_email !== '' && this.state.user_password !== ''){
              if(this.state.validateEmail === null){

                let obj = {
                  user_email : this.state.user_email,
                  user_password : this.state.user_password,                 
                }

                fetch('http://localhost:3005/Signin', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(obj)
                }).then((response) => {
                    //console.log(response);
                    //alert(response.status);
                    if(response.status === 200){
                      response.json().then( json => {
                          if(json.message === 'Login Successful'){
                            this.setState({
                              message : json.message
                            })
                            console.log(json);
                            let object = {
                              userid : json.userid,
                              token : json.token,
                              isAuth : json.isAuth
                            }
                            sessionStorage.setItem("user", JSON.stringify(object));
                            //this.props.saveToken(json)
                            this.setState({
                              redirect : 1
                            })
                          } else if(json.message === 'Your Email is not Verified' ) {
                            this.setState({
                              message : json.message
                            })
                            history.push('/EnterOtp/'+json.userid)
                          } else {
                            this.setState({
                              message : json.message
                            })
                          }
                      })
                        
                    } else {
                      response.json().then( json => {
                          this.setState({
                            message : json.message
                          })
                      })
                    }
                    
                }).catch((err) => {
                    console.log(err);
                })
              }
            } else {
              this.setState({
                validateEmail : "error",
                validatePassword : "error"
              })
            }
          }
        }
      }

      render(){
        return (
            (this.state.redirect === 0)?<SigninForm value = {this.state} />:<Redirect to={'/Home'} />
        )

      }
}



function SigninForm(props) {
  const classes = useStyles();

  return (
    <div>
    <div className ={classes.head}>
      </div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
        <Grid container>
            <Grid item>
              {(props.value.message !== '')? <Box textAlign="center" bgcolor="#b71c1c" color="error.contrastText" p={1} m={1} style={{ width: '20rem'}}>
                {props.value.message}
              </Box>:<Box textAlign="center" p={1} m={1} bgcolor="#fafafa" color="error.contrastText" style={{ width: '20rem'}}>Wrong Password</Box>}
                
            </Grid>
        </Grid>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.value.handleSubmit}>
          {(props.value.validateEmail === 'error')?(<TextField
            error
            helperText="Enter Correct Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value = {props.value.user_email}
            onChange={props.value.handleEmailAddress}
            autoComplete="email"
            autoFocus
          />):(<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value = {props.value.user_email}
            onChange={props.value.handleEmailAddress}
            autoComplete="email"
            autoFocus
          />)}
           {(props.value.validatePassword === 'error')?(<TextField
            error
            helperText="Password can be 8 or more than 8 characters"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value = {props.value.user_password}
            onChange={props.value.handlePassword}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            />):(<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value = {props.value.user_password}
              onChange={props.value.handlePassword}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              />)}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => history.push('/ForgotPassword')}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => history.push('/Signup')}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      
      </div>
    </Container>
    <div className ={classes.foot} ></div>
  </div>
  );
}



//const Signin = connect(null, mapDispatchToProps)(SigninClass)

export default SigninClass;