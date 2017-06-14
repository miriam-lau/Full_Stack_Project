class Api::PantryItemsController < ApplicationController
  before_filter :require_signed_in

  def index
    items = PantryItem.all
    @pantry_items = [];
    items.each do |item|
      if item.user_id == current_user.id
        @pantry_items.push(item)
      end
    end
    p @pantry_items
    render :index
  end

  # def new
  #   @pantry_item = PantryItem.new
  # end

  def create
    @pantry_item = PantryItem.new(pantry_item_params)
    @pantry_item.user_id = current_user.id
    if @pantry_item.save
      render :show
    else
      render json: @pantry_item.errors.full_messages, status: 422
    end
  end

  def show
    @pantry_item = PantryItem.find(params[:id])
  end

  def edit
    @pantry_item = PantryItem.find(params[:id])
  end

  def update
    @pantry_item = current_user.pantry_items.find(params[:id])
    if @pantry_item.update_attributes(pantry_item_params)
      render :show
    else
      render json: @pantry_item.errors.full_messages, status: 422
    end
  end

  def destroy
    @pantry_item = PantryItem.find(params[:id])
    @pantry_item.destroy
    render :show
  end

  def search
    search_grocery = Grocery.where("lower(name) LIKE '%#{params[:name].downcase}%'")
    search_pantry = PantryItem.where("lower(name) LIKE '%#{params[:name].downcase}%'")
    @search_items = []
    search_grocery.each do |item|
      @search_items.push(item)
    end
    search_pantry.each do |item|
      @search_items.push(item)
    end

    render json: @search_items
  end

  private

  def pantry_item_params
    params.require(:pantry_item).permit(:name, :quantity, :unit,
      :category)
  end
end
