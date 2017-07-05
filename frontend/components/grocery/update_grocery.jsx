import React from "react";

/*
function checks to see if current item is already in groceryItems, and updates the item if it is found, and deletes the current item if it already exists.

@param: allItems{array} all groceryItems; id{integer} current item id; item{string} current item name, category{string} current item category, convertedUnit{string} current item category, quantity{float} current item quantity;

@return: boolean, true if update is successful, otherwise false.
*/
const updateGrocery = (allItems, id, item, category, convertedUnit, quantity,
    updateGroceryItem, deleteGroceryItem) => {

  //loop over all grocery items to see if there is a match
  for (var i = 0; i < allItems.length; i++) {
    //go to next item if category does not match current item
    if (allItems[i].category !== category) {
      continue;
    }
    //go to next item if name does not match current item
    let itemName = allItems[i].name;
    if (itemName !== item) {
      continue;
    }

    //set item unit to singular
    let itemUnit = allItems[i].unit;
    if (itemUnit === "inch" || itemUnit === "inches") {
      itemUnit = "inch";
    } else if (itemUnit === "foot" || itemUnit === "feet") {
      itemUnit = "foot";
    } else if (itemUnit.charAt(itemUnit.length - 1) === "s") {
      itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
    }
    //set current item unit to singular
    if (convertedUnit === "inch" || convertedUnit === "inches") {
      convertedUnit = "inch";
    } else if (convertedUnit === "foot" || convertedUnit === "feet") {
      convertedUnit = "foot";
    } else if (convertedUnit.charAt(convertedUnit.length - 1) === "s") {
      convertedUnit = convertedUnit.substring(0, (convertedUnit.length - 1));
    }
    //go to next item if unit does not match current unit
    //if there is match, add item quantity to current item quantity
    if (convertedUnit !== itemUnit) {
      continue;
    } else {
      quantity += parseFloat(allItems[i].quantity);
    }

    //set the unit (plural or not) for the correct quantity
    if (quantity > 1 && convertedUnit !== "") {
      if (convertedUnit === "inch") {
        convertedUnit = "inches";
      } else if (convertedUnit === "foot") {
        convertedUnit = "feet";
      } else {
        convertedUnit += "s";
      }
    }
    //set the currentQuantityDisplay
    let currentQuantityDisplay = quantity;
    if (convertedUnit != null) {
      currentQuantityDisplay += " " + convertedUnit;
    }

    let groceryItem = {id: allItems[i].id, name: item, category: allItems[i].category, quantity: quantity, unit: convertedUnit, currentQuantityDisplay: currentQuantityDisplay};
    //if update is successful, delete current item, return true;

    if (id === -1) {
      updateGroceryItem({grocery_item: groceryItem});
      return true;
    }
    updateGroceryItem({grocery_item: groceryItem}).then(() =>
        deleteGroceryItem(id));
    return true;
  }
  return false;
}

export default updateGrocery;
