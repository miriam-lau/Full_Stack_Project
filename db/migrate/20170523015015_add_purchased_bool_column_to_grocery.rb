class AddPurchasedBoolColumnToGrocery < ActiveRecord::Migration[5.0]
  def change
    add_column(:groceries, :purchased, :boolean)
  end
end
