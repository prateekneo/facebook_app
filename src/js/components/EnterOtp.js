import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom'
//import { browserHistory } from 'react-router'
//import { createBrowserHistory } from 'history';

//const history = createBrowserHistory()

import history from './history';



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

class EnterOtp extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userid : this.props.match.params.userid,
            otp : '',
            validateOtp : null,
            redirect : 0
        }
    }

    handleOTP = (e) => {
        this.setState({
            otp : e.target.value
        })
    }     
    handleSubmit = (e) => {
        e.preventDefault()
       
        let obj = {
            user_registration_id : this.state.userid,
            otp_requested : this.state.otp
        }
        
        fetch('http://localhost:3005/VerifyOtp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            if(response.status === 200){
                //alert('here');
                //alert(this.state.userid)
                response.json().then( json => {
                    let obj = {
                        token : json.token,
                        userid : json.userid,
                        isAuth : json.isAuth
                    }
                    console.log(json);
                    sessionStorage.setItem('user', JSON.stringify(obj));
                    this.setState({
                        redirect : 1
                    })
                })
                
            }
        }).catch((err) => {
            console.log(err);
        })

        alert(this.state.userid);  

    }

    render(){
        return (
            (this.state.redirect)?<Redirect to={'/Home'}/>:<OtpForm value = {this.state} handleOTP = {this.handleOTP} handleSubmit={this.handleSubmit}/>
        )
    }
}

function OtpForm (props) {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Enter OTP
                </Typography>
                <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    {/* {(props.value.validateFirstName === 'error')?(<TextField
                            error
                            helperText="Enter Correct Otp"
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
                        />):(*/
                    <TextField 
                        autoComplete="fname"
                        name="Enter OTP"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="Enter OTP"
                        value = {props.value.otp}
                        onChange={props.handleOTP}
                        autoFocus
                        InputLabelProps={{
                            shrink: true,
                            }}
                    />}
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
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" variant="body2" onClick={() => history.push('/Signin')}>
                        Go to Login
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
    )

}


export default EnterOtp