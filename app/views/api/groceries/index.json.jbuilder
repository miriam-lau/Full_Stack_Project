@grocery_items.each do |grocery_item|
  json.partial! 'grocery_item', grocery_item: grocery_item
end
