json.set! recipe.id do
  json.extract! recipe, :id, :name, :image_url, :serving, :nutrition, :rating,
    :description, :directions, :notes, :link, :user_id
end
