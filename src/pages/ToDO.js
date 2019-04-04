import React, { Component } from "react";
import {
  withStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import  { SignIn, TodoModal } from '../Components';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class ToDO extends Component {
    state = {checked: [0],errors: false, label: 'Title', errorText: '' };
    
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
      // event.preventDefault();
    };
      check = event => {
        console.log(event)
        return this.state.title ? true : false
        console.log(this.state.errors)
      }
      handleDelete = event => {
        // delete the item from the store
        this.props.deleteItem(event.target.value);
      };
      handleChange = event => {
        console.log(event.target.name, ' : ', event.target.value)
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      signIn = (password) => {
        if(password === this.props.passWord) {
          let signedIn = true;
          this.props.signIn({
            signedIn
          })
        }
      }

      handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
          checked: newChecked,
        });
      };

      clearLocalStorage = () => {
        this.props.signOut({signedIn: false});
        this.setState({ errorText: '' })
        localStorage.clear();
      }

      filterByDate = event => {
        console.log(event.target.name, ' : ', event.target.value)
        this.props.filterByDate(this.state.date);
      };

      render() {
        const { classes, passWord, days, items, error} = this.props;
        const localstore = JSON.parse(localStorage.getItem(localStorage.key(0)));
        return (
          localstore && localstore.signedIn ? (<div>
            <div>
            <Button onClick={this.clearLocalStorage}>Sign Out</Button>
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
                  <Button onClick={this.handleSubmit}>Add</Button>
                </FormControl>
              </form>
              {items.map(item => (
                <div className={classes.demo}>
                <h1>{item.day}</h1>
                  <List dense={false}> <TodoModal key={item.id} item={item} tags={item.tags} handleDelete={this.handleDelete}/></List>
                </div>
              ))}
            </div>
          </div>) : (<div className="todo-app container"><SignIn signIn={this.signIn} passWord={passWord}/></div>)
          
        );
      }
    }
    const mapStateToProps = state => ({
      items: state.items,
      signedIn: state.signedIn,
      passWord: state.passWord,
      days: state.days,
      error: state.error
    });
    const mapDispatchToProps = dispatch => ({
      createItem: item => dispatch(ACTIONS.createItem(item)),
      deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
      signIn: boolean => dispatch(ACTIONS.signIn(boolean)),
      signOut: boolean => dispatch(ACTIONS.signOut(boolean)),
      filterByDate: date => dispatch(ACTIONS.filterByDate(date))
    });
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(ToDO));