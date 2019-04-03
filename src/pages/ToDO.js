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
  Checkbox
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
  }
});

class ToDO extends Component {
    state = {checked: [0],errors: false, label: 'Title', errorText: '' };
    generate = () => {
      return this.props.items.map(item => (
        <TodoModal key={item.id} item={item} tags={item.tags} handleDelete={this.handleDelete}/>
      ));
    };


    handleSubmit = event => {
      // console.log(this.state.item);
      this.setState(
        { item: "",
          title: '',
          date: '',
          tags: '' 
        });
        if (this.state.title && this.state.item && this.state.tags) {
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
        const { classes, passWord} = this.props;
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
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue="2019-05-24"
                    className={classes.textField}
                    name='date'
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
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
              <Grid item container justify="space-evenly" alignItems="center">
                <div className={classes.demo}>
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue="2019-05-24"
                    className={classes.textField}
                    name='date'
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                <Button onClick={this.filterByDate}>filter by date</Button>
                  <List dense={false}>{this.generate()}</List>
                </div>
              </Grid>
            </div>
          </div>) : (<div className="todo-app container"><SignIn signIn={this.signIn} passWord={passWord}/></div>)
          
        );
      }
    }
    const mapStateToProps = state => ({
      items: state.items,
      signedIn: state.signedIn,
      passWord: state.passWord
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