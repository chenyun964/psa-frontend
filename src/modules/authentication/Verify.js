import React, { Component } from 'react';
import LoginModel from './LoginModel';
import { Link } from 'react-router-dom';

class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVerfiy: false,
        }
    }

    componentDidMount() {
        let url = new URL(window.location.href);
        let token = url.searchParams.get("token");
        if (token == null) {
            window.location.replace('/login');
        }

        LoginModel.verifyEmail(token).then(res => {
            this.setState({
                isVerfiy: true,
            })
        }).catch(error => {
            this.setState({
                isVerfiy: false,
            })
        })
    }

    render() {
        return (
            <div className="LoginPage container">
                <div className="sign-in-form">
                    <div className="card">
                        <div className="row">
                            <div className="col-12 col-md-7">
                                <h1 className="title text-center">Email Verification</h1>
                                <div className="offset-md-2 col-md-8 col-12 text-center">
                                    {!this.state.isVerfiy &&
                                        <h5>Failed to verify email, please try again later.</h5>
                                    }
                                    {this.state.isVerfiy &&
                                        <h5>Your email is being verified.</h5>
                                    }
                                    <Link to="/login">
                                        <button className="btn submit-btn">SIGN IN</button>
                                    </Link>
                                    <br/><br/>
                                </div>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="right-side-bar text-center">
                                    <img src="../assets/img/PSA_Logo_White.png" alt="PSA Logo" />
                                    <h1 className="m-t-40 m-b-20">Welcome Back!</h1>
                                    <p className="m-b-20">To keep connected with us please login with your personal info</p>
                                    <Link to="/login">
                                        <button className="btn change-mode-btn">SIGN IN</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Verify;
