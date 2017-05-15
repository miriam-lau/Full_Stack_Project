Users
column name	    | data type	| details
-----------------------------------------------------------
id	            | integer	  | not null, primary key
username	      | string	  | not null, indexed, unique
email	          | string	  | not null, indexed, unique
password_digest	| string	  | not null
session_token	  | string	  | not null, indexed, unique


Grocery
column name	    | data type	| details
------------------------------------------------------------
id	            | integer	  | not null, primary key
name	          | string	  | not null
quantity	      | integer	  | not null
unit	          | string	  | not null
user_id         | integer   | not null, foreign key
Grocery will associate with Pantry and Recipe through User
Grocery will associate with Ingredients through Recipe


Pantry
column name	    | data type	| details
------------------------------------------------------------
id	            | integer	  | not null, primary key
category        | string    | not null
name	          | string	  | not null
quantity	      | integer	  | not null
unit	          | string	  | not null
user_id         | integer   | not null, foreign key
Pantry will associate with Grocery and Recipe through User
Pantry will associate with Ingredients through Recipe


Recipe
column name	    | data type	| details
------------------------------------------------------------
id	            | integer	  | not null, primary key
name	          | string	  | not null
user_id         | integer   | not null, foreign key
Recipe will associate with Ingredients through recipe_id


Ingredient
column name	    | data type	| details
------------------------------------------------------------
id	            | integer	  | not null, primary key
name	          | string	  | not null
quantity	      | integer	  | not null
unit	          | string	  | not null
recipe_id       | integer   | not null, foreign key
Ingredients will associate with Recipe through recipe_id
