class AddDateTypeStringToReminders < ActiveRecord::Migration[5.0]
  def change
    add_column :reminders, :due_date, :string
  end
end
