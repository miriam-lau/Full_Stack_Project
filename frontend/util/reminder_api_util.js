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

export const createReminder = (reminder) => {
  return $.ajax({
    method: "POST",
    url: "api/reminders",
    data: reminder
  });
};

export const updateReminder = (reminder) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/reminders/${reminder.reminder.id}`,
    data: reminder
  });
}

export const deleteReminder = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/reminders/${id}`
  });
}
