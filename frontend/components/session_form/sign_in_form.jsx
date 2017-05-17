import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
      <div className="signin-form-container">
        <form onSubmit={ this.handleSubmit }>Welcome Back!
          <br />
          { this.renderErrors() }
          <div className="signin-form">
            <br />
            <label>Username:
              <input type="text" value={ this.state.username }
                onChange={ this.update('username') }
                className="signin-input" />
            </label>
            <br />
            <label>Password:
              <input type="password" value={ this.state.password }
                onChange={ this.update('password') }
                className="signin-input" />
            </label>
            <br />
            <input type="submit" value="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignInForm);
