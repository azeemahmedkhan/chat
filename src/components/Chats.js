import React, {Component} from "react"
import {BrowserRouter as Link} from 'react-router-dom';
import axios from "axios"
import createHistory from "history/createBrowserHistory";

class Chats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
            username: this.props.user,
            room_name: '',
            user: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/chat/create_room')
        .then(response => {
            var i;
            var temp = []
            console.log(response)
            for(i=0;i<response.data.length;i++) {
                if (response.data[i].user === this.state.username || response.data[i].vendor === this.state.username) {
                    temp[i] = response.data[i]
                }
            }
            this.setState({rooms: temp})
        })
        .catch(error => {
        console.log(error)
        })
    }

    submitHandler = (props) => {
        console.log(props)
        const history = createHistory({forceRefresh: true})
        let url = `/chats/${props.room_name}`
        history.push({
            pathname: url,
            state: {
                username: this.state.username,
                vendor: props.vendor,
                user: props.user
            },
        });
    }

    chatsCard = (props) => {
        var handler = this.submitHandler
        return (
            <div className="mt-2">
                <div className="card bg-primary">
                    <div className="card-body">
                        <h1 className="display">Room Name: {props.room.room_name}</h1>
                        <button className="btn btn-success" onClick={() => handler(props.room)}>Chat</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {rooms} = this.state
        return(
            <div className="container-md mt-3 mb-3 border border-dark p-4 rounded shadow-3">
                {rooms.map(room => <this.chatsCard key={room.room_name} room={room}></this.chatsCard>)}
            </div>
        )
    }
}

export default Chats