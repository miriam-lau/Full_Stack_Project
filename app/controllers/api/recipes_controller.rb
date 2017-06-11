class Api::RecipesController < ApplicationController
  before_filter :require_signed_in

  def index
    allRecipes = Recipe.all
    @recipes = [];
    allRecipes.each do |recipe|
      if recipe.user_id == current_user.id
        @recipes.push(recipe)
      end
    end
    puts @recipes
    render :index
  end

  def new
    @recipe = Recipe.new
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
    @recipe = Recipe.find(params[:id])
  end

  def edit
    @recipe = Recipe.find(params[:id])
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
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    render :show
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :image, :serving, :nutrition,
      :rating, :description, :directions, :notes, :link, :user_id)
  end
end
