class PantryItemsRemoveNullFromUnit < ActiveRecord::Migration[5.0]
  def change
    remove_column(:pantry_items, :unit)
  end
end
