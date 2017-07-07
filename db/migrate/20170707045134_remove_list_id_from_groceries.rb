class RemoveListIdFromGroceries < ActiveRecord::Migration[5.0]
  def change
    remove_column :groceries, :list_id
  end
end
