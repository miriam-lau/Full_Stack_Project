import { connect } from 'react-redux';
import { signin, signup, receiveErrors } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

import ModalForm from './modal_form';

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  signin: user => dispatch(signin(user)),
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalForm));
