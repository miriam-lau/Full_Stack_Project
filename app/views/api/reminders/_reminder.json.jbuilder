json.set! reminder.id do
  json.extract! reminder, :id, :name, :user_id, :due_date
end
