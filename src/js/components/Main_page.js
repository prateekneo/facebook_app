import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from './Card'
import AddPost from './AddPost'


const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(6),
        alignItems : "center"
    },
    
}));

class Main_Page extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            
        }
    }
    render(){
        return (
            <Page />
        )
    }
}

const Page = () => {
    const classes = useStyles();
        return(
            <main className={classes.content}>
                <AddPost /> 
                <div className={classes.toolbar} />
                <Card />
            </main>
        )
}

export default Main_Page