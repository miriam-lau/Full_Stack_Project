import { connect } from 'react-redux';
import { signout } from '../../actions/session_actions';
import {withRouter} from 'react-router-dom';
import PersonalGreeting from './personal_greeting';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonalGreeting));
