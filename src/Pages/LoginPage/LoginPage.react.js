
// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from 'react';
import history from '../../history';

import { connect } from 'react-redux';

import { Button, Input, Header } from 'semantic-ui-react';
import { Navigation } from '../../Components';

import * as AuthActionCreator from '../../ActionCreators/AuthActionCreator';

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
	return {
		isLogin: state.authReducer.isLogin,
		boxoffices: state.movieReducer.boxoffices,
		searchedMovies: state.movieReducer.searchedMovies,
		searchedList: state.movieReducer.searchedList,
	};
};

class LoginPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const token = localStorage.getItem('token');
		if (token) {
			history.replace('/');
		}
	}

	handleLoginButtonClick() {
		const { id, pw } = this.state;
		this.props.dispatch(AuthActionCreator.signin(id, pw));
		history.replace('/');
	}

	handleSignupButtonClick() {
		const { id, pw } = this.state;
		this.props.dispatch(AuthActionCreator.signup(id, pw));
	}

	handleInputChange(event, data, type) {
		if (type === 'ID') {
			this.setState({
				id: data.value,
			});
		} else if (type === 'PW') {
			this.setState({
				pw: data.value,
			});
		}
	}

	render() {

		return (
			<div className="loginPage">
				<Navigation/>
				<div
					className="loginPage__body"
					style={{
						backgroundImage: `url(${require('../../Static/Images/theater.jpg')})`,
					}}
				>

					<div className="loginPage__body__form">
						<Header
							as='h2'
							className="loginPage__body__form__header"
							content='Sign In'
							subheader='당신을 위한 영화 평점 서비스에 로그인해주세요.'
						/>
						<Input
							icon='user'
							iconPosition='left'
							placeholder='ID'
							size='large'
							fluid={true}
							onChange={
								(event, data) => this.handleInputChange(event, data, 'ID')
							}
						/>
						<Input
							icon='protect'
							iconPosition='left'
							placeholder='Password'
							size='large'
							fluid={true}
							type='password'
							onChange={
								(event, data) => this.handleInputChange(event, data, 'PW')
							}
						/>
						<div className="loginPage__body__form__footer">
							<Button
								primary
								fluid
								onClick={() => this.handleLoginButtonClick()}
							>
								SIGN IN
							</Button>
							<Button
								secondary
								fluid
								onClick={() => this.handleSignupButtonClick()}
							>
								Secondary
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

LoginPage.defaultProps = defaultProps;
LoginPage.propTypes = propTypes;

export default LoginPage = connect(mapStateToProps)(LoginPage);
