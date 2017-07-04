import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Main from "./main";
import { signin, signup, signout, receiveErrors } from "../../actions/session_actions";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
