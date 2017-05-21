class PantryItemsAddUnitColumn < ActiveRecord::Migration[5.0]
  def change
    add_column(:pantry_items, :unit, :string)
  end
end
