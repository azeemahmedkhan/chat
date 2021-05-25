import React, {Component} from "react";
import '../styles/base.css';
import axios from 'axios'
import Products from './Products'
import Register from './Register'
import ProductDetail from './ProductDetail'
import GetSlug from './GetSlug'
import SignIn from './SignIn'
import Websocket from './Websocket'
import GetRoomName from './GetRoomName'
import Chats from './Chats'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import GetUser from "./GetUser";
import LoggedOut from './LoggedOut';
import Home from './Home';

class Base extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            user: localStorage.getItem('user'),
            token: localStorage.getItem('token'),
            categories: [],
            isDropdown: false,
            isNavbar: false,
            update: false,
            //username: "user1"
            //username: this.props.username,
            //token: this.props.token,
            //token: 'rtyuhjkchkjn',
            //isLoggedIn: this.props.isLoggedIn
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/categories/')
        .then(response => {
            console.log(response)
            this.setState({categories: response.data})
        })
        .catch(error => {
        console.log(error)
        })
  }

    SignInButton = () => {
        return (
            <div className="navbar-nav ms-lg-4">
                <Link className="nav-item nav-link" to="/signin">Sign in</Link>
            </div>
        )
    }

    RegisterButton = () => {
        return (
            <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link to="/Register" className="btn btn-sm w-full w-lg-auto gradient-bottom-right start-indigo-500 end-blue-500 text-white">
                    Register
                </Link>
            </div>            
        )
    }

    SignOutButton = () => {
        return (
            <div className="navbar-nav ms-lg-4">
                <Link to="/loggedout" className="nav-item nav-link">Sign Out</Link>
            </div>
        )
    }

    ChatsButton = () => {
        return (
            <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link to="/chats" className="btn btn-sm w-full w-lg-auto gradient-bottom-right start-indigo-500 end-blue-500 text-white">
                    Chats
                </Link>
            </div>            
        )
    }

    DropdownItem = (props) => {
        return (
            <li>
                <a className="dropdown-item" href="#">{props.category.name}</a>
            </li>
        )
    }

    dropdownHandler = () => {
        this.setState({
            isDropdown: !this.state.isDropdown
        })
    }

    navbarHandler = () => {
        this.setState({
            isNavbar: !this.state.isNavbar
        })
    }

    signInHandler = (status, token, user) => {
        this.setState({
            isLoggedIn: status,
            token: token,
            user: user
        })

        localStorage.setItem('isLoggedIn', this.state.isLoggedIn)
        localStorage.setItem('user', this.state.user)
        localStorage.setItem('token', token)
    }

    logOutHandler = () => {
        this.setState({
            isLoggedIn: false
        })

        localStorage.setItem('isLoggedIn', false)
        localStorage.setItem('user', '')
        localStorage.setItem('token', '')

        this.setState({
            user: localStorage.getItem('user'),
            token: localStorage.getItem('token')
        })
    }

    render() {
        const {categories} = this.state
        const menuClass = `dropdown-menu${this.state.isDropdown ? " show" : ""}`;
        const navbarClass = `${this.state.isNavbar ? " " : "collapse "}navbar-collapse`;
        let link1, link2;
        if (this.state.isLoggedIn) {
            link1 = <this.SignOutButton></this.SignOutButton>
            link2 = <this.ChatsButton></this.ChatsButton>
        }
        else {
            link1 = <this.SignInButton></this.SignInButton>;
            link2 = <this.RegisterButton></this.RegisterButton>;
        }

        return (
            <div>
            <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3 position-sticky top-0">
                <div className="container-xl">
                    <a className="navbar-brand mb-0 h1" href="#">
                        SHOP
                    </a>
                    <button className="navbar-toggler" onClick={this.navbarHandler} type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={navbarClass} id="navbarCollapse">
                        <div className="navbar-nav mx-lg-auto">
                            <Link className="nav-item nav-link active" to="/" aria-current="page">Home</Link>
                            <Link to='/products' className="nav-item nav-link">Products</Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" onClick={this.dropdownHandler} href="#" id="navbarDropdownMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                                <ul className={menuClass} aria-labelledby="navbarDropdownMenue">
                                    {categories.map(category => <this.DropdownItem key={category.name} category={category}/>)}
                                </ul>
                            </div>
                            <a className="nav-item nav-link" href="#">About Us</a>
                            <a className="nav-item nav-link" href="#">Contact</a>
                        </div>
                        {link1}
                        {link2}
                    </div>
                </div>
            </nav>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/loggedout" render={(props) => <LoggedOut handler={this.logOutHandler}/>}></Route>
                <Route exact path="/success" component={GetUser}></Route>
                <Route exact path="/products" render={(props) => <Products user={this.state.user} token={this.state.token}/>}></Route>
                <Route exact path="/Register" component={Register}></Route>
                <Route exact path="/signin" render={(props)=> <SignIn handler={this.signInHandler}/>}></Route>
                <Route exact path={`/products/:slug`} render={(props) => <GetSlug user={this.state.user} token={this.state.token}/>}></Route>
                <Route exact path="/chats" render={(props => <Chats user={this.state.user}></Chats>)}></Route>
                <Route exact path="/chats/:room_name" component={GetRoomName}></Route>
            </Switch>
            </Router>
            </div>
        )
    }
};

export default Base;