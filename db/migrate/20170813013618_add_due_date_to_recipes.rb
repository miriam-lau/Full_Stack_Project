class AddDueDateToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :due_date, :string
  end
end
