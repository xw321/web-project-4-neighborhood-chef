import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Container, Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import NavigationBar from "../components/NavigationBar";
import "../style/login.css";

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();
		let username = e.target.username.value.trim();
		let email = e.target.email.value.trim();
		let password = e.target.password.value.trim();
		let address = e.target.address.value.trim();
		let gender = e.target.gender.value.trim();
		let phone = e.target.phone.value.trim();

		if (password.length < 8) {
			return this.setState( {
				error: "Password must be more than 8 characters."
			});

		}
		let profile = {
			address: address, gender: gender, phone: phone, is_chef: false,
		};
		Accounts.createUser(
			{username: username, email: email, password: password, profile: profile},
			err => {
				if(err) {
					this.setState( {
						error: err.reason
					});
				} else {
					this.setState({
						error: ""
					});
					this.props.history.push("/");
				}
			}
		);
	}

	render() {
		return (
			<div>
				<NavigationBar />
				<Container>
					<Grid
						textAlign = "center"
						style = {{ height: "50vh"}}
						divided = "vertically"
						verticalAlign = "middle"
						id = "grid"
					>
						<Grid.Row columns = {2}>
							<Grid.Column>
								<Header as = "h2" textAlign = "center" id = "signupHeader">
								Sign Up
								</Header>
								{this.state.error ? (
									<label
										basic
										color = "red"
										pointing = "below"
										size = "huge"
									>
										{this.state.error}
									</label>
								) : (
									undefined
								)}
								<Form
									size = "huge"
									onSubmit = {this.onSubmit.bind(this)}
									onValidate
								>
									<Segment stacked>
										<label htmlFor="mail">Email</label>
										<Form.Input
											id={"mail"}
											fluid
											icon = "mail"
											iconPosition = "left"
											type = "email"
											name = "email"
											placeholder = "Email"
											size = "huge"
										/>
										<label htmlFor="username">Username</label>
										<Form.Input
											id={"username"}
											fluid
											icon = "user"
											iconPosition = "left"
											type = "text"
											name = "username"
											placeholder = "username"
											size = "huge"
										/>
										<label htmlFor="password">Password</label>
										<Form.Input
											id={"password"}
											fluid
											icon = "lock"
											iconPosition = "left"
											type = "password"
											name = "password"
											placeholder = "password"
											size = "huge"
										/>
										<label htmlFor="address">Address</label>
										<Form.Input
											id={"address"}
											fluid
											icon = "address book outline"
											iconPosition = "left"
											type = "address"
											name = "address"
											placeholder = "address"
											size = "huge"
										/>
										<label htmlFor="gender">Gender</label>
										<Form.Input
											id={"gender"}
											fluid
											icon = "genderless"
											iconPosition = "left"
											type = "gender"
											name = "gender"
											placeholder = "gender"
											size = "huge"
										/>
										<label htmlFor="phone">Phone</label>
										<Form.Input
											id={"phone"}
											fluid
											icon = "phone"
											iconPosition = "left"
											type = "phone"
											name = "phone"
											placeholder = "phone"
											size = "huge"
										/>
										<Button fluid size = "huge" id = "accountButton">
										Create Account
										</Button>
									</Segment>
								</Form>
								<Message
									size = "huge"
								>
									If you already have an account? Please
									<Link to = "Login"> Login </Link>
								</Message>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		);
	}
}

Signup.propTypes = {
	history: PropTypes.object,
};