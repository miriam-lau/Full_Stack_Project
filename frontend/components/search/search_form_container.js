import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SearchForm from "./search_form";
import { requestAllSearchItems, receiveAllSearchItems } from "../../actions/search_actions";

const mapStateToProps = (state) => ({
  searchItems: state.search.searchItems,
  errors: state.search.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllSearchItems: (name) => dispatch(requestAllSearchItems(name)),
  receiveAllSearchItems: (searchItems) => dispatch(receiveAllSearchItems(searchItems))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
