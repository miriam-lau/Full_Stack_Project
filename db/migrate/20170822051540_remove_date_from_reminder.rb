class RemoveDateFromReminder < ActiveRecord::Migration[5.0]
  def change
    remove_column :reminders, :due_date
  end
end
