import React from "react";

/*
  Checks if current item is already in pantryItems, and updates the item if it is found, and deletes the current item if it already exists.

  @param allItems{array} all pantryItems
  @param id{integer} current item id, -1 for non-existing items
  @param item{string} current item name
  @param category{string} current item category
  @param convertedUnit{string} current item category
  @param quantity{float} current item quantity
  @return{boolean} true if a match is found and updated, otherwise false
*/



const updatePantry = (allItems, id, item, category, convertedUnit, quantity,
    updatePantryItem, deletePantryItem) => {

  // loop over all pantry items to see if there is a match
  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i].category !== category || allItems[i].name !== item) {
      continue;
    }

    // set item unit to singular, should be pulled out into a separate function
    let itemUnit = allItems[i].unit;
    if (itemUnit === "inch" || itemUnit === "inches") {
      itemUnit = "inch";
    } else if (itemUnit === "foot" || itemUnit === "feet") {
      itemUnit = "foot";
    } else if (itemUnit.charAt(itemUnit.length - 1) === "s") {
      itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
    }
    // set current item unit to singular
    if (convertedUnit === "inch" || convertedUnit === "inches") {
      convertedUnit = "inch";
    } else if (convertedUnit === "foot" || convertedUnit === "feet") {
      convertedUnit = "foot";
    } else if (convertedUnit.charAt(convertedUnit.length - 1) === "s") {
      convertedUnit = convertedUnit.substring(0, (convertedUnit.length - 1));
    }
    // go to next item if unit does not match current unit
    // if there is match, add item quantity to current item quantity
    if (convertedUnit !== itemUnit) {
      continue;
    } else {
      quantity += parseFloat(allItems[i].quantity);
    }

    // set the unit (plural or not) for the correct quantity
    if (quantity > 1 && convertedUnit !== "") {
      if (convertedUnit === "inch") {
        convertedUnit = "inches";
      } else if (convertedUnit === "foot") {
        convertedUnit = "feet";
      } else {
        convertedUnit += "s";
      }
    }
    // set the currentQuantityDisplay
    let currentQuantityDisplay = quantity;
    if (convertedUnit != null) {
      currentQuantityDisplay += " " + convertedUnit;
    }

    let pantryItem = {
        id: allItems[i].id, name: item, category: allItems[i].category, quantity: quantity, unit: convertedUnit, currentQuantityDisplay: currentQuantityDisplay
      };

    if (id === -1) {
      updatePantryItem({pantry_item: pantryItem});
    } else {
      updatePantryItem({pantry_item: pantryItem}).then(() =>
          deletePantryItem(id));
    }
    return true;
  }
  return false;
}

export default updatePantry;
