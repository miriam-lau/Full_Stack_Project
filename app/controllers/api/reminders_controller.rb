class Api::RemindersController < ApplicationController
  before_filter :require_signed_in

  def index
    @reminders = current_user.reminders
    render :index
  end

  def create
    @reminder = Reminder.new(reminder_params)
    @reminder.user_id = current_user.id
    if @reminder.save
      render :show
    else
      render json: @reminder.errors.full_messages, status: 422
    end
  end

  def destroy
    reminder = Reminder.find(params[:id])
    @reminder_id = reminder.id
    reminder.destroy
    render :delete
  end

  private

  def reminder_params
    params.require(:reminder).permit(:name, :due_date)
  end
end
