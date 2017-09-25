# Development of *myPantry*

## Summary
This application allows users to keep track of what's in their pantry, with functions to add, update, and delete pantry items. Users can also add, update and delete items to their grocery, and transfer purchased items to their pantry. Users can add, update and delete recipes, and set reminders and their due dates.


## MVP Checklist and Implementation Timeline

#### Phase I (2 days): Create wireframes and proposal
- Frontend: Design website, create wireframes, and React component hierarchy.
- Backend: Define API endpoints.
- Database: Design database schema and how the sample state will look.

#### Phase II (2 days): New account creation, sign in, and guest login
- Backend setup with a functioning *Rails* project.
- Frontend user authentication.

#### Phase III (4 days): Create model, controller, API, and React components for pantry and grocery
- Adding pantry and grocery items will be user entered data in a single line (e.g. "3 cups milk") with error handling for incorrect string inputs. Implement function to split up input string into quantity, unit, and item before saving to the database.
- Inline editing of pantry and grocery items with error handling.
- User can delete pantry and grocery items.
- Implement functions and event handlers to transfer grocery items to "purchased", and add to pantry. Grocery items added to pantry will combine duplicate items.

#### Phase IV (2 days): Create model, controller, API, and React components for reminders
- User can create and delete reminders, and optionally set due dates for reminders.
- Reminders with due dates will be assigned to date categories (e.g. "Due Today", "Upcoming Reminders", etc).

#### Phase V (1 day): Create React components for Search, User Guide, and Conversion Calculator
- User can search for an item in their pantry and grocery, and if found, will return a list of that item's quantity and unit.
- User can click on the info icon to open the "User Guide". The drawer provides information on how to use the application.
- User can click on the calculator icon to open the "Conversion Calculator". User can convert between units using the "Conversion Calculator".

#### Phase VI (3 days): Create logo, apply CSS styling, and obtain user feedback
- Create custom logo and favicon for application.
- Apply color schema and CSS styling using wireframes as a guide.
- Obtain user data on UI and UX, and implement changes due to feedback.

#### Phase VII (1 day): A production README and launching on Heroku
- Create a production README, include backend and frontend technologies used, and future implementations.
- Host application on *Heroku* and implement changes (if needed).

#### Bonus (2 days): Create model, controller, API, and React components for recipes
- User can add or update a recipe by using either the new recipe or update recipe form. Forms include allowing the user to upload a custom image, or a default image will be provided.
- User can delete recipes.
- User can click on the recipe image in the recipe index page to be taken to the recipe detail page.
- In the detail page, a user can edit or delete the recipe.
