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
Recipe.destroy_all


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
  quantity: 8, unit: "cups", user_id: guest.id, purchased: false)
grocery4 = Grocery.create(category: "", name: "Blueberry",
  quantity: 6, unit: "ounces", user_id: guest.id, purchased: false)
grocery5 = Grocery.create(category: "", name: "Pear",
  quantity: 5, unit: "", user_id: guest.id, purchased: false)
grocery6 = Grocery.create(category: "", name: "Raspberry",
  quantity: 10, unit: "tablespoons", user_id: guest.id, purchased: false)
grocery7 = Grocery.create(category: "", name: "Peach",
  quantity: 3, unit: "", user_id: guest.id, purchased: false)
grocery8 = Grocery.create(category: "", name: "Canteloupe",
  quantity: 2, unit: "cups", user_id: guest.id, purchased: false)
grocery9 = Grocery.create(category: "", name: "Watermelon",
  quantity: 1, unit: "cups", user_id: guest.id, purchased: false)


recipe1 = Recipe.create(name: "Fig, Melon and Ham Salad", serving: 6,
  ingredients: "1 small Charentais melon or cantaloupe, peeled, seeded, and cut into 1-inch cubes\n12 black mission figs, split in half lengthwise\n2 ounces thinly shaved Jamón Serrano or prosciutto\n2 tablespoons extra-virgin olive oil\nCoarse sea salt\nSmall handful fresh basil leaves",
  rating: 5.0,
  description: "Fast, easy, refreshing, and oh-so-good salad for the summer from J Kenji-Lopez-Alt.",
  directions: "1. Arrange melon, figs, and ham on a serving platter.\n2. Drizzle with olive oil and sprinkle with salt.\n3. Scatter with basil leaves and serve.",
  notes: "Important to get fig and canteloupe in season",
  link: "http://www.seriouseats.com/recipes/2015/07/fig-melon-spanish-ham-basil-salad-summer.html",
  image_url: "http://www.seriouseats.com/recipes/assets_c/2015/06/20150628-fig-melon-jamon-serrano-salad-1-thumb-1500xauto-424482.jpg",
  user_id: guest.id)

recipe2 = Recipe.create(name: "Mac and Cheddar Cheese", serving: 4,
  ingredients: "1 tablespoon vegetable or olive oil, 1 turn of the pan in a slow stream\n2 tablespoons butter\n3 tablespoons flour\n1 1/2 cups whole or 2 percent milk\n3 cups shredded white Cheddar cheese\n1/2 teaspoon nutmeg, ground or freshly grated\n1/4 teaspoon ground cayenne pepper, a couple pinches\nSalt\n1 pound elbow macaroni, cooked 8 minutes or to al dente, with a little bite to it",
  rating: 5.0,
  description: "Easy and delicious recipe in just 30-minutes by Rachael Ray",
  directions: "1. Heat a medium, deep skillet over medium heat. Add oil and butter. When butter melts into the oil, add flour and combine. Gently cook, whisking flour and butter together, until smooth and flour has had a chance to cook, about 3 minutes.\n2. Slowly add milk while continuing to whisk. Gently bring milk to a bubble while stirring frequently. Allow the milk to thicken a bit, then stir in 2 cups of shredded Cheddar cheese a handful at a time.\n3. Season sauce with nutmeg and cayenne. Taste and add a little salt, if you like.\n4. Add cooked pasta to sauce and coat completely by turning over and over in the cheese sauce.\n5. Transfer to a baking dish and top with remaining cheese.\n6. Place baking dish under a hot broiler and brown the Cheddar cheese on top.",
  notes: "None.",
  link: "http://www.foodnetwork.com/recipes/rachael-ray/macaroni-and-cheddar-cheese-recipe-2131153",
  image_url: "http://www.seriouseats.com/images/2016/11/20161028-baked-macaroni-cheese-sodium-citrate-vicky-wasik-20.jpg",
  user_id: guest.id)

