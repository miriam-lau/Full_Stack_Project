import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SearchResults from './search_results';
// import { requestAllSearchItems } from '../../actions/search_actions';

const mapStateToProps = (state) => ({
  searchItems: state.search.searchItems
});


export default withRouter(connect(mapStateToProps, null)(SearchResults));
