import { connect } from 'react-redux';
import { signout, receiveErrors } from '../../actions/session_actions';
import {withRouter} from 'react-router-dom';
import Greeting from './greeting';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Greeting));
