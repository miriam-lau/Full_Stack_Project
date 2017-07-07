@reminders.each do |reminder|
  json.partial! 'reminder', reminder: reminder
end
