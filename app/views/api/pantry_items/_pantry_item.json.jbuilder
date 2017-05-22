json.set! pantry_item.id do
  json.extract! pantry_item, :id, :category, :name, :quantity, :unit, :user_id
end
