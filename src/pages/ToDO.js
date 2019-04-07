import React, { Component } from "react";
import {
  withStyles,
  TextField,
  Button,
  FormControl,
  MenuItem
} from "@material-ui/core";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import  { SignIn, TodoModal, FilterForm } from '../Components';
import AddTaskForm from '../Components/AddTaskForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    width: '50%',
    alignContent: 'center',
    marginLeft: theme.typography.pxToRem(287),
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
    };

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
        // localStorage.clear();
      }

      filterByDate = event => {
        console.log(event.target.name, ' : ', event.target.value)
        this.props.filterByDate(this.state.date);
      };

      render() {
        const { classes, passWord, days, items, error, tags} = this.props;
        const localstore = JSON.parse(localStorage.getItem(localStorage.key(0)));
        return (
          localstore && localstore.signedIn ? (<div>
            <div>
            <Button onClick={this.clearLocalStorage}>Sign Out</Button>
              <AddTaskForm error={error} days={days} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
              <FilterForm tags={tags} days={days} filterByTag={this.props.filterByTag}/>
              {items.map(item => (
                <div className={classes.demo} id={item.id}>
                <h1>{item.day}</h1>
                  <TodoModal key={item.id} item={item} tags={item.tags} handleDelete={this.handleDelete}/>
                </div>
              ))}
            </div>
          </div>) : 
          (<div className="todo-app container">
            <SignIn signIn={this.signIn} passWord={passWord}/>
            {items.map(item => (
                <div className={classes.demo} id={item.id}>
                <h1>{item.day}</h1>
                  <TodoModal key={item.id} item={item} tags={item.tags} handleDelete={this.handleDelete}/>
                </div>
              ))}
          </div>)
          
        );
      }
    }
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
    )(withStyles(styles)(ToDO));