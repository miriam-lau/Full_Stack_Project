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
      id: 1,
      category: "dairy",
      name: "milk",
      quantity: 1,
      unit: "string",
      user_id: 1,
    },
    3: {
      id: 1,
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
  ingredient: {
    1: {
      id: 1
      name: "string",
      quantity: 2,
      unit: "string",
      recipe_id: 1,
    },
    2: {
      id: 1
      name: "string",
      quantity: 1,
      unit: "string",
      recipe_id: 1,
    }
  }
}
