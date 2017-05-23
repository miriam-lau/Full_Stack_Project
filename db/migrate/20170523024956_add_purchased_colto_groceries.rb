class AddPurchasedColtoGroceries < ActiveRecord::Migration[5.0]
  def change
    add_column :groceries, :purchased, :boolean, :default => false
  end
end
