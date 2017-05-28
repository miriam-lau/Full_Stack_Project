# myPantry

## Summary
This website keeps track of a user's pantry items, and allows
the user to create grocery lists and add recipes.


## MVP Checklist

Step 1: New account creation, login, and guest/demo login

Step 2: A production README

Step 3: Hosting on Heroku

Step 4: Phases
- Phase 1: Tasks: User can add, update, and delete grocery items.
- Phase 2: Lists: User can make grocery shopping lists and transfer items to "purchased" list.
- Phase 3: List summary (time, num tasks, num completed): User can transfer
purchases to pantry, and pantry will auto-update. Once updated, pantry
will make a note of the last date the item was updated.
- Phase 4: Search: Users can search for a pantry item and once item is
found, the site will auto-scroll to that item.
- Bonus 1: Recipe page where users can search for recipes. User can click on
a recipe to be taken to that recipe's show page. User can rate and
delete a recipe. User can add a new recipe.
- Bonus 2: Pantry will cross-check ingredients for a recipe with a user's pantry
and auto-generate a grocery list with missing items.  User can import
recipes from another site, and pantry will extract out the ingredients
and auto-generate the ingredient list for the user.


## Implementation Timeline
- Step 1: Backend setup and Front End User Authentication (2 days).
Objective: Functioning rails project with front-end Authentication

- Phase 1: Tasks- Model, API, and components (2 days). Objectives:  
User can add, update, and delete grocery items.

- Phase 2: Model, API, and components (2 days). Objective: Grocery lists
can be created, read, edited and destroyed through the API.

- Phase 3: Pantry (2 days). Objective: Pantry items can be created, read,
edited and destroyed through the API.

- Phase 4: Search (1 day). Objective: Pantry and grocery items are searchable.

- Bonus 1: Add Recipe Page (1 day, W2 Th 6pm). Objective: Add RecipeScreen,
RecipeView, and create a form to add a new recipe.
- Bonus 2: Objective: Pantry items are cross-checked with recipe ingredients
before generation of grocery list. Recipes can be imported from other websites.
