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
                <div class="card bg-dark shadow-4">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <div class="p-2">
                                <img alt="..." src={Image} class="card-img"/>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="h2 text-white">{product.name}</h2>
                                <span class="d-block text-muted text-sm font-semibold mt-2 text-white">{category.name}</span>
                                <h4 class="mt-4 mb-6 text-white">
                                    {product.description}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                        <button className="btn mt-5 w-full gradient-bottom-right start-indigo-500 end-blue-500 text-white" onClick={this.createRoomHandler}>
                            Start Chat
                        </button>
            </div>
        )
    }
}

export default ProductDetail;