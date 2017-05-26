# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
PantryItem.destroy_all
Grocery.destroy_all


guest = User.create(username: "guest", password: "password",
  email: "guest@pantry.com")

pantry1 = PantryItem.create(category: "", name: "Apple",
  quantity: 2, unit: "", user_id: guest.id)
pantry2 = PantryItem.create(category: "", name: "Orange",
  quantity: 1, unit: "", user_id: guest.id)
pantry3 = PantryItem.create(category: "", name: "Watermelon",
  quantity: 12, unit: "cups", user_id: guest.id)
pantry4 = PantryItem.create(category: "", name: "Blueberry",
  quantity: 5.5, unit: "ounce", user_id: guest.id)
pantry5 = PantryItem.create(category: "", name: "Strawberry",
  quantity: 4, unit: "ounce", user_id: guest.id)

grocery1 = Grocery.create(category: "", name: "Banana",
  quantity: 2, unit: "", user_id: guest.id, purchased: false)
grocery2 = Grocery.create(category: "", name: "Mango",
  quantity: 3, unit: "", user_id: guest.id, purchased: false)
grocery3 = Grocery.create(category: "", name: "Pineapple",
  quantity: 2, unit: "cups", user_id: guest.id, purchased: false)

recipe1 = Recipe.create(name: "Fettuccine Alfredo", serving: 4,
  nutrition: "", rating: 4.8, description: "", directions: "", notes: "",
  link: "", user_id: guest.id)









mir = User.create(username: "mir", password: "password",
  email: "mir@pantry.com")

pantry6 = PantryItem.create(category: "", name: "Salmon",
  quantity: 4, unit: "ounces", user_id: mir.id)
pantry7 = PantryItem.create(name: "Rib-eye steak",
  quantity: 10, unit: "ounces", user_id: mir.id)
pantry8 = PantryItem.create(category: "", name: "Chicken thighs",
  quantity: 1, unit: "pound", user_id: mir.id)
pantry9 = PantryItem.create(category: "", name: "Sea bass",
  quantity: 1.5, unit: "pounds", user_id: mir.id)
pantry10 = PantryItem.create(category: "", name: "Pork shoulder",
  quantity: 4, unit: "pounds", user_id: mir.id)

grocery4 = Grocery.create(category: "", name: "Pork chop",
  quantity: 2, unit: "", user_id: mir.id, purchased: false)
