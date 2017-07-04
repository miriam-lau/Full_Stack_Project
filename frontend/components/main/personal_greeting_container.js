import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PersonalGreeting from "./personal_greeting";
import { signout } from "../../actions/session_actions";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonalGreeting));
