import React from "react";

const groceryUpdatePantry = (pantryItems, id, groceryItem,
  createPantryItem, updatePantryItem, deleteGroceryItem) => {

    let groceryUnit = groceryItem.unit;
    let quantity = parseFloat(groceryItem.quantity);

    for (var i = 0; i < pantryItems.length; i++) {
      if (pantryItems[i].category !== groceryItem.category ||
          pantryItems[i].name !== groceryItem.name) {
        continue;
      }

      let itemUnit = pantryItems[i].unit;
      if (itemUnit === "inch" || itemUnit === "inches") {
        itemUnit = "inch";
      } else if (itemUnit === "foot" || itemUnit === "feet") {
        itemUnit = "foot";
      } else if (itemUnit.charAt(itemUnit.length - 1) === "s") {
        itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
      }

      if (groceryUnit === "inch" || groceryUnit === "inches") {
        groceryUnit = "inch";
      } else if (groceryUnit === "foot" || groceryUnit === "feet") {
        groceryUnit = "foot";
      } else if (groceryUnit.charAt(groceryUnit.length - 1) === "s") {
        groceryUnit = groceryUnit.substring(0, (groceryUnit.length - 1));
      }

      if (groceryUnit !== itemUnit) {
        continue;
      } else {
        quantity += parseFloat(pantryItems[i].quantity);
      }

      if (quantity > 1 && groceryUnit !== "") {
        if (groceryUnit === "inch") {
          groceryUnit = "inches";
        } else if (groceryUnit === "foot") {
          groceryUnit = "feet";
        } else {
          groceryUnit += "s";
        }
      }

      let pantryItem = {
          id: pantryItems[i].id,
          name: pantryItems[i].name,
          category: pantryItems[i].category,
          quantity: quantity,
          unit: groceryUnit
      };

      updatePantryItem({ pantry_item: pantryItem })
          .then(() => deleteGroceryItem(id));
      return true;
    }

    // add new item to pantry
    let newPantryItem = {
        name: groceryItem.name,
        quantity: groceryItem.quantity,
        category: groceryItem.category,
        unit: groceryItem.unit
    };

    createPantryItem({ pantry_item: newPantryItem})
        .then(() => deleteGroceryItem(id));

    return true;
}

export default groceryUpdatePantry;
