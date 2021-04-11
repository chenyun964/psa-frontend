import React, { Component } from 'react';
import LoginModel from './LoginModel';
import Preloader from '../../libs/Preloader';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			signUpPasswordError: "",

			signInUsername: "",
			signInPassword: "",
			signInFailMsg: "",

			signUpUsername: "",
			signUpName: "",
			signUpPassword: "",
			signUpEmail: "",
			signUPConfirmPassword: "",
			signUpFailMsg: "",

			forgetEmail: "",
			doForgotFailMsg: "",

			isSignIn: true,
			isSignUp: false,
			isForget: false,
			isLoading: false,

			doForgetSuccess: false,
			returnMsg: ''
		}
	}

	doSignIn() {
		let data = {
			username: this.state.signInUsername,
			password: this.state.signInPassword
		}

		LoginModel.login(data).then(res => {
			this.storeUserToken(res.data);
			window.location.replace('/dashboard');
		}).catch(error => {
			this.setState({
				isLoading: false,
				signInFailMsg: "Invalid username and password."
			})
		})
	}

	doSignUp() {
		if (this.state.signUpPassword != this.state.signUPConfirmPassword) {
			this.setState({
				isError: true,
				signUpPasswordError: "Password doesn't match",
				isLoading: false
			})
			return;
		}

		let data = {
			username: this.state.signUpUsername,
			email: this.state.signUpEmail,
			password: this.state.signUpPassword,
			name: this.state.signUpName,
			confirmPassword: this.state.signUPConfirmPassword
		}

		LoginModel.register(data).then(res => {
			this.setState({
				signInUsername: this.state.signUpUsername,
				signInPassword: this.state.signUpPassword,
			})
			this.doSignIn();
		}).catch(error => {
			this.setState({
				isLoading: false,
				doForgotFailMsg: "Failed to sign up. Try again later."
			})
		})
	}

	doForgot() {
		LoginModel.reset(this.state.forgetEmail).then(res => {
			this.setState({
				isLoading: false,
				doForgetSuccess: true,
				returnMsg: res.data
			})
		}).catch(error => {
			this.setState({
				isLoading: false,
				doForgetSuccess: false,
				doForgotFailMsg: "Please enter a valid email."
			})
		})
	}

	storeUserToken(data) {
		LoginModel.storeTokens(data);
	}

	handleUsernameChange(e) {
		this.clearError();
		if (this.state.isSignUp) {
			this.setState({ signUpUsername: e.target.value });
		} else {
			this.setState({ signInUsername: e.target.value });
		}
	}

	handlePasswordChange(e) {
		this.clearError();
		if (this.state.isSignUp) {
			this.setState({ signUpPassword: e.target.value });
		} else {
			this.setState({ signInPassword: e.target.value });
		}
	}

	handleEmailChange(e) {
		this.clearError();
		if (this.state.isForget) {
			this.setState({ forgetEmail: e.target.value });
		} else {
			this.setState({ signUpEmail: e.target.value });
		}
	}

	handleConfirmPasswordChange(e) {
		this.clearError();
		this.setState({ signUPConfirmPassword: e.target.value });
	}

	handleNameChange(e) {
		this.clearError();
		this.setState({
			signUpName: e.target.value
		})
	}

	handleSubmit = (e) => {
		this.setState({
			isLoading: true
		})
		e.preventDefault();
		if (this.state.isSignIn) {
			this.doSignIn();
		} else if (this.state.isSignUp) {
			this.doSignUp();
		} else if (this.state.isForget) {
			this.doForgot();
		}
	}

	goSignIn() {
		this.clearInput();
		this.setState({
			isSignIn: true,
			isSignUp: false,
			isForget: false,
			doForgetSuccess: false
		})
	}

	goSignUp() {
		this.clearInput();
		this.setState({
			isSignIn: false,
			isSignUp: true,
			isForget: false,
			doForgetSuccess: false
		})
	}

	goForget() {
		this.clearInput();
		this.setState({
			isSignIn: false,
			isSignUp: false,
			isForget: true,
			doForgetSuccess: false
		})
	}

	clearError() {
		this.setState({
			isError: false,
			signUpPasswordError: ""
		})
	}

	clearInput() {
		this.setState({
			signUpUsername: "",
			signUpPassword: "",
			signUpEmail: "",
			signUpName: "",
			signUPConfirmPassword: "",
			signInUsername: "",
			signInPassword: "",
			forgetEmail: "",
			signInFailMsg: "",
			signUpFailMsg: "",
			doForgotFailMsg: ""
		})
	}

	render() {
		return (
			<div className="LoginPage container">
				<div className="sign-in-form">
					{this.state.isSignUp &&
						<div className="card">
							<div className="row">
								<div className="col-12 col-md-7">
									<h1 className="title text-center">Create Account</h1>
									{this.state.isLoading &&
										<Preloader />
									}
									{!this.state.isLoading &&
										< div className="offset-md-2 col-md-8 col-12">
											<form onSubmit={this.handleSubmit}>
												{this.state.signUpFailMsg != "" &&
													<div class="alert alert-danger alert-dismissible fade show">{this.state.signUpFailMsg}</div>
												}
												<div className="form-group">
													<label>Username</label>
													<input type="text" className="form-control" placeholder="Username" value={this.state.signUpUsername} onChange={(e) => this.handleUsernameChange(e)} required />
												</div>
												<div className="form-group">
													<label>Email</label>
													<input type="email" className="form-control" placeholder="Email" value={this.state.signUpEmail} onChange={(e) => this.handleEmailChange(e)} required />
												</div>
												<div className="form-group">
													<label>Name</label>
													<input type="text" className="form-control" placeholder="Display name" value={this.state.signUpName} onChange={(e) => this.handleNameChange(e)} required />
												</div>
												<div className="form-group">
													<label>Password</label>
													<input type="password" className={"form-control" + (!this.state.signUpPasswordError ? "" : " input-error")} placeholder="Password" value={this.state.signUpPassword} onChange={(e) => this.handlePasswordChange(e)} required />
													{this.state.signUpPasswordError != '' &&
														<p className="error-msg">{this.state.signUpPasswordError}</p>
													}
												</div>
												<div Name="form-group">
													<label>Confirm Password</label>
													<input type="password" className={"form-control" + (!this.state.signUpPasswordError ? "" : " input-error")} placeholder="Confirm Password" value={this.state.signUPConfirmPassword} onChange={(e) => this.handleConfirmPasswordChange(e)} />
													{this.state.signUpPasswordError != '' &&
														<p className="error-msg">{this.state.signUpPasswordError}</p>
													}
												</div>
												<div className="col-12 m-t-30 m-b-50 text-center">
													<button type="submit" className="btn submit-btn">SIGN UP</button>
												</div>
											</form>
										</div>
									}
								</div>
								<div className="col-12 col-md-5">
									<div className="right-side-bar text-center">
										<img src="../assets/img/PSA_Logo_White.png" alt="PSA Logo" />
										<h1 className="m-t-40 m-b-20">Welcome Back!</h1>
										<p className="m-b-20">To keep connected with us please login with your personal info</p>
										<button className="btn change-mode-btn" onClick={() => this.goSignIn()}>SIGN IN</button>
									</div>
								</div>
							</div>
						</div>
					}
					{this.state.isSignIn &&
						<div className="card">
							<div className="row">
								<div className="col-12 col-md-5">
									<div className="left-side-bar text-center">
										<img src="../assets/img/PSA_Logo_White.png" alt="PSA Logo" />
										<h1 className="m-t-40 m-b-10">Hello, Friend!</h1>
										<p className="m-b-20">Enter your personal details and start journey with us</p>
										<button className="btn change-mode-btn" onClick={() => this.goSignUp()}>SIGN UP</button>
									</div>
								</div>
								<div className="col-12 col-md-7">
									<h1 className="title text-center">Sign In to PSA</h1>
									{this.state.isLoading &&
										<Preloader />
									}
									{!this.state.isLoading &&
										<div className="offset-md-2 col-md-8 col-12">
											<form onSubmit={this.handleSubmit}>
												{this.state.signInFailMsg != "" &&
													<div class="alert alert-danger alert-dismissible fade show">{this.state.signInFailMsg}</div>
												}
												<div className="form-group">
													<label>Username</label>
													<input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} required />
												</div>
												<div className="form-group">
													<label>Password</label>
													<input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} required />
												</div>
												<div className="col-12 m-b-20 text-center">
													<button className="btn forgot-password-btn" type="button" onClick={() => this.goForget()}>Forgot password?</button>
												</div>
												<div className="col-12 m-t-30 m-b-50 text-center">
													<button type="submit" className="btn submit-btn">SIGN IN</button>
												</div>
											</form>
										</div>
									}
								</div>
							</div>
						</div>
					}
					{this.state.isForget &&
						<div className="card">
							<div className="row">
								<div className="col-12 col-md-7">
									<h1 className="title text-center">Forgot Password</h1>
									{this.state.isLoading &&
										<Preloader />
									}
									{!this.state.isLoading && !this.state.doForgetSuccess &&
										<div className="offset-md-2 col-md-8 col-12">
											<form onSubmit={this.handleSubmit}>
												{this.state.doForgotFailMsg != "" &&
													<div class="alert alert-danger alert-dismissible fade show">{this.state.doForgotFailMsg}</div>
												}
												<div className="form-group">
													<label>Email</label>
													<input type="email" className="form-control" placeholder="Email" value={this.state.forgetEmail} onChange={(e) => this.handleEmailChange(e)} required />
												</div>
												<div className="col-12 m-t-30 m-b-50 text-center">
													<button type="submit" className="btn submit-btn">Send</button>
												</div>
											</form>
										</div>
									}
									{!this.state.isLoading && this.state.doForgetSuccess &&
										<div className="offset-md-2 col-md-8 col-12 text-center">
											<p>{this.state.returnMsg}</p>
										</div>
									}
								</div>
								<div className="col-12 col-md-5">
									<div className="right-side-bar text-center">
										<img src="../assets/img/PSA_Logo_White.png" alt="PSA Logo" />
										<h1 className="m-t-40 m-b-20">Welcome Back!</h1>
										<p className="m-b-20">To keep connected with us please login with your personal info</p>
										<button className="btn change-mode-btn" onClick={() => this.goSignIn()}>SIGN IN</button>
									</div>
								</div>
							</div>
						</div>
					}
				</div >
			</div >
		);
	}
}

export default Login;
