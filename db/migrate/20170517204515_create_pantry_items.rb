class CreatePantryItems < ActiveRecord::Migration[5.0]
  def change
    create_table :pantry_items do |t|
      t.string :category
      t.string :name, null: false
      t.decimal :quantity, null: false
      t.string :unit, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
