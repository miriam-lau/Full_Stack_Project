import React from 'react';
import { Link } from 'react-router-dom';
// import SignUpFormContainer from './sign_up_form_container';
import ModalForm from '../modal/modal_form'

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
    console.log("in signInForm handle submit");
    console.log(this.props);
    this.props.signin({user})
      .then( () => {
        console.log("sign in form in handle submit 2");
        console.log(this);
        console.log(this.props);
        console.log(this.props.history);
        this.props.history.push('/pantry_items');
      })
  }

  handleGuestSignIn(event) {
    event.preventDefault();
    const user = {username: 'guest', password: 'password'};
    this.props.signin({user}).then( () => {this.props.history.push('/pantry_items');
    })
  }

  renderErrors() {
    let signInErrors = (this.props.errors == undefined ? [] : this.props.errors);
    console.log("sign in form render errors");
    console.log(this.props.errors);
    return (
      <div >
        <ul className="sign-up-error">
        { signInErrors.map((error, i) => (
          <li key={`error-${i}`}>{ error }</li>
        ))}
      </ul>
    </div>
    );
  }

  render() {
    console.log("in sign-in form");
    console.log(this.props);
    return(
      <div className="session-form-container">
        <form onSubmit={ this.handleSubmit }>
          <div className="form-greeting">
            <h3>myPantry</h3>
          </div>
          <br />

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
            <div>
              { this.renderErrors() }
            </div>
            <br />

            <input className="session-button" type="submit" value="Sign In" />
          </div>
        </form>
        <div className="session-form">
          <br />
          <br />
          <h3 className="session-question">New to Pantry?</h3>
          <br />
          <div className="button-link">
            <ModalForm
              signInForm={false}
              signup={this.props.signup}
              errors={this.props.errors}
              clearErrors={this.props.clearErrors}
            />
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
