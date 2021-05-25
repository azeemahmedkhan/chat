import React, { Component } from "react";
import axios from 'axios'
import '../styles/base.css';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            is_vendor: false,
            error: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/account/register/', this.state)
        .then(response => {
            this.setState({
                username: '',
                email: '',
                password: '',
                confirm_password: '',
                is_vendor: false,
                error: 'success'
            })
            console.log(response)
        })
        .catch(error => {
            try {
                if (error.response.data['password']) {
                    this.setState({
                        password: '',
                        confirm_password: '',
                        error: 'password',
                    })
                    console.log(this.state)
                }
                else {
                    this.setState({
                        username: '',
                        email: '',
                        error: 'username'
                    })
                }
            }
            catch {
                alert('something went wrong')
            }
        })
    }

    vendorHandler = () => {
        if (this.state.is_vendor) {
            this.setState({
                is_vendor: false
            })
        }
        this.setState({
            is_vendor: true
        })
    }

    render() {
        let err = <></>;
        if (this.state.error === 'password') {
            err = (
                <div className="alert alert-danger" role="alert">
                    <strong>Passwords </strong>Does not match!
                </div>
            )
        }
        else if (this.state.error === 'success') {
            err = (
                <div className="alert alert-success" role="alert">
                    Your account created<strong> successfully</strong>
                </div>
            )
        }
        else if (this.state.error === 'username') {
            err = (
                <div className="alert alert-danger" role="alert">
                    <strong>Username</strong> or <strong>Email</strong> already exists!
                </div>
            )
        }
        return (
            <div className="container p-3">
                {err}
                <form className="container-fluid max-w-screen-xl container p-3" onSubmit={this.submitHandler}>
                    <h1 className="font-display">Create Account</h1>
                    <hr className="border border-dark"></hr>
                    <div className='mb-2'>
                        <label className='form-label' for='username'>Username</label>
                        <input className="form-control" id='username' type="text" name="username" value={this.state.username} onChange={this.changeHandler} placeholder="Your Username"></input>
                    </div>
                    <div className='mb-2'>
                        <label className="form-label" for="email">Email</label>
                        <input className="form-control" id="email" type="email" name="email" value={this.state.email} placeholder="Your Email" onChange={this.changeHandler}></input>
                    </div>
                    <div className="mb-2">
                        <label className="form-label" for="password">Password</label>
                        <input className="form-control" id="password" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.changeHandler}></input>
                    </div>
                    <div className="mb-2">
                        <label className="form-label" for="confirm_password">Confirm Password</label>
                        <input className="form-control" id="confirm_password" type="password" name="confirm_password" value={this.state.confirm_password} placeholder="Repeat Password" onChange={this.changeHandler}></input>
                    </div>
                    <div className="form-check mb-2">
                        <input className="form-check-input" id="is_vendor" type="checkbox" name="is_vendor" value={this.state.is_vendor} onClick={this.vendorHandler}></input>
                        <label className="form-check-label" for="is_vendor">Register as vendor</label>
                    </div>
                    <button className="btn btn-primary w-full" type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default Register