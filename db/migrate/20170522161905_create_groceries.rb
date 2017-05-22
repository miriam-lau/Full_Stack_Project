class CreateGroceries < ActiveRecord::Migration[5.0]
  def change
    create_table :groceries do |t|
      t.string :category
      t.string :name, null: false
      t.decimal :quantity, null: false
      t.string :unit
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
