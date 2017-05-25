@recipes.each do |recipe|
  json.partial! 'recipe', recipe: recipe
end
