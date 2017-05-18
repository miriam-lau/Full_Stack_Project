@pantry_items.each do |pantry_item|
  json.set! pantry_item.id do
    json.partial! 'pantry_item', pantry_item: pantry_item
  end
end
