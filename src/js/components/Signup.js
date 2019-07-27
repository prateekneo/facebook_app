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
import { connect } from 'react-redux'
import loginUser from '../actions/index'

import { createBrowserHistory } from 'history';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class SignupClass extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            dob : 'mm/dd/yyyy',
            validateFirstName : null,
            validateLastName : null,
            validateEmail : null,
            validateDob : null,
            validatePassword : null,
            handleFirstName : (e) => {
                if(e.target.value !== null){
                    var regName = /^[a-zA-Z ]{1,100}$/;
                    var name = e.target.value;
                    if(!regName.test(name)){
                        this.setState({
                            validateFirstName : "error",
                            firstName : e.target.value
                        })

                    }else{
                        this.setState({
                            validateFirstName : null,
                            firstName : e.target.value
                        })
                    }
                } else {
                    this.setSate({
                        validateFirstName : "error",
                        firstName : e.target.value
                    })
                }
                        
            },
            handleLastName : (e) => {
                if(e.target.value !== null){
                    var regName = /^[a-zA-Z ]{1,100}$/;
                    var name = e.target.value;
                    if(!regName.test(name)){
                        this.setState({
                            validateLastName : "error",
                            lastName : e.target.value
                        })

                    }else{
                        this.setState({
                            validateLastName : null,
                            lastName : e.target.value
                        })
                    }
                } else {
                    this.setSate({
                        validateLastName : "error",
                        lastName : e.target.value
                    })
                }
        
            },
            handleEmailAddress : (e) => {
                if(e.target.value !== null){
                    var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var Email = e.target.value;
                    if(!regEmail.test(Email)){
                        this.setState({
                            validateEmail : "error",
                            email : e.target.value
                        })

                    }else{
                        this.setState({
                            validateEmail : null,
                            email : e.target.value
                        })
                    }
                } else {
                    this.setSate({
                        validateEmail : "error",
                        email : e.target.value
                    })
                }
            },
            handlePassword : (e) => {
                this.setState({
                    password : e.target.value
                })
            },
            handleDateChange : (e) => {
                this.setState({
                    validateDob : null,
                    dob : e.target.value
                })
            },
            handleRequest : (obj) => {
                //alert('fetch');
                console.log(obj);
                fetch('http://localhost:3005/Signup/create', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(obj)
                    }).then(function(response) {
                        console.log(response);
                        return response
                    }).catch((err) => {
                        console.log(err);
                    })
            },
            handleSubmit : (e) => {                
                        e.preventDefault();
                        if(this.state.firstName !== '' && this.state.lastName !== '' && this.state.email !== '' && this.state.dob !==  'mm/dd/yyyy'){
                            if(this.state.validateFirstName === null && this.state.validateLastName === null && this.state.validateEmail === null){
                                let obj = {
                                    first_name : this.state.firstName,
                                    last_name : this.state.lastName,
                                    user_email : this.state.email,
                                    user_password : this.state.password,
                                    dob : this.state.dob,
                                    email_verified_status : 0
                                    
                                }
                                //alert('handleRequest');
                                console.log(obj);
                                new Promise((resolve) => {
                                        let ret = this.state.handleRequest(obj);
                                        resolve(ret);
                                    }).then((resolve) => {
                                         //alert(resolve);
                                         this.setState({
                                            firstName : '',
                                            lastName : '',
                                            email : '',
                                            password : '',
                                            dob : 'mm/dd/yyyy',
                                            validateFirstName : null,
                                            validateLastName : null,
                                            validateEmail : null,
                                            validateDob : null,
                                            validatePassword : null
                                        })
                                    })
                            }
                        } else{
                            
                            if(this.state.firstName === ''){
                                this.setState({
                                    validateFirstName : 'error'
                                })
                            }
                            if(this.state.lastName === ''){
                                this.setState({
                                    validateLastName : 'error'
                                })
                            }
                            if(this.state.email === ''){
                                this.setState({
                                    validateEmail : 'error'
                                })
                            }
                            if(this.state.dob === 'mm/dd/yyyy'){
                                this.setState({
                                    validateDob : 'error'
                                })
                            }                        
                        }
            }
        }
    }

    render(){
        return (
            <SignUpForm value = {this.state} />
        )

    }
}

function SignUpForm(props) {
        const classes = useStyles();
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={props.value.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    {(props.value.validateFirstName === 'error')?(<TextField
                            error
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value = {props.value.firstName}
                            onChange={props.value.handleFirstName}
                            autoFocus
                        />):(<TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value = {props.value.firstName}
                        onChange={props.value.handleFirstName}
                        autoFocus
                    />)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {(props.value.validateLastName === 'error')?(<TextField
                        error
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value = {props.value.lastName}
                        onChange={props.value.handleLastName}
                        autoComplete="lname"
                    />):(<TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value = {props.value.lastName}
                        onChange={props.value.handleLastName}
                        autoComplete="lname"
                    />)}
                    </Grid>
                    <Grid item xs={12}>
                    {(props.value.validateEmail === 'error')?(<TextField
                        error
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value = {props.value.email}
                        onChange={props.value.handleEmailAddress}
                        autoComplete="email"
                    />):(<TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value = {props.value.email}
                        onChange={props.value.handleEmailAddress}
                        autoComplete="email"
                    />)}
                    </Grid>
                    <Grid item xs={12}>
                        {(props.value.validateDob === 'error')?(<TextField
                            error
                            variant="outlined"
                            required
                            fullWidth
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="yyyy-mm-dd"
                            onChange={props.value.handleDateChange}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />):(<TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="yyyy-mm-dd"
                            onChange={props.value.handleDateChange}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />)}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value = {props.value.password}
                            onChange={props.value.handlePassword}
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
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" variant="body2" onClick={() => history.push('/Signin')}>
                        Already have an account? Sign in
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

// const mapStateToProps = state => {
//     return { user : state.users };
// }

function mapDispatchToProps(dispatch) {
    return {
        loginUser : (i, l) => dispatch(loginUser(i, l))
    
    };
}



const Signup = connect(mapDispatchToProps)(SignupClass)

export default Signup;