recipe3 = Recipe.create(name: "Fettuccine Alfredo", serving: 4,
  ingredients: "5 ounces Parmigiano Reggiano cheese\n2 tablespoons heavy cream\n1 large egg\n1 teaspoon cornstarch\n2 tablespoons extra-virgin olive oil\n1/2 teaspoon grated lemon zest (optional)\nKosher salt and fresh ground pepper\n1 pound fettuccine\n1 teaspoon minced garlic\n2 tablespoons unsalted butter\n
  Minced fresh parsley or chives",
  rating: 4.8,
  description: "A classic
  pasta dish by J. Kenji Lopez-Alt.",
  directions: "1. Combine cheese, heavy cream, egg, cornstarch, olive oil, and lemon zest (if using) in a large bowl. Season lightly with salt and heavily with black pepper and whisk to combine. Set aside.\n2. In a large Dutch oven or saucepan, bring 2 quarts of water and 2 tablespoons (24g) of salt to a boil over high heat. Add pasta and cook, stirring frequently to prevent sticking, until cooked but still very firm (not quite al dente), about 45 seconds for fresh pasta or 1 minute less than package directions indicate for dried pasta. Drain pasta into a colander set over a large bowl. Transfer 2 cups (480ml) of cooking water to a liquid measuring cup and discard the rest. Transfer pasta to the now-empty bowl. Add garlic and butter and toss to coat.\n3. Whisking constantly, slowly add 1 1/2 cups of pasta cooking water to bowl with cheese mixture. Transfer cheese mixture to the now-empty pasta cooking pot, scraping the bottom to make sure you get everything. Cook over medium-high heat, stirring constantly with a rubber spatula, until mixture comes to a boil and thickens, about 45 seconds. Season sauce to taste with more salt and pepper as desired. Transfer pasta to sauce mixture and turn to coat. Just before serving, stir in more pasta water to thin sauce out as necessary. Serve immediately, sprinkled with minced herbs, black pepper, and cheese, and drizzled with additional olive oil.",
  notes: "None.",
  link: "http://www.seriouseats.com/recipes/2014/09/lighter-fettuccine-alfredo-recipe.html",
  image_url: "http://www.seriouseats.com/images/2014/09/20140919-fettucini-alfredo-recipe-01.jpg",
  user_id: guest.id)

recipe4 = Recipe.create(name: "Chicken Pot Pie", serving: 4,
  ingredients: "3 whole chicken breasts bone-in, skin-on\n3 tablespoons olive oil\nKosher salt and fresh black pepper\n5 cups chicken stock\n2 chicken bouillon cubes\n12 tablespoons unsalted butter\n2 cups yellow chopped onions\n3/4 cup all-purpose flour\n1/4 cup heavy cream\n2 cups medium-diced carrots, blanched for 2 minutes\n2 cups frozen peas\n1 1/2 cups frozen small whole onions\n1/2 cup minced fresh parsley leaves\n3 cups all-purpose flour\n1 1/2 teaspoons kosher salt\n1 teaspoon baking powder\n1/2 cup vegetable shortening\n1/4 pound diced and cold unsalted butter\n1/2 to 2/3 cup ice water\nEgg wash: 1 egg beaten with 1 tablespoon water\nFlaked sea salt and cracked black pepper",
  rating: 5.0,
  description: "A must comfort-food from Ina Garten",
  directions: "1. Preheat the oven to 350 degrees F.\n2. Place the chicken breasts on a baking sheet and rub them with olive oil. Sprinkle generously with salt and pepper. Roast for 35 to 40 minutes, or until cooked through. Set aside until cool enough to handle, then remove the meat from the bones and discard the skin. Cut the chicken into large dice. You will have 4 to 6 cups of cubed chicken.\n3. In a small saucepan, heat the chicken stock and dissolve the bouillon cubes in the stock. In a large pot or Dutch oven, melt the butter and saute the onions over medium-low heat for 10 to 15 minutes, until translucent. Add the flour and cook over low heat, stirring constantly, for 2 minutes. Add the hot chicken stock to the sauce. Simmer over low heat for 1 more minute, stirring, until thick. Add 2 teaspoons salt, 1/2 teaspoon pepper, and heavy cream. Add the cubed
  chicken, carrots, peas, onions and parsley. Mix well.\n4. For the pastry, mix the flour, salt, and baking powder in the bowl of a food processor fitted with a metal blade. Add the shortening and butter and mix quickly with your fingers until each piece is coated with flour. Pulse until the fat is the size of peas (~10 times). With the motor running, add the ice water; process only enough to moisten the dough and have it just come together. Dump the dough out onto a floured board and knead quickly into a ball. Wrap the dough in plastic and refrigerate for 30 minutes.\n5. Preheat the oven to 375 degrees F.\n6. Divide the filling equally among 4 ovenproof bowls. Divide the dough into quarters and roll each piece into an 8-inch circle. Brush the dough with egg wash and make three slits in the top. Sprinkle with sea salt and cracked pepper. Place on a baking sheet and bake for 1 hour, or until the top is golden brown and the filling is bubbling hot.",
  notes: "Pairs well with Chardonnay.",
  link: "http://www.foodnetwork.com/recipes/ina-garten/chicken-pot-pie-recipe-2014304",
  image_url: "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/12/0/IG0604H_33099_s4x3.jpg.rend.hgtvcom.616.462.jpeg",
  user_id: guest.id)

