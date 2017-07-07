export const fetchAllReminders = () => {
  return $.ajax({
    method: "GET",
    url: "/api/reminders"
  });
};

export const fetchReminder = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/reminders/${id}`
  });
};

export const createReminder = (list) => {
  return $.ajax({
    method: "POST",
    url: "api/reminders",
    data: list
  });
};

export const updateReminder = (list) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/reminders/${list.list.id}`,
    data: list
  });
}

export const deleteReminder = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/reminders/${id}`
  });
}
