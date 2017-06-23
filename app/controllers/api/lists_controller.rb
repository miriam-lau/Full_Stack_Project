class Api::ListsController < ApplicationController
  before_filter :require_signed_in

  def index
    all_lists = List.all
    @lists = [];
    all_lists.each do |each_list|
      if each_list.user_id == current_user.id
        @lists.push(each_list)
      end
    end
    render :index
  end

  def new
    @list = List.new
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

  def show
    @list = List.find(params[:id])
  end

  def edit
    @list = List.find(params[:id])
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
    @list = List.find(params[:id])
    @list.destroy
    render :show
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end
