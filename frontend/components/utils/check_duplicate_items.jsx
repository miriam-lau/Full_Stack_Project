import React from "react";
import { singularizeUnit } from "./set_unit";

/*
  Checks if current item is already in pantryItems, and updates the item if it is found, and deletes the current item if it already exists.

  @param allItems {array} all pantryItems
  @param id {integer} current item id, -1 for non-existing items
  @param item {string} current item name
  @param category {string} current item category
  @param convertedUnit {string} current item category
  @param quantity {float} current item quantity
  @return {boolean} true if a match is found and updated, otherwise false
*/
const checkDuplicateItems = (allItems, id, item) => {
  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i].id === id) {
      continue;
    }
    if (allItems[i].category !== item.category ||
        allItems[i].name !== item.name) {
      continue;
    }

    // if there is match, add item quantity to current item quantity
    let itemUnit = singularizeUnit(allItems[i].unit);
    let convertedUnit = singularizeUnit(item.unit);
    if (convertedUnit !== itemUnit) {
      continue;
    }

    return allItems[i];
  }
  return null;
}

export default checkDuplicateItems;
