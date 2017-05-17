import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignUpFormContainer from './sign_up_form_container';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(property) {
    return event => this.setState({ [property]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.receiveCurrentUser({user});
  }

  renderErrors() {
    return (
      <ul>
        { this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{ error }</li>
        ))}
      </ul>
    );
  }

  render() {
    return(
      <div className="session-form-container">
        <form onSubmit={ this.handleSubmit }>
          <br />
          { this.renderErrors() }
          <div className="session-form">
            <h2 className="session-title">Sign In</h2>
            <br />

            <label>Username</label>
            <br />
            <input type="text" value={ this.state.username }
              onChange={ this.update('username') }
              className="signin-input" />
            <br />
            <br />

            <label>Password</label>
            <br />
            <input type="password" value={ this.state.password }
              onChange={ this.update('password') }
              className="signin-input" />
            <br />
            <br />

            <input className="session-button" type="submit" value="Sign In" />
          </div>
        </form>
        <div className="session-form">
          <br />
          <h3 className="session-question">New to Pantry?</h3>

          <button className="session-button">
            Create Account
          </button>

        </div>
      </div>
    );
  }
}

// <form action={<Link to="/api/users" component={SignUpFormContainer}></Link>}>
// <button className="session-button" type="link">
//   Create Account
// </button>
// </form>

export default withRouter(SignInForm);
