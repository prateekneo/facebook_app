import React from 'react'
import { TextField, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor : "#11cb5f",
        color: "white",
    },
}));

class AddPost extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            post : '',
            post_success : 0,
        }
    }

    handlePost = (e) => {
        this.setState({
            post : e.target.value
        })
    }

    handlePostSubmit = () => {

        if(this.state.post !== ''){
            let ob = JSON.parse(sessionStorage.getItem('user'));

            let obj = {
                userid : ob.userid,
                post_content : this.state.post,                 
            }

            fetch('http://localhost:3005/SavePost', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'bearer ' + ob.token
                },
                body: JSON.stringify(obj)
            }).then( async (response) => {
                    if(response.status === 200){
                       
                        this.setState({
                            post_success : 1
                        })
                        // await setTimeout(() => {

                        // }, 3000).then({

                        // })

                    }
            }).catch(err => console.log(err))
        }
    }

    render(){
        return (
            <Post value = {this.state} handlePost={this.handlePost} handlePostSubmit={this.handlePostSubmit} />
        )
    }

}

const Post = (props) => {

    const classes = useStyles();
    return (
        <div>
                <div className={classes.toolbar} />
                {(props.value.post_success === 1)?<Paper className={classes.paper}>Post Addedd Successfully</Paper>:null}
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Add Post"
                    multiline
                    rows="4"
                    value={props.value.post}
                    onChange={props.handlePost}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="contained" color="primary" onClick={props.handlePostSubmit}>
                    Post
                </Button>
            </div>
    )
}

export default AddPost