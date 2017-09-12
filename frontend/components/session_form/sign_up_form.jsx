import React from "react";
import { Link } from "react-router-dom";

/*
  Returns error message if props.shouldShow is true.
  @param {props} props has props.message and props.shouldShow
*/
function ErrorBanner(props) {
  if (!props.shouldShow) {
    return null;
  } else {
    return (
      <div className="sign-up-error">{ props.message }</div>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "",
      re_entered_password: "", matching_passwords: "true" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestSignIn = this.handleGuestSignIn.bind(this);
  };

  /*
    On entry to fields, it will update the corresponding property.
    @param {property} property of the item
  */
  update(property) {
    return event => this.setState({ [property]: event.currentTarget.value });
  }

  /*
    On submit, checks if re-entered password matches. If there is a match, passes the state to the signup action, and if successful, logs the user into the app.
    @param {event} signup button
  */
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.re_entered_password) {
      this.setState({ matching_passwords: false });
    } else {
      this.setState({ matching_passwords: true });
      const user = this.state;
      return this.props.signup({ user }).then( () => {
        this.props.history.push("/pantry_items");
      })
    }
  }

  /*
    On submit, passes the state to the signin action, and if successful, logs the user into the app.
    @param {event} signin button
  */
  handleGuestSignIn(event) {
    event.preventDefault();
    const user = { username: "guest", password: "password" };
    this.props.signin({ user })
      .then( () => {this.props.history.push("/pantry_items");
    })
  }

  // Returns error messages upon failure to signin.
  renderErrors() {
    if (this.props.errors) {
      return (
        <div >
          <ul className="sign-up-error">
            {this.props.errors.map((error, i) => (
              <li key={ `error-${i}` }>{ error }</li>
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
            <h2 className="session-title">Create Account</h2>
            <br />

            <label>Username</label>
            <br />
            <input type="text" value={ this.state.username }
                onChange={ this.update("username") } className="signup-input"
            />
            <br />
            <br />

            <label>Email</label>
            <br />
            <input type="text" value={ this.state.email }
                onChange={ this.update("email") } className="signup-input"
            />
            <br />
            <br />

            <label>Password</label>
            <br />
            <input type="password" value={ this.state.password }
                onChange={ this.update("password") } className="signup-input"
            />
            <br />
            <br />

            <label>Re-enter Password</label>
            <br />
            <input type="password" value={ this.state.re_entered_password }
                onChange={ this.update("re_entered_password") }
                className="signup-input"
            />

            <ErrorBanner shouldShow={ !this.state.matching_passwords }
                message="Passwords must match"
            />
            <br />
            <br />
            <div>{ this.renderErrors() }</div>
            <br />
            <input className="session-button" type="submit"
                value="Create Account"
            />
          </div>
        </form>
        <br />
        <br />
        <button className="guest-session-button"
            onClick={ this.handleGuestSignIn }>Guest Sign In
        </button>
      </div>
    );
  }
}

export default SignUpForm;
