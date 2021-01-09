import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  ButtonGroup,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import logohandwriting from '../../assets/svg/logohandwriting.svg';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/user';

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1em',
    },
  },
  logo: {
    height: '2em',
    [theme.breakpoints.down('md')]: {
      height: '1.7em',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    marginLeft: '2em',
  },
  toolbar: {
    height: '3em',
    [theme.breakpoints.down('md')]: {
      height: '1em',
    },
    margin: '0.5em 0',
  },
  buttonGroup: {
    marginLeft: '2em',
  },
  button: {
    textTransform: 'none',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
  },
  drawerIcon: {
    height: '40px',
    width: '40px',
  },
  avatar: {
    '&:hover': {
      cursor: 'pointer',
    },
    backgroundColor: theme.palette.secondary.main,
    marginRight: '2em',
  },
  signinButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    textTransform: 'none',
    borderRadius: 50,
    fontFamily: 'Roboto',
    border: 'none',
    marginLeft: 'auto',
    marginRight: '2em',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const buttons = (
    <React.Fragment>
      <Hidden xsDown>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
          className={classes.buttonGroup}
        >
          <Button className={classes.button} component={Link} to="/findwork">
            Find work
          </Button>
          <Button className={classes.button} component={Link} to="/hire">
            Hire Photographer
          </Button>
        </ButtonGroup>
      </Hidden>
      {userInfo.name ? (
        <Avatar
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          onClick={(event) => handleClick(event)}
          style={{ marginLeft: 'auto' }}
          className={classes.avatar}
        >
          {userInfo.name.split(' ')[0].charAt(0)}
        </Avatar>
      ) : (
        <Button
          component={Link}
          to="/signin"
          variant="outlined"
          className={classes.signinButton}
        >
          Sign in
        </Button>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/settings">
          Settings & Privacy
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/help">
          Help & Support
        </MenuItem>
        <MenuItem onClick={logoutHandler}>Log out</MenuItem>
      </Menu>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <AppBar position="absolute" color="inherit" elevation={0}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Link to="/">
            <img src={logohandwriting} className={classes.logo} alt="logo" />
          </Link>
          {buttons}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
