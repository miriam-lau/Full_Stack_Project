class RecipeTableAddIngredientsRemoveNutrition < ActiveRecord::Migration[5.0]
  def change
    remove_column :recipes, :nutrition
  end
  add_column :recipes, :ingredients, :text
end
