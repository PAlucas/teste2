import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { makeStyles } from '@mui/styles';

import { RJControls } from '../../controls/RJControls';
import { Login } from '../login/Login';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    height: 100,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: '10vh',
  },
}));

export const CabecalhoEcommerce = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" elevation={0}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <img
          src="/assets/images/logo.png"
          alt="Logo da empresa"
          className={classes.logo}
        />
        <div className={classes.grow} />
        <Login></Login>
        {/* <RJControls.RJButton
          text="Fazer Login"
          color="inherit"
          variant="outlined"
          type="submit"
          startIcon={<AccountCircle />}
          onClick={teste}
        /> */}
      </Toolbar>
    </AppBar>
  );
};
