```js
{
  currentUser: {
    id: 1,
    username: "app-academy",
    email: "A@app-apademy.com",
    password_digest: "string",
    session_token: "string"
  },
  forms: {
    signUp: {errors: []},
    signIn: {errors: []},
    errors: {errors: ["body can't be blank"]}
  },
  grocery: {
    1: {
      id: 1,
      name: "item",
      quantity: 2,
      unit: "string",
      user_id: 1,
    }
  },
  pantry: {
    1: {
      id: 1,
      category: "dairy",
      name: "eggs",
      quantity: 4,
      unit: "string",
      user_id: 1,
    },
    2: {
      id: 2,
      category: "dairy",
      name: "milk",
      quantity: 1,
      unit: "string",
      user_id: 1,
    },
    3: {
      id: 3,
      category: "beverages",
      name: "tea",
      quantity: 2,
      unit: "string",
      user_id: 1,
    }
  },
  recipe: {
    1: {
      id: 1
      name: "string",
      user_id: 1,
    }
  },
  recipeDetail: {
    1: {
        id: 1,
        ingredients: {
          1: { id: 1, name: "string", quantity: 2, unit: "string" },
          2: { id: 2, name: "string", quantity: 1, unit: "string" },
        },
        servings: "string",
        nutrition: "string",
        rating: number,
        description: "string",
        directions: "text",
        notes: "string",
        link: "string",  
        recipe_id: 1
    }
  },
  reminder: {
    1: {
      id: 1
      name: "string"
      user_id: 1,
    }
  }
}
```
