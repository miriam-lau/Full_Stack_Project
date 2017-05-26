@search_items.each do |item|
  json.set! item.id do
    json.extract! item, :id, :category, :name, :quantity, :unit, :user_id
  end
end
