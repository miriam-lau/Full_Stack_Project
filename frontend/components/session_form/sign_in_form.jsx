import React from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestSignIn = this.handleGuestSignIn.bind(this);
  };

  update(property) {
    return event => this.setState({ [property]: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.signin({user}).then( () => {
      this.props.history.push('/pantry_items');
    })
  }

  handleGuestSignIn(event) {
    event.preventDefault();
    const user = {username: 'guest', password: 'password'};
    this.props.signin({user})
      .then( () => {this.props.history.push('/pantry_items');
    })
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <div >
          <ul className="sign-up-error">
          { this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>{ error }</li>
          ))}
        </ul>
      </div>
      );
    }
  }

  render() {
    return(
      <div className="session-form-container">
        <form onSubmit={ this.handleSubmit }>
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
            <div>{ this.renderErrors() }</div>
            <br />

            <input className="session-button" type="submit" value="Sign In" />
          </div>
        </form>

        <div className="session-form">
          <br />
          <br />
          <section className="session-question-div">
            <span className="session-question">New to</span>
            <span className="session-question-logo"> myPantry</span>
            <span className="session-question">&nbsp;?</span>
          </section>
          <br />
          <br />

          <div >
            <input className="create-session-button" onClick={this.props.openModal("signup")} value="Create Account" />
          </div>
        </div>

        <br />
        <br />
        <button className="guest-session-button" onClick={ this.handleGuestSignIn }>Guest Sign In</button>
      </div>
    );
  }
}

export default SignInForm;
