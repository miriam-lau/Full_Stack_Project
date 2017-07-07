json.set! reminder.id do
  json.extract! list, :id, :name, :user_id, :due_date
end
