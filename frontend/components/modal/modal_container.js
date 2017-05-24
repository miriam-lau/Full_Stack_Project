import { connect } from 'react-redux';
import { signin, signup } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

import ModalForm from './modal_form';

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: user => dispatch(signin(user)),
  signUpUser: user => dispatch(signup(user)),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalForm));
