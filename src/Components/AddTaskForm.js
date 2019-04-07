import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Popover
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';

import ACTIONS from "../modules/action";
import { connect } from "react-redux";

const styles = theme => ({
  form: {
    padding: 30,
  },
  buttonWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.unit * 4,
  },
  anchor: {
    backgroundColor: green[500],
    width: 10,
    height: 10,
    borderRadius: '50%',
    position: 'absolute',
  },
  radioAnchor: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

const inlineStyles = {
  anchorVertical: {
    top: {
      top: -5,
    },
    center: {
      top: 'calc(50% - 5px)',
    },
    bottom: {
      bottom: -5,
    },
  },
  anchorHorizontal: {
    left: {
      left: -5,
    },
    center: {
      left: 'calc(50% - 5px)',
    },
    right: {
      right: -5,
    },
  },
};

class AddTaskForm extends React.Component {
  state = {
    open: false,
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
    errorText: ''
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleClickButton = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSubmit = event => {
    // console.log(this.state.item);
    this.setState(
      { item: "",
        title: '',
        day: '',
        tags: '' 
      });
      if (this.state.title && this.state.item && this.state.tags && this.state.day) {
        this.setState({ errorText: '' })
        this.props.createItem(this.state);
      } else {
        this.setState({ errorText: 'Please Fill out all fields' })
      }
  };
    handleChange = event => {
      console.log(event.target.name, ' : ', event.target.value)
      this.setState({
        [event.target.name]: event.target.value
      });
    };

  render() {
    const { classes, error, days } = this.props;
    const {
      open,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference
    } = this.state;

    let mode = '';

    if (anchorReference === 'anchorPosition') {
      mode = `
  anchorReference="${anchorReference}"
  anchorPosition={{ top: ${positionTop}, left: ${positionLeft} }}`;
    }
    return (
      <div>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.buttonWrapper}>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              variant="contained"
              onClick={this.handleClickButton}
            >
              Today I have...
            </Button>
            {anchorReference === 'anchorEl' && (
              <div
                className={classes.anchor}
                style={{
                  ...inlineStyles.anchorVertical[anchorOriginVertical],
                  ...inlineStyles.anchorHorizontal[anchorOriginHorizontal],
                }}
              />
            )}
          </Grid>
        </Grid>
        <Popover
          open={open}
          anchorEl={this.anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <form noValidate autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl>
                <TextField
                    label="Title"
                    id="margin-dense"
                    value={this.state.title}
                    className={classes.textField}
                    margin="dense"
                    name="title"
                    required="true"
                    helperText={this.state.errorText}
                    error ={this.state.errorText.length === 0 ? false : true }
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="description"
                    id="margin-dense"
                    value={this.state.item}
                    className={classes.textField}
                    margin="dense"
                    name="item"
                    required="true"
                    helperText={this.state.errorText}
                    error ={this.state.errorText.length === 0 ? false : true }
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="day"
                    select
                    label="Day"
                    type="day"
                    name="day"
                    className={classes.textField}
                    value={this.state.day}
                    required="true"
                    error ={error}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Cannot enter in the same day"
                    margin="normal"
                  >
                    {days.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Tags"
                    id="margin-dense"
                    value={this.state.tags}
                    className={classes.textField}
                    margin="dense"
                    name="tags"
                    required="true"
                    helperText={this.state.errorText}
                    error ={this.state.errorText.length === 0 ? false : true }
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <Button onClick={this.handleSubmit} id="add">Add</Button>
                </FormControl>
              </form>
        </Popover>
      </div>
    );
  }
}

AddTaskForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  items: state.items,
  signedIn: state.signedIn,
  passWord: state.passWord,
  days: state.days,
  error: state.error,
  tags: state.tags
});
const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(ACTIONS.createItem(item)),
  deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
  signIn: boolean => dispatch(ACTIONS.signIn(boolean)),
  signOut: boolean => dispatch(ACTIONS.signOut(boolean)),
  filterByTag: tag => dispatch(ACTIONS.filterByTag(tag))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddTaskForm));
