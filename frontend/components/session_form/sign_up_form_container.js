import { connect } from 'react-redux';
import { signin, signout, signup } from '../../actions/session_actions';
import SignUpForm from './sign_up_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors
  }
};

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: user => dispatch(signup(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
