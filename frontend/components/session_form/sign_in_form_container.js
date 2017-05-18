import { connect } from 'react-redux';
import { signin, signout, signup, receiveErrors } from '../../actions/session_actions';
import SignInForm from './sign_in_form';

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors
  }
};

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: user => dispatch(signin(user)),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
