import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SearchResults from "./search_results";

const mapStateToProps = (state) => ({
  searchItems: state.search.searchItems
});


export default withRouter(connect(mapStateToProps, null)(SearchResults));
