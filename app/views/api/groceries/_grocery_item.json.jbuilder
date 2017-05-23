json.set! grocery_item.id do
  json.extract! grocery_item, :id, :category, :name, :quantity, :unit,
    :user_id, :purchased
end
