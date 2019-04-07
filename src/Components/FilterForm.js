import React, { Component } from 'react';
import styled from 'styled-components'; 
import {
    withStyles,
    TextField,
    Button,
    FormControl,
    MenuItem,
    Select,
    Input
  } from "@material-ui/core";

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

class FilterForm extends Component {
    state = {checked: [0],errors: false, label: 'Title', errorText: '', tag: '' };
    handleChange = event => {
        console.log(event.target.name, ' : ', event.target.value)
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    handleSubmit = (e) =>{
        this.props.filterByTag(this.state.tag);
        this.setState({
            tag: ''
        }) 
    }
    
    
    render() {
        const { classes, days, tags, items, error} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <FormControl>
                <TextField
                    id="tag"
                    select
                    label="Tag"
                    type="tag"
                    name="tag"
                    className={styles.textField}
                    value={this.state.tag}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: styles.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {tags.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl>
                  <Button onClick={this.handleSubmit} id="filter-tag">Filter by Tag</Button>
                </FormControl>
              </form>
            </div>
        )
    }
}

export { FilterForm }