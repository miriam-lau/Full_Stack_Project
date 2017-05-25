class ChangeRecipeImageColName < ActiveRecord::Migration[5.0]
  def change
    remove_column :recipes, :image
  end
  add_column :recipes, :image_url, :string
end
