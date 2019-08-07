import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux'
import { toggleSidebar } from '../actions/index'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        marginTop : "64px",
    },
}));    

class Side extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mobileOpen : this.props.mobileOpen
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.mobileOpen !== nextProps.mobileOpen){
            this.setState({
                mobileOpen  : nextProps.mobileOpen
            })
        }
    }

    handleDrawerToggle = () => {
        this.props.toggleSidebar();
    }
    
    render(){
        
        return (
            <Bar mobileOpen = {this.state.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} />
        )
    }
}

const Bar = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        mobileOpen : state.mobileOpen
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleSidebar : () => dispatch(toggleSidebar()),
    }
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(Side)
export default Sidebar