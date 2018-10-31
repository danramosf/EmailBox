import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const LOGIN_MUTATION = gql `
	mutation login($emailAddress: String!, $password: String!) {
	  login(
	    emailAddress: $emailAddress,
	    password: $password
	  ) {
	  	token
	  	user {
	  		id
	  	}
	  }
	}
`

class Login extends Component {

	state = {
	    emailAddress: '',
	    password: ''   
	}

	render() {
		const { emailAddress, password } = this.state
		return (
			<div>
				<div className="login_box">
					<form>
						<label htmlFor="email">Your fake email</label>
						<input 
							type="email" 
							value={emailAddress} 
							onChange={e => this.setState({ emailAddress: e.target.value })}
							placeholder="fake@email.com" 
							name="email"
						/>
						<label htmlFor="password">Your password</label>
						<input 
							type="password" 
							value={password} 
							onChange={e => this.setState({ password: e.target.value })}
							placeholder="password" 
							name="password"
						/>

					</form>
				</div>
				<Mutation mutation={LOGIN_MUTATION} variables={{ emailAddress, password }}>
		          {loginMutation => <button onClick={loginMutation}>Login!</button>}
		        </Mutation>
			</div>
		)
	}
} 

export default Login