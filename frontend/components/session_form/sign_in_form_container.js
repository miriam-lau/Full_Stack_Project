import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SignInForm from "./sign_in_form";
import { signin, receiveErrors } from "../../actions/session_actions";

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  signin: user => dispatch(signin(user)),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm));
