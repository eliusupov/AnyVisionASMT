import React, { Component } from 'react';

import './SystemEntry.scss';


class SystemEntry extends Component {
	state = {
		mode: 'register',
		email: '',
		password: '',
		isAdmin: false,
		emailAvail: null,
		errArr: [],
		spinner: false,
	}
	copyState = null;
	
	inputHandler = (type, value) => this.setState({[type]: value});
	
	modeHandler = type => this.setState({
		...this.copyState,
		mode: type,
	});
	
	validate = async (state) => {
		const errArr = [];
		if (!state.email) {
			errArr.push('Please enter an email');
		} else if (!this.validateEmail(state.email)) {
			errArr.push('Please enter a valid email - example@example.com');
		} else if (state.mode === 'register') {
			const emailAvail = await this.checkEmail(state.email);
			if (!emailAvail) {
				errArr.push('Email is taken');
			}
		}
		if (!state.password) {
			errArr.push('Please enter a password');
		} else if (this.validatePassword(state.password)) {
			errArr.push('No special characters');
		} else if (state.password.length < 5 || state.password.length > 12) {
			errArr.push('Password length between 5-12');
		}
		this.setState({errArr});
		return errArr.length === 0;
	};
	
	validatePassword = (password) => {
		if (password) {
			const regExp = /[^A-Za-z0-9]+/g;
			return regExp.test(password);
		}
	};
	
	validateEmail = (email) => {
		if (email) {
			email.toLowerCase();
			const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			return regExp.test(email);
		}
	};
	
	checkEmail = async (email) => {
		let emailAvail;
		try {
			emailAvail = await $.ajax({
				url: 'http://localhost:3000/user/checkEmail',
				type: 'POST',
				data: {
					email,
				}
			});
		} catch (e) {
			const errArr = [...this.state.errArr];
			errArr.push('Email is taken');
			emailAvail = false;
		}
		this.setState({emailAvail});
		return emailAvail;
	}
	
	sendRegister = async (e, state) => {
		e.preventDefault();
		const valid = await this.validate(state);
		if (!valid) return;
		this.setState({spinner: true});
		$.ajax({
			url: 'http://localhost:3000/user/create',
			type: 'POST',
			data: {
				email: state.email,
				password: state.password,
				role: this.state.isAdmin ? 0 : 1,
			}
		}).done(data => {
			if (data.success) {
				localStorage.id = data.user._id;
				localStorage.email = data.user.email;
				localStorage.role = data.user.role;
				this.props.history.push('/');
			} else {
				const errArr = [...this.state.errArr];
				errArr.push('Something went wrong try again later');
				this.setState({
					spinner: false,
				});
			}
		}).fail(err => {
		
		});
	}
	
	sendLogin = async (e, state) => {
		e.preventDefault();
		const valid = await this.validate(state);
		if (!valid) return;
		this.setState({spinner: true});
		$.ajax({
			url: 'http://localhost:3000/user/login',
			type: 'POST',
			data: {
				email: state.email,
				password: state.password,
			}
		}).done(data => {
			if (data.success) {
				localStorage.id = data.user._id;
				localStorage.email = data.user.email;
				localStorage.role = data.user.role;
				this.props.history.push('/');
			} else {
				const errArr = [...this.state.errArr];
				errArr.push('Incorrect Email / Password, and no i dont have recovery services so youre stuck');
				this.setState({
					errArr,
					spinner: false,
				});
			}
		}).fail(err => {
		
		});
	}
	
	componentWillMount = () => {
		if (localStorage.email) this.props.history.push('/');
	}
	
	componentDidMount = () => {
		this.copyState = {...this.state};
	}
	
	render() {
		return (
			<div className='system-entry'>
				<form onSubmit={e => e.preventDefault()}>
					{this.state.mode === 'register'
						? <h1>Register to use the system</h1>
						: null
					}
					{this.state.mode === 'login'
						? <h1>Login to use the system</h1>
						: null
					}
					<label>
						<input
							value={this.state.email}
							type="email"
							placeholder="Email"
							onChange={e => this.inputHandler('email', e.target.value)}
						/>
					</label>
					<label>
						<input
							value={this.state.password}
							type="password"
							placeholder="Password"
							onChange={e => this.inputHandler('password', e.target.value)}
						/>
					</label>
					{this.state.mode === 'register'
						? <div>
							<input
								checked={this.state.isAdmin}
								type="checkbox"
								onChange={e => this.inputHandler('isAdmin', e.target.checked)}
							/>
							<span>Create as Admin?</span>
						</div>
						: null
					}
					{this.state.mode === 'register'
						? <div className="swap" onClick={() => this.modeHandler('login')}>
							Have a user? click here
						</div>
						: null
					}
					{this.state.mode === 'login'
						? <div className="swap" onClick={() => this.modeHandler('register')}>
							Don't Have a user? click here
						</div>
						: null
					}
					{this.state.errArr.map(e => <div key={e} className="err">{e}</div>)}
					<div className="submit">
						{this.state.spinner
							? <i className="fas fa-spinner fa-spin"></i>
							: <>
								{this.state.mode === 'register'
									? <input
										type="submit"
										value='Submit'
										onClick={(e) => this.sendRegister(e, this.state)}
									/>
									: null
								}
								{this.state.mode === 'login'
									? <input
										type="submit"
										value='Login'
										onClick={(e) => this.sendLogin(e, this.state)}
									/>
									: null
								}
							</>
						}
					</div>
				</form>
			</div>
		);
	}
}

export default SystemEntry;
