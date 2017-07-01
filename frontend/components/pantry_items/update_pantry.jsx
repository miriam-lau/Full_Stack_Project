import React from 'react';

const updatePantry = (key, grocery_item, pantryItems,
  createNewPantryItem, editPantryItem, removeGroceryItem) => {
  let groceryUnit = '';
  if (grocery_item.unit !== "") {
    groceryUnit = grocery_item.unit.toLowerCase();
    if (groceryUnit.charAt(groceryUnit.length - 1) === 's') {
      groceryUnit = groceryUnit.substring(0, (groceryUnit.length - 1));
    }
  }

  for (var i = 0; i < pantryItems.length; i++) {
    let itemName = pantryItems[i].name;
    let itemUnit = '';
    if (pantryItems[i].unit !== "") {
      itemUnit = pantryItems[i].unit.toLowerCase();
      if (itemUnit.charAt(itemUnit.length - 1) === 's') {
        itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
      }
    }

    let newUnit;
    if (grocery_item.name === itemName) {
      itemName = itemName[0].toUpperCase() + itemName.substring(1);
      if (groceryUnit === itemUnit) {
        if (groceryUnit === "") {
          newUnit = "";
        } else {
          newUnit = itemUnit;
        }
        let newQuantity = parseFloat(pantryItems[i].quantity) +
          parseFloat(grocery_item.quantity);
        if (newQuantity > 1 && newUnit !== "") {
          newUnit += 's';
        }
        let unparsed_quantity = newQuantity + (newUnit != '' ? (' ' + newUnit) : '');

        let pantry_item = {id: pantryItems[i].id, name: itemName,
          quantity: newQuantity, unit: newUnit, 'unparsed_quantity': unparsed_quantity};

        editPantryItem({pantry_item}).then(() => removeGroceryItem(key));
        return true;
      }
    }
  }
  let newPantryItem = {name: grocery_item.name, quantity: grocery_item.quantity,
    unit: grocery_item.unit};
  createNewPantryItem({'pantry_item': newPantryItem}).then(() => removeGroceryItem(key));
  return true;
}

export default updatePantry;
