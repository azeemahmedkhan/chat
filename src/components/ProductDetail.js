import React, {Component} from 'react'
import axios from 'axios'
import '../styles/base.css';
import Image from './image.png'
import {BrowserRouter as Router, Route, Link, Switch, useParams} from 'react-router-dom';
import GetUser from './GetUser';
import Websocket from './Websocket';
import createHistory from "history/createBrowserHistory";


class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            room_name: '',
            product: [],
            category: [],
            vendor: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/products/' + `${this.props.slug.slug}`)
        .then(response => {
            console.log(response)
            this.setState({product: response.data,
                           category: response.data.category,
                           vendor: response.data.vendor
            })
        })
        .catch(error => {
        console.log(error)
        })
    }

    createRoomHandler = () => {
        const {vendor} = this.state
        const headers = {
            'Authorization': `Token ${this.props.token}`
        }

        const data = {
            'user': this.props.user,
            'vendor': vendor.username
        }

        axios.post('http://localhost:8000/api/chat/create_room/', data, {headers: headers})
        .then(response => {
            this.setState({
                room_name: response.data.room_name
            })
            console.log(this.state.room_name)

            this.testFunction()
        })
        .catch(error => {
            console.log(error.data)
        })
    }

    testFunction = () => {
        let url = `/chats/${this.state.room_name}`
        console.log(url)
        const {vendor} = this.state
        const history = createHistory({forceRefresh: true})
        history.push({
            pathname: url,
            state: {
                username: this.props.user,
                vendor: vendor.username
            }
        })
    }

    render() {
        const {product} = this.state
        const {category} = this.state
        const {vendor} = this.state
        return (
            <div className="container-md mt-3 border border-dark p-4 rounded shadow-3">
                <div class="card border border-dark">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <div class="p-2">
                                <img alt="..." src={Image} class="card-img"/>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="h4">{product.name}</h3>
                                <span class="d-block text-muted text-sm font-semibold mt-2">{category.name}</span>
                                <p class="mt-4 mb-6">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare pretium placerat ut platea...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-5 border border-dark">
                    <div className="row g-0">
                        <div className="col-md-6">
                            <div className="p-2">
                                <h3>{vendor.username}</h3>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-3">
                            <button className="btn btn-outline-primary mt-5 w-full" onClick={this.createRoomHandler}>
                                START CHAT
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;