class Api::SearchController < ApplicationController
  # TODO: current_user.groceries... restrict query to user and item.
  def search
    search_grocery = Grocery.where("lower(name) LIKE '%#{params[:name].downcase}%'")
    search_pantry = PantryItem.where("lower(name) LIKE '%#{params[:name].downcase}%'")

    @search_items = [];
    search_grocery.each do |item|
      if item.user_id == current_user.id
        @search_items.push(item)
      end
    end
    search_pantry.each do |item|
      if item.user_id == current_user.id
        @search_items.push(item)
      end
    end

    # TODO: updated search function in progress
    # @search_grocery_items = []
    # @search_pantry_items = []
    # search_grocery.each do |item|
    #   if item.user_id == current_user.id
    #     @search_grocery_items.push(item)
    #   end
    # end
    # search_pantry.each do |item|
    #   if item.user_id == current_user.id
    #     @search_pantry_items.push(item)
    #   end
    # end

    render :search
  end
end
