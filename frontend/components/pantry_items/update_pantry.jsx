import React from 'react';

const updatePantry = (key, grocery_item, pantryItems,
  createNewPantryItem, editPantryItem, removeGroceryItem) => {
    console.log("in update");
    console.log(grocery_item);
    let groceryUnit = grocery_item.unit;
    let item = grocery_item.name;
    let quantity = parseFloat(grocery_item.quantity);

    console.log(pantryItems);

    for (var i = 0; i < pantryItems.length; i++) {
      if (pantryItems[i].category !== grocery_item.category) {
        continue;
      }

      let itemName = pantryItems[i].name;
      if (itemName !== item) {
        continue;
      }

      let itemUnit = pantryItems[i].unit;
      if (itemUnit === 'inch' || itemUnit === 'inches') {
        itemUnit = 'inch';
      } else if (itemUnit === 'foot' || itemUnit === 'feet') {
        itemUnit = 'foot';
      } else if (itemUnit.charAt(itemUnit.length - 1) === 's') {
        itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
      }

      if (groceryUnit === 'inch' || groceryUnit === 'inches') {
        groceryUnit = 'inch';
      } else if (groceryUnit === 'foot' || groceryUnit === 'feet') {
        groceryUnit = 'foot';
      } else if (groceryUnit.charAt(groceryUnit.length - 1) === 's') {
        groceryUnit = groceryUnit.substring(0, (groceryUnit.length - 1));
      }

      if (groceryUnit !== itemUnit) {
        continue;
      } else {
        quantity += parseFloat(pantryItems[i].quantity);
      }

      if (quantity > 1 && groceryUnit !== '') {
        if (groceryUnit === 'inch') {
          groceryUnit = 'inches';
        } else if (groceryUnit === 'foot') {
          groceryUnit = 'feet';
        } else {
          groceryUnit += 's';
        }
      }

      let pantry_item = {id: pantryItems[i].id, name: item, category: pantryItems[i].category, quantity: quantity, unit: groceryUnit};

      editPantryItem({pantry_item}).then(() => removeGroceryItem(key));
      return true;
    }

    // add new item to pantry
    let newPantryItem = {name: grocery_item.name, quantity: grocery_item.quantity,
      category: grocery_item.category, unit: grocery_item.unit};

    createNewPantryItem({'pantry_item': newPantryItem}).then(() => removeGroceryItem(key));

    return true;
}

export default updatePantry;
