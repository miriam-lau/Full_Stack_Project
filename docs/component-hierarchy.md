Components:
App  // component at the root
----------------------------------------------------------------------
  AuthFormContainer
    AuthForm

  HomeContainer
    Home
    Sidebar
----------------------------------------------------------------------

  GroceryContainer //all the items in the list
    Grocery

  NewGroceryItemContainer //adding a new item in list
    NewGroceryItemForm

  GroceryItemDetailContainer //view an item in the list through Search
    GroceryItemDetail

  UpdateGroceryItemContainer //update an existing item from list
    UpdateGroceryItemForm

  RemoveGroceryItemContainer //remove an item from list
    RemoveGroceryItem
  ----------------------------------------------------------------------

  PantryContainer //all the items in the pantry
    Pantry

  NewPantryItemContainer //adding a new item in pantry list
    NewPantryItemForm

  PantryItemDetailContainer //view an item in pantry list through Search
    PantryItemDetail

  UpdatePantryItemContainer //update an existing item from list
    UpdatePantryItemForm

  RemovePantryItemContainer //remove an item from pantry list
    RemovePantryItem
  ----------------------------------------------------------------------

  SearchResultsContainer
    Search
  ----------------------------------------------------------------------

  RecipesContainer //all recipes in recipes
    Recipes

  NewRecipeContainer //adding a new recipe
    NewRecipeForm

  RecipeDetailContainer //show a recipe page
    RecipeDetail

  UpdateRecipeContainer //update an existing recipe
    UpdateRecipeForm

  RemoveRecipeContainer
    RemoveRecipe



Routes
path="/" component={App}

path="/signup" component={AuthFormContainer} 	
path="/signin"	component={AuthFormContainer}

path="/home"	component={HomeContainer}

Index and Show Routes?
path="/grocery"	component={GroceryContainer}
path="/grocery/:id"	component={GroceryItemDetailContainer}
path="/grocery/:id"	component={NewGroceryItemContainer}
path="/grocery/:id"	component={UpdateGroceryItemContainer}
path="/grocery/:id"	component={RemoveGroceryItemContainer}

path="/pantry"	component={PantryContainer}
path="/pantry/:id"	component={NewPantryItemContainer}
path="/pantry/:id"	component={PantryItemDetailContainer}
path="/pantry/:id"	component={UpdatePantryItemContainer}
path="/pantry/:id"	component={RemovePantryItemContainer}

path="/search"	component={Search}

Index and Show Routes?
path="/recipes"	component={RecipeContainer}
path="/new-recipe"	component={NewRecipeContainer}
path="/recipes/:id"	component={RecipeDetailContainer}
path="/recipes/:id"	component={UpdateRecipeContainer}
path="/recipes/:id"	component={RemoveRecipeContainer}
