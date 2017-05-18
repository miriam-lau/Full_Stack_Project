# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
PantryItem.destroy_all


guest = User.create(username: "guest", password: "password",
  email: "guest@pantry.com")

pantry1 = PantryItem.create(category: "fruit", name: "apple",
  quantity: 2, unit: "each", user_id: guest.id)
pantry2 = PantryItem.create(category: "fruit", name: "orange",
  quantity: 1, unit: "each", user_id: guest.id)
pantry3 = PantryItem.create(category: "dairy", name: "eggs",
  quantity: 12, unit: "each", user_id: guest.id)
pantry4 = PantryItem.create(category: "dairy", name: "cheese",
  quantity: 5.5, unit: "ounce", user_id: guest.id)
pantry5 = PantryItem.create(category: "beverage", name: "beer",
  quantity: 4, unit: "each", user_id: guest.id)


mir = User.create(username: "mir", password: "password",
  email: "mir@pantry.com")

pantry6 = PantryItem.create(category: "fruit", name: "mango",
  quantity: 4, unit: "each", user_id: mir.id)
pantry7 = PantryItem.create(name: "brussel sprouts",
  quantity: 10, unit: "ounce", user_id: mir.id)
pantry8 = PantryItem.create(category: "meat", name: "steak",
  quantity: 1, unit: "each", user_id: mir.id)
pantry9 = PantryItem.create(category: "bakery", name: "french bread",
  quantity: 1, unit: "loaf", user_id: mir.id)
pantry10 = PantryItem.create(category: "beverage", name: "rootbeer",
  quantity: 4, unit: "each", user_id: mir.id)
