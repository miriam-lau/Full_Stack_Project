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
  + Search Container
    + Search
  + Sidebar
    + Grocery Index Container
    + Pantry Index Container
  + Guide
  + Measurements
  + SignOut

**Grocery Index Container**
- Grocery Index
  + Grocery Index Item
  + Grocery Form

**Pantry Index Container**
- Pantry Index
  + Pantry Index Item
  + Pantry Form


# Routes

| Path                   | Component               |
|------------------------|-------------------------|
| /                      | App                     |
| /signup                | AuthFormContainer       |
| /signin                | AuthFormContainer       |
| /home                  | HomeContainer           |
| /groceries             | GroceryContainer        |
| /groceries/new         | GroceryFormContainer    |
| /groceries/:id/edit    | Update                  |
| /groceries/:id         | Show                    |
| /groceries/:id         | Delete                  |
| /pantry_items          | PantryItemContainer     |
| /pantry_items/new      | PantryItemFormContainer |
| /pantry_items/:id/edit | Update                  |
| /pantry_items/:id      | Show                    |
| /pantry_items/:id      | Delete                  |
