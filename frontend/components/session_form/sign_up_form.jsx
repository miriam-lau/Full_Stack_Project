import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function ErrorBanner(props) {
  if (!props.shouldShow) {
    return null;
  } else {
    return (
      <div className="sign-up-error">
        { props.message }
      </div>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '',
      re_entered_password: '', matching_passwords: "true" };
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
    if (this.state.password !== this.state.re_entered_password) {
      this.setState({matching_passwords: false});
    } else {
      this.setState({matching_passwords: true});
      const user = this.state;
      return this.props.receiveCurrentUser({user});
    }
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
      <div className="signup-form-container">
        <form onSubmit={ this.handleSubmit }>Pantry is Awesome!
          <br />
          { this.renderErrors() }
          <div className="signup-form">
            <br />
            <label>Username:
              <input type="text" value={ this.state.username }
                onChange={ this.update('username') }
                className="signup-input" />
            </label>
            <br />
            <label>Email:
              <input type="text" value={ this.state.email }
              onChange={ this.update('email') }
              className="signup-input" />
            </label>
            <br />
            <label>Password:
              <input type="password" value={ this.state.password }
                onChange={ this.update('password') }
                className="signup-input" />
            </label>
            <br />
            <label>Re-enter Password:
              <input type="password" value={ this.state.re_entered_password }
                onChange={ this.update('re_entered_password') }
                className="signup-input" />
            </label>
            <ErrorBanner shouldShow={!this.state.matching_passwords}
              message="Passwords must match" />
            <br />
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
