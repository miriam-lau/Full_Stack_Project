class AddDateToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column(:recipes, :due_date, :date)
  end
end
