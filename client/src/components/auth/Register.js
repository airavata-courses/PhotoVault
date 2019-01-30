import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        //console.log(newUser);

        axios.post('api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }));
    }

    render() {
        const errors = this.state.errors;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your PhotoVault account</p>
                            <form noValidate onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className={classnames('form-control form-control-lg', { 'is-invalid': errors.firstName })}
                                                placeholder="First Name"
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={this.onChange}

                                            />
                                            {errors.firstName && (<div className="invalid-feeback">{errors.firstName}</div>)}
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className={classnames('form-control form-control-lg', { 'is-invalid': errors.lastName })}
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.onChange}

                                            />
                                            {errors.lastName && (<div className="invalid-feeback">{errors.lastName}</div>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
                                        placeholder="Email Address"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name="email"

                                    />
                                    {errors.email && (<div className="invalid-feeback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        name="password"

                                    />
                                    {errors.password && (<div className="invalid-feeback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', { 'is-invalid': errors.confirmPassword })}
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                        name="confirmPassword"

                                    />
                                    {errors.confirmPassword && (<div className="invalid-feeback">{errors.confirmPassword}</div>)}
                                </div>

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
