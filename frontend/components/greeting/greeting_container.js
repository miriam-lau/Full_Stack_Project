import { connect } from 'react-redux';
import { signout, receiveErrors } from '../../actions/session_actions';
import Greeting from './greeting';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
