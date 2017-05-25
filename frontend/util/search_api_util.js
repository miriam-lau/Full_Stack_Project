import { receiveAllSearchItems, receiveErrors} from '../actions/search_actions';

export const fetchAllSearchItems = (value) => {
  return $.ajax({
    method: "GET",
    url: "/api/search",
    data: value
  });
};
