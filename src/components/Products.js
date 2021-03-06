import React, { Component } from 'react';
import axios from 'axios';
import '../styles/base.css';
import Image from './image.png'
import ProductDetail from './ProductDetail';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/products/')
        .then(response => {
            console.log(response)
            this.setState({products: response.data})
        })
        .catch(error => {
        console.log(error)
        })
    }

    DisplayProduct = (props) => {
        return (
            <div className="col-lg-4 mt-2 mb-2 col-sm-6">
                <div class="card border border-dark bg-gradient bg-dark" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <div class="p-2">
                        <img alt="..." src={Image} class="card-img"/>
                    </div>
                    <div class="card-body">
                        <h3 class="h4 text-white text-white">{props.product.name}</h3>
                        <span class="d-block text-muted text-sm font-semibold mt-2">{props.product.category.name}</span>
                        <h5 class="mt-2 mb-2 text-white">
                            {props.product.price} Rs
                        </h5>
                        <Link to={`./products/${props.product.slug}`} className="btn btn-sm gradient-bottom-right start-indigo-500 end-blue-500 text-white">View Product</Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {products} = this.state
        return (
            <div className="container-md mt-3 mb-3 border border-dark p-4 rounded shadow-3">
                <div className="row">
                {products.map(product => <this.DisplayProduct key={product.id} product={product}></this.DisplayProduct>)}
                </div>
            </div>
        )
    }
}

export default Products;