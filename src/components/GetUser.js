import {BrowserRouter as Route, useParams, useLocation, Router} from 'react-router-dom';
import Base from './Base'

function GetUser() {
    const location = useLocation();
    console.log(location.state.token)
    console.log(location.state.user)
    console.log(location.state.update)
    return (
        <div className="container-md mt-3 mb-3 border border-dark p-4 rounded shadow-3">
            <div class="alert alert-success" role="alert">
                You have successfully Logged In! Press the button to get started!!
            </div>
            <button className="btn btn-outline-primary mt-5 w-full" /*isLoggedIn={location.state.update} token={location.state.token} username={location.state.user}*/>Get Started</button>
        </div>
        
    )
}

export default GetUser