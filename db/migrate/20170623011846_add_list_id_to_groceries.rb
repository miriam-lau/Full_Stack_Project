class AddListIdToGroceries < ActiveRecord::Migration[5.0]
  def change
    add_column(:groceries, :list_id, :integer)
  end
end
