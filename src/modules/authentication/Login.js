import React, { Component } from 'react';
import LoginModel from './LoginModel';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: "",
			username: "",
			password: "",
		}
	}

	doLogin() {
		let data = {
			username: this.state.username,
			password: this.state.password
		}
		LoginModel.login(data).then(res => {
			this.storeUserToken(res.data);
			window.location.replace('/dashboard');
		}).catch(error => {
			console.log(error.res);
		})
	}

	/**
	 * Store user tokens
	 * @return void
	 */
	storeUserToken(data) {
		LoginModel.storeTokens(data);
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	render() {
		return (
			<div className="LoginPage container">
				<div className="sign-in-form">
					<div className="card">
						<div className="card-body">
							<a href="/" className="brand text-center d-block m-b-20">
								<img src="../assets/img/PSAI_Logo.png" alt="PSA Logo" />
							</a>
							<div className="form-group">
								<label>Username</label>
								<input type="text" className="form-control" placeholder="Enter username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} />
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
							</div>
							<div className="text-center mt-3">
								<button className="btn btn-primary" onClick={() => this.doLogin()}>Login</button><br />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
