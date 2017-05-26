import { receiveAllSearchItems, receiveErrors} from '../actions/search_actions';

export const fetchAllSearchItems = (name) => {
  return $.ajax({
    method: "GET",
    url: "/api/search",
    data: name
  });
};
