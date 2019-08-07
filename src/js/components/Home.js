import React from 'react'
import { connect } from 'react-redux'
import { saveUserDetails } from '../actions/index'
import { saveToken } from '../actions/index'
import { Redirect } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from './Head'
import Sidebar from './Sidebar'
import Main_Page from './Main_page'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({

    root: {
        display: 'flex',
      },

}));

class HomePage extends React.Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){
       let obj = JSON.parse(sessionStorage.getItem("user"));
       if(obj){
        if(obj.isAuth === true){
            //alert('here')
            fetch('http://localhost:3005/Home', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'bearer ' + obj.token
                }
            }).then((response) => {
                    if(response.status === 200){
                        response.json().then( json => {
                            let user = JSON.parse(json.user);
                            sessionStorage.setItem('user_details', JSON.stringify(user[0]));
                            this.props.saveToken(obj);
                            this.props.saveUserDetails(user[0]);
                        }).catch(err => console.log(err))
                    }
            }).catch(err => console.log(err))
        }}
    }

    render () {
        let obj = JSON.parse(sessionStorage.getItem('user'));
        
        return (
            <div>
                {(obj)?(obj.isAuth === true)?
                 <Page />:null: <Redirect to={'/Signin'} />}
            </div>

        )
    }

}

const Page = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Sidebar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                        <Head />
                </Grid>
                
                <Main_Page />
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users : state.users,
        token : state.token,
        isAuth : state.isAuth,
        userDetails : state.userDetails
    }
}

function mapDispatchToProps(dispatch){
    return {
        saveToken : (user) => dispatch(saveToken(user)),
        saveUserDetails : (userDetails)=> dispatch(saveUserDetails(userDetails))
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default Home