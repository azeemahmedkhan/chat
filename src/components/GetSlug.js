import {BrowserRouter as Router, Route, Link, Switch, useParams} from 'react-router-dom';
import ProductDetail from './ProductDetail'

function GetSlug(props) {
    let slug = useParams()
    console.log(slug)
    return (
        <div>
            <ProductDetail slug={slug} user={props.user} token={props.token}></ProductDetail>
        </div>
    )
}

export default GetSlug;