recipe5 = Recipe.create(name: "Ultra-Smashed Cheeseburger", serving: 1,
  ingredients: "1 soft hamburger roll, buttered and toasted\n4 ounces (110g) freshly ground beef chuck, divided into two 2-ounce (55g) balls\n1 slice good melting cheese, such as American\nKosher salt and fresh ground pepper\nCondiments and toppings as desired, such as mayonnaise, mustard, shredded lettuce, onions, tomatoes, and pickles",
  rating: 5.0,
  description: "Classic smashed burgers are all about maximizing that deep, brown crust. A must-try recipe from J. Kenji Lopez-Alt.",
  directions: "1. Prepare burger bun by laying toppings on bottom half of bun. Have it nearby and ready for when your burger is cooked.\n2. Preheat a large stainless steel sauté pan or skillet over high heat for 2 minutes. Place balls of beef in pan and smash down with a stiff metal spatula, using a second spatula to add pressure. Smashed patties should be slightly wider than burger bun.\n3. Season generously with salt and pepper and allow to cook until patties are well browned and tops are beginning to turn pale pink/gray in spots, about 45 seconds. Using a bench scraper or the back side of a stiff metal spatula, carefully scrape patties from pan, making sure to get all of the browned bits.\n4. Flip patties and immediately place a slice of cheese over 1 patty, then stack the second directly on top. Immediately remove from pan and transfer to waiting burger bun. Serve.",
  notes: "These burgers cook very fast, so it's best to make them one at a time. If making multiple burgers, keep them warm under a tent of foil while preparing subsequent burgers.",
  link: "http://www.seriouseats.com/recipes/2014/03/ultra-smashed-cheeseburger-recipe-food-lab.html",
  image_url: "http://www.seriouseats.com/recipes/assets_c/2017/04/20170423-ultra-smashed-burger-video-primary2-thumb-1500xauto-437438.jpg",
  user_id: guest.id)

recipe6 = Recipe.create(name: "Chinese Tea Eggs", serving: 6,
  ingredients: "6 eggs\n3 to 4 tablespoons soy sauce\n1 teaspoon salt\n1 tablespoon black tea leaves\n3 to 4 pieces star anise\n1 small stick cinnamon\n2 to 3 strips dried orange\n1 teaspoon cracked peppercorns\n1 teaspoon sugar (optional)",
  rating: 5.0,
  description: "Street-style tea eggs are a popular snack in China and
  Taiwan. Recipe from Food52.",
  directions: "1. Place eggs in a pot and cover with about an inch of cold water. Bring to a boil, then simmer for 1 to 2 minutes.\n2. Rinse the eggs with cold water. One by one, take each egg and tap it gently with the blunt end of a knife or the back of a spoon until the entire surface is lightly cracked.\n3. If small pieces flake off, don't worry, but do try to keep the shell intact over the egg.\n4. Return the eggs to the pot and refill with water. Add just enough water to barely cover the eggs, but for the sake of precision, it should be about 1 1/2 to 2 cups. Add the rest of the ingredients: soy sauce, salt, tea, star anise, cinnamon, orange peel, pepper, and sugar (optional), and give it a good stir.\n5. Bring the mixture back to a boil, then reduce the heat to low\n6. Simmer for 3 hours in a pot uncovered as it yields firmer eggs with better flavor. The water will evaporate fairly quickly, so add more as it simmers.\n7. These eggs never have the soft, bright yellow yolks you get from hard-boiling for just a few minutes. They often have that greenish tinge because they cook for much longer.\n8. For a stronger flavor, steep overnight after you finish simmering.",
  notes: "If you like softer eggs, cover the pot as it simmers.",
  link: "https://food52.com/blog/9956-how-to-make-street-style-chinese-tea-eggs-at-home",
  image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKQ8xIb1Nsgm_s3qNvNddjg7hHSo942xaHaQk2dblmsUExDOSb",
  user_id: guest.id)

