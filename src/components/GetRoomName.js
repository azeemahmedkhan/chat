import {BrowserRouter as Router, Route, Link, Switch, useParams, useLocation} from 'react-router-dom';
import Websocket from './Websocket'

function GetSlug() {
    let room_name = useParams()
    const location = useLocation();
    console.log(location.state.username)
    return (
        <div>
            <Websocket room_name={room_name} username={location.state.username} user={location.state.user} vendor={location.state.vendor}></Websocket>
        </div>
    )
}

export default GetSlug;