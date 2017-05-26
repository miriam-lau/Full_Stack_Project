import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SearchForm from './search_form';
import { requestAllSearchItems } from '../../actions/search_actions';

const mapStateToProps = (state) => ({
  searchItems: state.searchItems,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllSearchItems: (name) => dispatch(requestAllSearchItems(name))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
