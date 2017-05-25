import React from 'react';

const updatePantry = (key, grocery_item, pantry_items,
  createPantryItem, editPantryItemDbOnly, deleteGroceryItem) => {

  console.log("in update pantry 1");
  console.log(grocery_item);
  let groceryItemUnit = '';
  if (grocery_item.unit !== "") {
    groceryItemUnit = grocery_item.unit.toLowerCase();
    if (groceryItemUnit.charAt(groceryItemUnit.length - 1) === 's') {
      groceryItemUnit = groceryItemUnit.substring(0, (groceryItemUnit.length - 1));
    }
  }
  console.log("in update pantry 2");
  console.log(pantry_items);

  for (var i = 0; i < pantry_items.length; i++) {
    console.log("in update pantry for loop");
    let itemName = pantry_items[i].name.toLowerCase();
    let itemUnit = '';
    if (pantry_items[i].unit !== "") {
      itemUnit = pantry_items[i].unit.toLowerCase();
      if (itemUnit.charAt(itemUnit.length - 1) === 's') {
        itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
      }
    }

    let newUnit;
    if (grocery_item.name.toLowerCase() === itemName) {
      itemName = itemName[0].toUpperCase() + itemName.substring(1);
      if (groceryItemUnit === itemUnit) {
        if (groceryItemUnit === "") {
          newUnit = "";
        } else {
          newUnit = itemUnit;
        }
        let newQuantity = parseFloat(pantry_items[i].quantity) +
          parseFloat(grocery_item.quantity);
        if (newQuantity > 1 && newUnit !== "") {
          newUnit += 's';
        }
        let unparsed_quantity = newQuantity + (newUnit != '' ? (' ' + newUnit) : '');
        let pantry_item = {id: pantry_items[i].id, name: itemName,
          quantity: newQuantity, unit: newUnit, 'unparsed_quantity': unparsed_quantity};
        editPantryItemDbOnly({pantry_item})
          .then(() => deleteGroceryItem(key));
        return true;
      }
    }
  }
  let newPantryItem = {name: grocery_item.name, quantity: grocery_item.quantity,
    unit: grocery_item.unit};
  createPantryItem({'pantry_item': newPantryItem}).then(() => deleteGroceryItem(key));
  return true;
}

export default updatePantry;
