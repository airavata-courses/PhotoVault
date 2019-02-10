import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            user: localStorage.getItem('user'),
            firstName: localStorage.getItem('firstName'),
            //showLogin: true
        }
        console.log(this.state.user, " and ", this.state.firstName);
        this.logout = this.logout.bind(this);
        //this.setDetails();
    }
    component() {
        this.setDetails();
    }

    logout() {

        localStorage.clear();
        //history.push('/');

    }

    render() {
        const ButtonLogOut = withRouter(({ history }) => (
            <Button type="submit" variant="contained" color="primary"
                onClick={() => { localStorage.clear(); history.push('/login') }}
            >
                Sign Out
            </Button>
        ))

        if (localStorage.getItem('user') === null || localStorage.getItem('user') === '')
            return (<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">PhotoVault</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>);
        else
            return (<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/gallery">PhotoVault</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/gallery"> Hello, {localStorage.getItem('firstName')} </Link>

                            </li>
                            <li className="nav-item">

                                {/* <Button type="submit" variant="contained" color="primary" onClick={this.logout}>
                                    Sign Out
      </Button> */}
                                {<ButtonLogOut></ButtonLogOut>}
                            </li>



                        </ul>
                    </div>
                </div>
            </nav>);

    }
}

export default Navbar;