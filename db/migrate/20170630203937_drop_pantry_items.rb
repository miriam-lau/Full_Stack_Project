class DropPantryItems < ActiveRecord::Migration[5.0]
  def change
    drop_table :pantry_items
  end
end
