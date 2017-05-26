myPantry

myPantry is a web application for cooking enthusiasts. Inspired by
RemembertheMilk, myPantry allows users to add items to their pantry,
update and delete current pantry items, make grocery lists and
update their pantry with purchased grocery items.

myPantry is a personal project by Meiyen Lau.

Link: https://mypantry.herokuapp.com/


Features
- Users can create accounts with secure authentication
- Add pantry and grocery items.
- Update and delete pantry and grocery items.
- Generate grocery lists and add items to "Purchased". Move items from
  "Purchased" list back to grocery list.
- Auto-update your pantry with "Purchased" grocery items.
- Searching for items in your grocery list and pantry.


Project Design
myPantry was designed and built in ~2 weeks.

A proposal was drafted to with an implementation timeline
during the development process.

A database schema was prepared in addition to the design proposal.


Technology
myPantry is a single-page application built on Rails and React.js, with
dependencies on both the backend and frontend.

Backend:
-Hosted on Heroku.
-Runs on Ruby on Rails.
-Database: PostgresSQL.
-Secure Authentication: BCrypt.

Frontend:
-npm: Node package manager for dependencies.
-Webpack: bundler for components.
-React & Redux: located in the frontend folder, includes React-DOM and React-Router.
-Babel: for transpiling jsx to Javascript.
-Material-ui: library for text input and icons, includes FontIcons, Text Field, and AutoComplete.

Future Implementations
In the future, myPantry will allow users to upload and create Recipes,
and generate grocery lists from recipes after cross-checking a user's pantry.
