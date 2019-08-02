import React from 'react'
import { connect } from 'react-redux'



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
                            console.log(json);
                            console.log(json.user);
                        }).catch(err => console.log(err))
                    }
            }).catch(err => console.log(err))
        }}
    }

    render () {
        let obj = JSON.parse(sessionStorage.getItem('user'));
        return (
            <div>
                {(obj)?(obj.isAuth === true)?obj.token + '   ' + obj.userid : null: 'Authentication Error'}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        users : state.users,
        token : state.token,
        isAuth : state.isAuth
    }
}

function mapDispatchToProps(dispatch){
    return {
      
    }
  }

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default Home