import { connect } from "react-redux";

import Home from "./home.jsx";
import { signin, signup, clearErrors } from "../../actions/session_actions";


const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: user => dispatch(signin(user)),
  signin: user => dispatch(signin(user)),
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
