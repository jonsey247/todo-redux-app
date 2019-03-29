import React, { Component } from 'react';

class SignIn extends Component {
    state = {
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.signIn(this.state.password);
        this.setState({
            password: ''
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>sign in</label>
                    <input type="text" onChange={this.handleChange} value={this.state.password} />
                </form>
            </div>
        )
    }
}

export default SignIn