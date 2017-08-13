class ChangeDueDateInReminderController < ActiveRecord::Migration[5.0]
  def change
    remove_column :recipes, :due_date
  end
end
