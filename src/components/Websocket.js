import { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';

class Websocket extends Component{

    constructor(props) {
        super(props)
        this.state = {
            user: 'user',
            vendor: 'vendor',
            messages: [],
            value: '',
            flag: 0,
            author: 'user1',
        }
    }
    client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/chat_user1_user2/');

    componentDidMount() {
        this.client.onopen = () => {
            this.client.send(JSON.stringify({
                type: "message",
                message: this.state.value,
                author: this.state.author,
                value: '',
                flag: 0
              }));
              this.state.value = ''

            console.log('Websocket Connection successfull!')
        }

        this.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data) {
              this.setState((state) => ({
                messages: [...state.messages,
                  {
                    msg: data.message,
                    author: data.author,
                    flag: data.flag
                  }]
              })
            );
            }
          };
    }

    onButtonClicked = (e) => {
        this.client.send(JSON.stringify({
          type: "message",
          message: this.state.value,
          value: '',
          author: this.state.author,
          flag: 1
        }));
        console.log(this.state.author)
        this.state.value = ''
        e.preventDefault();
      }

    render() {
        return (
            <div>
                <div>
                    {this.state.messages.map(message => <div>
                        <h3>{message.author}</h3>
                        <h4>{message.msg}</h4>
                    </div>)}
                </div>

                <form onSubmit={this.onButtonClicked}>
                    <div>
                        <input type="text" name="message" value={this.state.value} onChange={e => {
                        this.setState({ value: e.target.value });
                        this.value = this.state.value;
                        }} placeholder="Enter message"/>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

export default Websocket