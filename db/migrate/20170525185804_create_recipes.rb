class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.string :image
      t.integer :serving
      t.string :nutrition
      t.float :rating
      t.text :description
      t.text :directions
      t.text :notes
      t.string :link
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
