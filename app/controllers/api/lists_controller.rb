class Api::ListsController < ApplicationController
  before_filter :require_signed_in

  def index
    @lists = current_user.lists
    render :index
  end

  def create
    @list = List.new(list_params)
    @list.user_id = current_user.id
    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def update
    @list = current_user.lists.find(params[:id])
    if @list.update_attributes(list_params)
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def destroy
    list = List.find(params[:id])
    @list_id = list.id
    list.destroy
    render :delete
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end
