@search_items.each do |item|
  json.set! item.id do
    json.extract! item, :id, :category, :name, :quantity, :unit, :user_id
  end
end

# json.set! :grocery do
#   @search_grocery_items.each do |item|
#     json.set! item.id do
#       json.extract! item, :id, :category, :name, :quantity, :unit, :user_id
#     end
#   end
# end
#
# json.set! :pantry do
#   @search_pantry_items.each do |item|
#     json.set! item.id do
#       json.extract! item, :id, :category, :name, :quantity, :unit, :user_id
#     end
#   end
# end
