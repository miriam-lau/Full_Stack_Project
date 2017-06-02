# Schema

## Users
column name	    | data type	| details
----------------|-----------|--------------------------------
id	            | integer	  | not null, primary key
username	      | string	  | not null, indexed, unique
email	          | string	  | not null, indexed, unique
password_digest	| string	  | not null
session_token	  | string	  | not null, indexed, unique

#### Associations
- has_one :grocery
- has_one :pantry
- has_many: recipes


## Grocery
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
category        | string    |
name	          | string	  | not null
quantity	      | float  	  | not null
unit	          | string	  |
user_id         | integer   | not null, foreign key

#### Associations
- belongs_to :user
- Grocery will associate with Pantry through User
- Grocery will associate with Recipe through User
- Grocery will associate with Ingredients through Recipe


## Pantry
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
category        | string    |
name	          | string	  | not null
quantity	      | decimal   | not null
unit	          | string	  |
user_id         | integer   | not null, foreign key

#### Associations
- belongs_to :user
- Pantry will associate with Grocery through User
- Pantry will associate with Recipe through User
- Pantry will associate with Ingredients through Recipe


## Recipe
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
name	          | string	  | not null
image           | string    |
serving         | integer   |
nutrition       | string    |
rating          | float     |
description     | text      |
directions      | text      |
notes           | text      |
link            | string    |
user_id         | integer   | not null, foreign key

#### Associations
- belongs_to :user
- has_many :recipe_ingredients


## RecipeIngredient
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
category        | string    |
name	          | string	  | not null
quantity	      | integer	  | not null
unit	          | string	  | not null
recipe_id       | integer   | not null, foreign key

#### Associations
- belongs_to: recipe
