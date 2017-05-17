import { connect } from 'react-redux';
import { signin, signout, signup } from '../../actions/session_actions';
import SignUpForm from './sign_up_form';

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors
  }
};

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
