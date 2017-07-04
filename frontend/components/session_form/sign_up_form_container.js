import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SignUpForm from "./sign_up_form";
import { signin, signup } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors
  }
};

const mapDispatchToProps = (dispatch) => ({
  signin: user => dispatch(signin(user)),
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
