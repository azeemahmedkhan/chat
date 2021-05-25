import React, { Component } from "react";
import axios from 'axios'
import Products from './Products'
import '../styles/base.css';
import { Redirect } from "react-router";
import Base from "./Base";

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: false,
            username: '',
            password: '',
            token: '',
            loggedInUser: '',
            error: false
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/account/login/', this.state)
        .then(response => {
            const user = this.state.username
            this.setState({
                loggedInUser: this.state.username,
                username: '',
                password: '',
                token: response.data.token,
                isLogged: true,
                user: user
            })
            
            var SignInHandler = this.props.handler;
            SignInHandler(true, this.state.token, user)

            //let url = '/success'
            //this.props.history.push({
            //    pathname: url,
            //   state: {
            //        update: this.state.isLogged,
            //        token: this.state.token,
            //        user: user
            //    }
            //});
        })
        .catch(error => { 
            console.log('hello')
            this.setState({
                username: '',
                password: '',
                error: true
            })
            if (this.state.isLogged === true) {
                this.setState({
                    error: false
                })
            }
            //console.log(error.response.data)
        })
    }

    SignInForm = () => {
        return (
            <form className="container-fluid max-w-screen-xl container p-3" onSubmit={this.submitHandler}>
                    <h1 className="font-display">Sign In</h1>
                    <hr className="border border-dark"></hr>
                    <div className='mb-2'>
                        <label className='form-label' for='username'>Username</label>
                        <input className="form-control" id='username' type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Your Username"></input>
                    </div>
                    <div className="mb-2">
                        <label className="form-label" for="password">Password</label>
                        <input className="form-control" id="password" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.changeHandler}></input>
                    </div>
                    <button className="btn btn-primary w-full" type="submit">Sign In</button>
                </form>
        )
    }

    DangerAlert = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>Passwords </strong> or <strong> Username</strong> is incorrect!
            </div>
        )
    }

    SuccessAlert = () => {
        var handler = this.props.handler
        return (
            <div>
                <div className="alert alert-success" role="alert">
                    you are successfully Logged In! Press the button to get started!
                </div>
            </div>
        )
    }

    render() {
        let err = <></>
        let err2 = <this.SignInForm></this.SignInForm>
        if (this.state.error) {
            err = (
                    <this.DangerAlert></this.DangerAlert>
            )
        }
        if (this.state.isLogged) {
            err2 = (
                <this.SuccessAlert></this.SuccessAlert>
            )
        }
        return (
            <div className="container p-3">
                {err}
                {err2}
            </div>
        )
    }
}

export default SignIn