import React from 'react'
import { Redirect } from 'react-router-dom'
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Card from './Card'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { longStackSupport } from 'q';
import { classExpression } from '@babel/types';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
      margin : theme.spacing(-1)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
      root: {
        display: 'flex',
      },
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
        },
      },
      appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
        marginTop: '64px'
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      main: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }));

function PermanentDrawer(props) {

    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function log_out(){
      let obj = JSON.parse(sessionStorage.getItem('user'));
      if(obj.isAuth === true){
        obj.isAuth = false;
      }
      sessionStorage.setItem('user', JSON.stringify(obj));
    }

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
        log_out();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div id='rer'>
        
        <Divider />
        <List>
            {['Home', 'Profile', 'Friends'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        </div>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      );

      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      );

    return (
        <div>
    <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            App
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    <div className={classes.root}>
    <Grid container style={{marginTop : "70px"}}>
        <Grid item xs={3} sm={3}>
            
        </Grid>
        <Grid item xs={9} sm={9}> 
          <Grid item xs ={12}>
                <Paper className={classes.paper} style={{width : "40rem"}}>
                  <TextField
                    id="outlined-dense-multiline"
                    label="Dense multiline"
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax="10"
                  />
                </Paper>
          </Grid>
          <Grid item xs={12} sm={12} style={{marginTop : "20px", width : "40rem"}}>
                <Paper className={classes.paper} style={{alignItems : "center"}}><Card /></Paper>    
          </Grid>
        </Grid>
      </Grid>
    </div></div>)
  }

export default PermanentDrawer


<AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>