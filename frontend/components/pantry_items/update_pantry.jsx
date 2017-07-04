import React from "react";

const updatePantry = (allItems, item, category, convertedUnit, quantity,
  updatePantryItem) => {
    for (var i = 0; i < allItems.length; i++) {
      if (allItems[i].category !== category) {
        continue;
      }

      let itemName = allItems[i].name;
      if (itemName !== item) {
        continue;
      }

      let itemUnit = allItems[i].unit;
      if (itemUnit === "inch" || itemUnit === "inches") {
        itemUnit = "inch";
      } else if (itemUnit === "foot" || itemUnit === "feet") {
        itemUnit = "foot";
      } else if (itemUnit.charAt(itemUnit.length - 1) === "s") {
        itemUnit = itemUnit.substring(0, (itemUnit.length - 1));
      }

      if (convertedUnit === "inch" || convertedUnit === "inches") {
        convertedUnit = "inch";
      } else if (convertedUnit === "foot" || convertedUnit === "feet") {
        convertedUnit = "foot";
      } else if (convertedUnit.charAt(convertedUnit.length - 1) === "s") {
        convertedUnit = convertedUnit.substring(0, (convertedUnit.length - 1));
      }

      if (convertedUnit !== itemUnit) {
        continue;
      } else {
        quantity += parseFloat(allItems[i].quantity);
      }

      if (quantity > 1 && convertedUnit !== "") {
        if (convertedUnit === "inch") {
          convertedUnit = "inches";
        } else if (convertedUnit === "foot") {
          convertedUnit = "feet";
        } else {
          convertedUnit += "s";
        }
      }

      let pantryItem = {id: allItems[i].id, name: item, category: allItems[i].category, quantity: quantity, unit: convertedUnit};

      updatePantryItem({pantry_item: pantryItem});
      return true;
    }
}

export default updatePantry;
