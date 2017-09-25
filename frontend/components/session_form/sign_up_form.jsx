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
      this.props.signup({ user }).then( () => {
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
      <div className="session-form-wrapper">
        <form onSubmit={ this.handleSubmit }>
          <div className="session-form">
            <h2 className="session-title">Create Account</h2>

            <label>Username</label>
            <input type="text" value={ this.state.username }
                onChange={ this.update("username") } className="session-input"
            />

            <label>Email</label>
            <input type="text" value={ this.state.email }
                onChange={ this.update("email") } className="session-input"
            />

            <label>Password</label>
            <input type="password" value={ this.state.password }
                onChange={ this.update("password") } className="session-input"
            />

            <label>Re-enter Password</label>
            <input type="password" value={ this.state.re_entered_password }
                onChange={ this.update("re_entered_password") }
                className="session-input"
            />

            <ErrorBanner shouldShow={ !this.state.matching_passwords }
                message="Passwords must match"
            />

            <div>{ this.renderErrors() }</div>
            <input className="session-signin-button" type="submit"
                value="Create Account"
            />
          </div>
        </form>

        <button className="session-button"
            onClick={ this.handleGuestSignIn }>Guest Sign In
        </button>
      </div>
    );
  }
}

export default SignUpForm;
