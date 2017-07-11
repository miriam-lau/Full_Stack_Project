class Api::RecipesController < ApplicationController
  before_filter :require_signed_in

  def index
    @recipes = current_user.recipes
    render :index
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user_id = current_user.id
    if @recipe.save
      render :show
    else
      render json: @recipe.errors.full_messages, status: 422
    end
  end

  def show
    @recipe = current_user.recipes.find(params[:id])
  end

  def update
    @recipe = current_user.recipes.find(params[:id])
    if @recipe.update_attributes(recipe_params)
      render :show
    else
      render json: @recipe.errors.full_messages, status: 422
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    @recipe_id = recipe.id
    recipe.destroy
    render :delete
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :serving, :rating, :description, :ingredients, :directions, :notes, :link, :image_url, :user_id)
  end
end
