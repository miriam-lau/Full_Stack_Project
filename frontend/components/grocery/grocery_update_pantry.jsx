import React from "react";
import { generateDisplayQuantity, pluralizeUnit, singularizeUnit } from
    "../utils/item_helpers";

/*
  Checks if purchased grocery item exists in pantry, if it exists, the pantry item is updated with the grocery item, else a new pantry item is created. Then the grocery item is deleted.
  @param {pantryItems} all pantry items
  @param {id} grocery item id
  @param {item} grocery item
  @param {createPantryItem} pantry action to create a new pantry item
  @param {updatePantryItem} pantry action to update a pantry item
  @param {deleteGroceryItem} grocery action to delete a grocery item
*/
const groceryUpdatePantry = (pantryItems, id, item,
  createPantryItem, updatePantryItem, deleteGroceryItem) => {
    let quantity = parseFloat(item.quantity);
    let groceryUnit = singularizeUnit(item.unit);

    for (let i = 0; i < pantryItems.length; i++) {
      if (pantryItems[i].category !== item.category ||
          pantryItems[i].name !== item.name) {
        continue;
      }

      let itemUnit = singularizeUnit(pantryItems[i].unit);
      if (groceryUnit !== itemUnit) {
        continue;
      }

      quantity += parseFloat(pantryItems[i].quantity);
      if (quantity > 1) {
        itemUnit = pluralizeUnit(itemUnit);
      }

      let currentQuantityDisplay = generateDisplayQuantity(item);

      let pantryItem = {
          id: pantryItems[i].id,
          name: pantryItems[i].name,
          category: pantryItems[i].category,
          quantity: quantity,
          unit: itemUnit,
          currentQuantityDisplay: currentQuantityDisplay
      };

      updatePantryItem({ pantry_item: pantryItem })
          .then(() => deleteGroceryItem(id));
      return true;
    }

    // add new item to pantry
    let newPantryItem = {
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        unit: item.unit
    };

    createPantryItem({ pantry_item: newPantryItem})
        .then(() => deleteGroceryItem(id));

    return true;
}

export default groceryUpdatePantry;
