import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

class SignIn extends Component {
    state = {
        password: '',
        colour: {color:'pink' },
        wrongPass: false
    }
    handleChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.props.passWord === this.state.password){
            this.props.signIn(this.state.password);
            this.setState({
                password: ''
            }) 
        } else {
           this.setState({
               colour: 'red',
               wrongPass: true
           })
        }
    }
    
    
    render() {
    const wrongPass = this.state.wrongPass;
    let incorrectPassMessage;
    const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: red;
  `;
    if (wrongPass) {
      incorrectPassMessage = <Title>Wrong Password!!</Title>;
    } else {
        incorrectPassMessage = '';
    }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label style={{color: this.state.colour}}>sign in</label>
                    <input type="text" onChange={this.handleChange} value={this.state.password} />
                    
                </form>
                <Button size="medium" onClick={this.handleSubmit}>sign in</Button>
                {incorrectPassMessage}
            </div>
        )
    }
}

export { SignIn }