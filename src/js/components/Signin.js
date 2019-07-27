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

import { createBrowserHistory } from 'history'

import { connect } from 'react-redux';

const history = createBrowserHistory()

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
          handleEmailAddress : (e) => {
            if(e.target.value !== null){
                var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var Email = e.target.value;
                if(!regEmail.test(Email)){
                    this.setState({
                        validateEmail : "error",
                        user_email : e.target.value
                    })

                }else{
                    this.setState({
                        validateEmail : null,
                        user_email : e.target.value
                    })
                }
            } else {
                this.setSate({
                    validateEmail : "error",
                    user_email : e.target.value
                })
            }
          },
          handlePassword : (e) => {
              this.setState({
                  user_password : e.target.value
              })
          },
          handleRequest : (obj) => {
            //alert('fetch');
            //console.log(obj);
            fetch('http://localhost:3005/Signin', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then(function(response) {
                    //console.log(response);
                    alert(response.status);
                    return response.status
                    
                }).catch((err) => {
                    console.log(err);
                })
          },
          handleSubmit : (e) => {
            e.preventDefault();
            //alert('prateek'); 
            if(this.state.user_email !== '' && this.state.user_password !== ''){
              if(this.state.validateEmail === null){

                let obj = {
                  user_email : this.state.user_email,
                  user_password : this.state.user_password,                 
                  }
                  //alert('handleRequest');
                  //console.log(obj);
                  new Promise((resolve) => {
                          resolve(this.state.handleRequest(obj));
                          
                      }).then((resolve) => {
                        alert(resolve);
                          if(resolve === 200){
                              history.push('/Home')
                          }
                      }).catch((err) => {
                          console.log(err);
                      })
              }
            }
          }
        }
      }

      render(){
        return (
            <SigninForm value = {this.state} />
        )

      }
}

function SigninForm(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.value.handleSubmit}>
          {(props.value.validateEmail === 'error')?(<TextField
            error
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
           {(props.value.validateEmail === 'error')?(<TextField
            error
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
              <Link href="#" variant="body2">
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
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}

//const Signin = connect(mapDispatchToProps)(SignupClass)

export default SigninClass;