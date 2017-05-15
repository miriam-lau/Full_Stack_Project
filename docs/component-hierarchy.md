Components:
  AuthFormContainer
    AuthForm

  HomeContainer
    Home
    Sidebar
  ----------------------------------------------------------------------

  GroceryContainer //all the items in the grocery list
    Grocery

  NewGroceryItemContainer //adding a new item in grocery list
    NewGroceryItem

  DeleteGroceryItemContainer
    DeleteGroceryItem
  ----------------------------------------------------------------------

  PantryContainer //all the items in the pantry
    Pantry

  NewPantryItemContainer //adding a new item in pantry list
    NewPantryItem

  DeletePantryItemContainer
    DeletePantryItem
  ----------------------------------------------------------------------

  SearchResultsContainer
    Search
  ----------------------------------------------------------------------

  RecipesContainer
    Recipes

  RecipeDetailContainer
    RecipeDetail

  NewRecipeFormContainer
    NewRecipeForm

  DeleteRecipeContainer
    DeleteRecipe


Routes

Path	Component
"/signup"	"AuthFormContainer"
"/signin"	"AuthFormContainer"
"/home"	"HomeContainer"
"/grocery"	"GroceryContainer"
"/pantry"	"PantryContainer"
"/search"	"Search"

"/recipes"	"RecipeContainer"
"/recipes/:id"	"RecipeDetailContainer"
"/new-recipe"	"NewRecipeFormContainer"
