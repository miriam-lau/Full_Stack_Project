import { connect } from 'react-redux';
import { signin } from '../../actions/session_actions';
import Home from './home.jsx';


const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch) => ({
  receiveCurrentUser: user => dispatch(signin(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
