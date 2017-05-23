class RemovePurchasedColFromGroceries < ActiveRecord::Migration[5.0]
  def change
    remove_column :groceries, :purchased
  end
end
