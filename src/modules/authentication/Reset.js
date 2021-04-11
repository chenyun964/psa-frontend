import React, { Component } from 'react';
import LoginModel from './LoginModel';
import Preloader from '../../libs/Preloader';
import { Link } from 'react-router-dom';

class ResetPwd extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			passwordError: "",

			password: "",
			confirmPassword: "",
			failMsg: "",

			doSuccess: false
		}
	}

	doReset() {
		this.setState({
			isLoading: true,
			failMsg: ""
		})
		if (this.state.password != this.state.confirmPassword) {
			this.setState({
				isError: true,
				passwordError: "Password doesn't match",
				isLoading: false
			})
			return;
		}

		let url = new URL(window.location.href);
		let token = url.searchParams.get("token");
		if (token == null) {
			return;
		}

		let data = {
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		}

		LoginModel.resetPassword(token, data).then(res => {
			this.setState({
				isLoading: false,
				doSuccess: true,
			})
		}).catch(error => {
			this.setState({
				isLoading: false,
				doSuccess: false,
				failMsg: "Failed to reset, please try again later."
			})
		})
	}

	storeUserToken(data) {
		LoginModel.storeTokens(data);
	}

	handleConfirmPasswordChange(e) {
		this.clearError();
		this.setState({ confirmPassword: e.target.value });
	}

	handlePasswordChange(e) {
		this.clearError();
		this.setState({ password: e.target.value });
	}

	handleSubmit = (e) => {
		this.setState({
			isLoading: true
		})
		e.preventDefault();
		this.doReset();
	}

	clearError() {
		this.setState({
			isError: false,
			passwordError: ""
		})
	}

	render() {
		return (
			<div className="LoginPage container">
				<div className="sign-in-form">
					<div className="card">
						<div className="row">
						<div className="col-12 col-md-7">
								<h1 className="title text-center">Reset Password</h1>
								{this.state.isLoading &&
									<Preloader />
								}
								{!this.state.isLoading && !this.state.doSuccess &&
									<div className="offset-md-2 col-md-8 col-12">
										<form onSubmit={this.handleSubmit}>
											{this.state.failMsg != "" &&
												<div class="alert alert-danger alert-dismissible fade show">{this.state.failMsg}</div>
											}
											<div className="form-group">
												<label>Password</label>
												<input type="password" className={"form-control" + (!this.state.signUpPasswordError ? "" : " input-error")} placeholder="Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} required />
												{this.state.passwordError != '' &&
													<p className="error-msg">{this.state.passwordError}</p>
												}
											</div>
											<div Name="form-group">
												<label>Confirm Password</label>
												<input type="password" className={"form-control" + (!this.state.signUpPasswordError ? "" : " input-error")} placeholder="Confirm Password" value={this.state.confirmPassword} onChange={(e) => this.handleConfirmPasswordChange(e)} />
												{this.state.passwordError != '' &&
													<p className="error-msg">{this.state.passwordError}</p>
												}
											</div>
											<div className="col-12 m-t-30 m-b-50 text-center">
												<button type="submit" className="btn submit-btn">Confirm</button>
											</div>
										</form>
									</div>
								}
								{!this.state.isLoading && this.state.doSuccess &&
									<div className="offset-md-2 col-md-8 col-12 text-center">
										<p>Your Password have been reset</p>
										<Link to="/login">
											<button className="btn submit-btn">SIGN IN</button>
										</Link>
									</div>
								}
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

export default ResetPwd;
