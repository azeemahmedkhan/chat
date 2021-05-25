import React, {Component} from 'react';
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {
    render() {
        return (
            <div className="positon-absolute top-0 w-full gradient-bottom-right start-indigo-500 end-blue-500"
                 style={{height: '90vh'}}>
                <div className="d-flex justify-content-center">
                    <div className="mt-48">
                        <h1 className="text-white" style={{fontSize: "60px"}}>Chat <FontAwesomeIcon icon={faComment}/><br/>While You<br/>Shop <FontAwesomeIcon icon={faStar}/></h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;