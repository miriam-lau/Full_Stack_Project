import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '' };
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
    this.props.processForm({ user });
  }

  navLink() {
    if (this.props.formType === 'signin') {
      return <Link to="signup">Sign Up Instead</Link>
    } else {
      return <Link to="signin">Sign In Instead</Link>
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
      <div className="signin-form-container">
        <form onSubmit={ this.handleSubmit }>Pantry is Awesome!
          <br />
          Please { this.props.formType } or { this.navLink() }
          { this.renderErrors() }
          <div className="signin-form">
            <br />
            <label>Username:
              <input type="text" value={ this.state.username }
                onChange={ this.update('username') }
                className="signin-input" />
            </label>
            <br />
            <label>Email:
              <input type="text" value={ this.state.email }
              onChange={ this.update('email') }
              className="signin-input" />
            </label>
            <br />
            <label>Password:
              <input type="password" value={ this.state.password }
                onChange={ this.update('password') }
                className="signin-input" />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
