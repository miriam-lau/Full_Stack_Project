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
  has_many: reminders

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

## Grocery
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
category        | string    |
name	          | string	  | not null
quantity	      | float  	  | not null
unit	          | string	  |
purchased       | boolean   | default: false
user_id         | integer   | not null, foreign key

#### Associations
- belongs_to :user

## Recipe
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
name	          | string	  | not null
image           | string    |
serving         | integer   |
rating          | float     |
description     | text      |
directions      | text      |
notes           | text      |
link            | string    |
user_id         | integer   | not null, foreign key

#### Associations
- belongs_to :user

## Reminder
column name	    | data type	| details
----------------|-----------|---------------------------------
id	            | integer	  | not null, primary key
name	          | string	  | not null
due_date        | string    |
user_id         | integer   | not null, foreign key

#### Associations
- belongs_to :user
