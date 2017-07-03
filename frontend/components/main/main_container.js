import { connect } from 'react-redux';
import { signin, signup, signout, receiveErrors } from '../../actions/session_actions';
import {withRouter} from 'react-router-dom';
import Main from './main';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
  signin: user => dispatch(signin(user)),
  signup: user => dispatch(signup(user)),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
