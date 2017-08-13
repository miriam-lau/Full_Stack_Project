json.set! recipe.id do
  json.extract! recipe, :id, :name, :image_url, :serving, :rating,
    :ingredients, :description, :directions, :notes, :link, :due_date, :user_id
end
