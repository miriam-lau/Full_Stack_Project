# Components Hierarchy

**App**
- Component at the root

**AuthForm Container**
- AuthForm

**Home Container**
- Home
  + Carousel
  + SignIn, SignUp

**Greeting Container**
- Personal Greeting
  + Navigation Bar
    + Search Container
      + Search
    + User Guide
    + Conversion Calculator
    + SignOut
  + Sidebar
    + Grocery Index Container
    + Pantry Index Container
    + Recipe Index Container

**Grocery Index Container**
- Grocery Index
  + Grocery Index Item
  + Grocery Form
- Purchased Groceries

**Pantry Index Container**
- Pantry Index
  + Pantry Index Item
  + Pantry Form
- Reminder Index
  + Reminder Items

**Recipe Index Container**
- New Recipe Form
- Recipe Index Item
  + Recipe Detail
    + Update Recipe Form


# Routes

| Path            | Component                                            |
|-----------------|------------------------------------------------------|
| /               | App                                                  |
| /signup         | AuthFormContainer                                    |
| /signin         | AuthFormContainer                                    |
| /home           | HomeContainer                                        |
| /pantry_items   | PantryIndex, PantryIndexItem, NewPantryItemForm,     |
|                 |   UpdatePantryItem, ReminderIndex, ReminderIndexItem |
| /groceries      | GroceryIndex, GroceryIndexItem, NewGroceryItemForm,  |
|                 |   UpdateGroceryItem                                  |
| /recipes        | RecipeIndex                                          |
| /recipes/new    | NewRecipeForm                                        |
| /recipes/:id    | RecipeDetail, UpdateRecipe                           |
