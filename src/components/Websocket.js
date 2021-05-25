import { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';
import { faPaperPlane as farPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Websocket extends Component{
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            value: '',
            flag: 0,
            //author: 'user1',
            author: this.props.username,
            vendor: this.props.vendor
        }
    }
    client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + `${this.props.room_name.room_name}/`);

    componentDidMount() {
        this.scrollToBottom();
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

    componentDidUpdate() {
      this.scrollToBottom();
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    onButtonClicked = (e) => {
        this.client.send(JSON.stringify({
          user: this.props.user,
          type: "message",
          message: this.state.value,
          value: '',
          author: this.state.author,
          flag: 1
        }));
        this.state.value = ''
        e.preventDefault();
      }

      Base = () => {
        return (
          <div className="container border border-dark mt-3 rounded-2 bg-gradient bg-secondary">
            <this.Heading></this.Heading>
            <this.ChatWindow></this.ChatWindow>
            <this.SendMessage></this.SendMessage>
          </div>
        )
      }

      Heading = () => {
        let room_name = this.props.room_name.room_name
        let res, u1, u2
        res = room_name.split("_")
        u1 = res[1]
        u2 = res[2]
        let receiver = u1
        if (receiver === this.state.author) {
          receiver = u2
        }
        return(
          <div className="container border border-dark my-3 p-3 rounded-2 shadow-3 bg-gradient bg-dark">
          <div className="row algin-items-center">
          <div className="col-md-6 col-12 mb-3 mb-md-0">
            <h1 className="h2 mb-0 ls-tight text-white">{receiver}</h1>
          </div>
        </div>
        </div>
        )
      }

      ChatWindow = () => {

        return (
          <div className="container border border-dark mb-3 rounded-2 overflow-auto bg-gradient bg-dark" style={{height: '56vh'}}>
            {this.state.messages.map(message => <this.MessageBox message={message}/>)}
            <div ref={(el) => {this.messagesEnd=el;}}></div>
          </div>
        )
      }

      SenderMessageBox = (props) => {
        return (
          <div className="d-flex justify-content-end">
            <div className="w-lg-1/2 w-sm-2/3 my-2 rounded-5 shadow-5 gradient-bottom-right start-pink-800 end-purple-700">
              <h4 className="p-3 text-light">{props.msg}</h4>
            </div>
          </div>
        )
      }

      ReceiverMessageBox = (props) => {
        return (
          <div className="d-flex justify-content-start">
            <div className="w-lg-1/2 w-sm-2/3 my-2 rounded-5 shadow-5 gradient-bottom-right start-green-300 end-green-700">
              <h4 className="p-3">{props.msg}</h4>
            </div>
          </div>
        )
      }

      SendMessage = () => {
        return (
          <form className="max-w-screen-xl mb-3 shadow-3" onSubmit={this.onButtonClicked}>
                <div className="input-group">
                <input onChange={e => {
                  this.setState({ value: e.target.value });
                  this.value = this.state.value;
                  }}
                  value={this.state.value}
                  name="message"
                  className="form-control border border-primary gradient-right start-green-100 end-green-300"
                  placeholder="Type Message"
                  type="text"/>
                  <div className="input-group-append"><button className="btn gradient-top-right start-pink-100 end-purple-400" type="submit"><FontAwesomeIcon size="2x" icon={farPaperPlane}></FontAwesomeIcon></button></div>
                </div>
          </form>
        )
      }

      MessageBox = (props) => {
          if( props.message.author === this.state.author) {
            return (
              <this.SenderMessageBox msg={props.message.msg}></this.SenderMessageBox>
            )
          }
          else {
            return (
              <this.ReceiverMessageBox msg={props.message.msg}></this.ReceiverMessageBox>
            )
          }
      }

    render() {
        return (
          <this.Base></this.Base>
        )
    }
}


export default Websocket