recipe7 = Recipe.create(name: "Strawberry Shortcake", serving: 5,
  ingredients: "1 quart strawberries, quartered or sliced\n1/2 cup sugar, divided\n5 ounces (about 1 cup) self-rising flour\n1 pint heavy cream\n1/2 teaspoon vanilla extract",
  rating: 5.0,
  description: "Easy recipe with just five ingredients from J. Kenji-Lopez-Alt.",
  directions: "1. Adjust oven rack to center position and preheat oven to 450°F. Toss strawberries with 6 tablespoons sugar in a medium bowl and set aside.\n2. Place flour in a large bowl. Whisk in 1 tabespoon sugar. Stirring with a wooden spoon, drizzle in 3/4 cup cream. Stir until a lumpy dough is formed. Do not over mix.\n3. Using a 1-ounce cookie scoop, scoop balls of dough onto a parchment-lined baking sheet, spacing them 2 inches apart. Brush tops with cream and bake until golden brown, about 12 minutes. Remove biscuits and set aside.\n4. Using a wire whisk or an electric mixer, whip remaining cream with remaining tablespoon sugar and vanilla extract until stiff peaks form. Split biscuits, top with strawberries and cream, close shortcakes, top with more whipped cream, and serve immediately.",
  notes: "None.",
  link: "http://www.seriouseats.com/recipes/2015/10/five-ingredient-strawberry-shortcake-scratch-recipe.html",
  image_url: "http://www.seriouseats.com/recipes/assets_c/2015/10/20150911-two-ingredient-biscuit-strawberry-shortcake-recipe-kenji-54-thumb-1500xauto-426932.jpg",
  user_id: guest.id)

recipe8 = Recipe.create(name: "Caramel Apples", serving: 8,
  ingredients: "8 small apples, refrigerated until cold\n4 ounces water (1/2 cup)\n9 ounces sugar (1 1/3 cups)\n1 teaspoon Diamond Crystal
  kosher salt\n9 ounces heavy cream (chilled)",
  rating: 4.0,
  description: "A recipe by Stella Parks aka BraveTart",
  directions: "1. Skewer apples with popsicle sticks, then return to fridge. In a 3-quart stainless steel saucier, combine water, sugar, and salt over medium heat. Stir with a fork until sugar is fully dissolved and syrup comes to a rolling boil, about 4 minutes. Simmer, without stirring, until syrup is honey-gold, roughly 9 minutes. Immediately add cream (the mixture will sputter) and reduce heat to medium-low, stirring constantly with a heat-resistant spatula, until caramel registers 250°F (121°C) on a digital thermometer, about 7 minutes. Transfer to a small heat-resistant bowl and cool to about 212°F (100°C).\n2. Dip cold apples in caramel, letting excess drip off before transferring to a parchment-lined cutting board. Let stand at room temperature until fully set, about 10 minutes, and serve.",
  notes: "If you have fond memories of apples dipped in the sort of super-thick and chewy caramel that can really work your jaw, reduce the cream to 6 ounces (3/4 cup).",
  link: "http://www.seriouseats.com/recipes/2016/10/homemade-caramel-apple-recipe.html",
  image_url: "http://www.seriouseats.com/recipes/assets_c/2016/10/20160822-caramel-apples-vicky-wasik-2-thumb-1500xauto-434819.jpg",
  user_id: guest.id)

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
