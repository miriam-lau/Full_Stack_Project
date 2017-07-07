class CreateReminders < ActiveRecord::Migration[5.0]
  def change
    create_table :reminders do |t|
      t.string :name, null: false
      t.date :due_date
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
