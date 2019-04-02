import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuBar extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  clearLocalStorage = () => {
    this.props.signOut({signedIn: false});
    localStorage.clear();
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
    // this.clearLocalStorage()
    console.log(localStorage.getItem(localStorage.key(0)))
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const localstore = JSON.parse(localStorage.getItem(localStorage.key(0)));
    let isAuth = localstore && localstore.signedIn ? true : false;
    return (
      <div className={styles.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={isAuth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={isAuth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={styles.grow}>
              Today I Have
            </Typography>
            {isAuth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
    signIn: boolean => dispatch(ACTIONS.signIn(boolean)),
    signOut: boolean => dispatch(ACTIONS.signOut(boolean))
  });
  

export { MenuBar };
