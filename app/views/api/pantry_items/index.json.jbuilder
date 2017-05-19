@pantry_items.each do |pantry_item|
  json.partial! 'pantry_item', pantry_item: pantry_item
end
