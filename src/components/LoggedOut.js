import React, { Component } from "react";

class LoggedOut extends Component {
    constructor(props) {
        super(props)
    }

    SuccessAlert = () => {
        var handler = this.props.handler
        return (
            <div className="container-md mt-3 mb-3 border border-dark p-4 rounded shadow-3">
                <div className="alert alert-success" role="alert">
                    you have successfully Signed Out
                </div>
            </div>
        )
    }

    componentDidMount() {
        var SignOutHandler = this.props.handler;
        SignOutHandler()
    }

    render() {
        return (
            <this.SuccessAlert></this.SuccessAlert>
        )
    }
}

export default LoggedOut