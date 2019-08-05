import React from 'react'
import { connect } from 'react-redux'
import { saveUserDetails } from '../actions/index'
import { saveToken } from '../actions/index'
import { Redirect } from 'react-router-dom'
import Header from './Header'

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
                {(obj)?(obj.isAuth === true)?<Header />: null: <Redirect to={'/Signin'} />}
            </div>
        )
    }

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