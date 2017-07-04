export const fetchAllSearchItems = (name) => {
  return $.ajax({
    method: "GET",
    url: "/api/search",
    data: name
  });
};
