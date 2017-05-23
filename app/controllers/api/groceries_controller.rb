class Api::GroceriesController < ApplicationController
  before_filter :require_signed_in

  def index
    items = Grocery.all
    @grocery_items = [];
    items.each do |item|
      if item.user_id == current_user.id
        @grocery_items.push(item)
      end
    end
    render :index
  end

  def new
    @grocery_item = Grocery.new
  end

  def create
    @grocery_item = Grocery.new(grocery_item_params)
    @grocery_item.user_id = current_user.id
    @grocery_item.purchased = false
    if @grocery_item.save
      render :show
    else
      render json: @grocery_item.errors.full_messages, status: 422
    end
  end

  def show
    @grocery_item = Grocery.find(params[:id])
  end

  def edit
    @grocery_item = Grocery.find(params[:id])
  end

  def update
    @grocery_item = current_user.groceries.find(params[:id])
    if @grocery_item.update_attributes(grocery_item_params)
      render :show
    else
      render json: @grocery_item.errors.full_messages, status: 422
    end
  end

  def destroy
    @grocery_item = Grocery.find(params[:id])
    @grocery_item.destroy
    render :show
  end

  private

  def grocery_item_params
    params.require(:grocery_item).permit(:name, :quantity, :unit,
      :category, :purchased)
  end
end
