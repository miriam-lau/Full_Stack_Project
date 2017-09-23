import React from "react";
import { allMeasurements } from "../utils/measurements";

/*
  Converts unit to singular form.

  @param unit {string}
  @return {string} singular form of unit
*/
export const singularizeUnit = (unit) => {
  if (unit === "") {
    return unit;
  }

  let result;
  if (unit === "inch" || unit === "inches") {
    result = "inch";
  } else if (unit === "foot" || unit === "feet") {
    result = "foot";
  } else if (unit.charAt(unit.length - 1) === "s") {
    result = unit.substring(0, (unit.length - 1));
  } else {
    return unit;
  }
  return result;
}

/*
  Converts unit to plural form.

  @param unit {string}
  @return {string} plural form of unit
*/
export const pluralizeUnit = (unit) => {
  if (unit === "") {
    return unit;
  }

  let result;
  if (unit === "inch") {
    result = "inches";
  } else if (unit === "foot") {
    result = "feet";
  } else {
    result = unit + "s";
  }
  return result;
}

/*
  Checks if current item is already in pantryItems.

  @param allItems {array} all pantryItems
  @param id {integer} current item id, -1 for non-existing items
  @param item {string} current item name
  @return {object} if a match is found, otherwise null
*/
export const findMatchingItem = (allItems, id, item) => {
  let singularUnit = singularizeUnit(item.unit);

  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i].id === id) {
      continue;
    }

    if (allItems[i].category !== item.category ||
        allItems[i].name !== item.name) {
      continue;
    }

    let itemUnit = singularizeUnit(allItems[i].unit);
    if (itemUnit !== singularUnit) {
      continue;
    }
    return allItems[i];;
  }
  return null;
}

/*
  Creates item display of quantity and unit together.
  @param {object} takes in an item object
  @return {string} string of quantity and unit.
*/
export const generateDisplayQuantity = (item) => {
  let currentQuantityDisplay = item.quantity;
  if (item.unit != null) {
    let quantity = item.quantity.toFixed(1);
    currentQuantityDisplay = quantity + " " + item.unit;
  } else {
    currentQuantityDisplay = quantity;
  }
  return currentQuantityDisplay;
}

/*
  Checks if combined quantity and unit string is valid, and updates changes to the new quantity and unit string.

  @param str {string} quantity and unit string
  @return {object} error messages or quantity{float} and unit{string}
*/
export const parseUpdateQuantity = (str) => {
  let words = str.split(" ");
  let firstNum = /(^\d+(?:\.\d+)?)/;
  let splitFirstWord = words.shift().split(firstNum);
  if (splitFirstWord.length === 1) {
    return { error: "Quantity must be a number" };
  }

  words = splitFirstWord.concat(words);
  words = words.filter(function(entry) {
    return (entry.trim() !== "");
  });

  let quantity = words.shift();
  let unit = words[0];
  let convertedUnit = null;

  if (unit != null) {
    if (unit[unit.length - 1] === ".") {
      unit = unit.substring(0, unit.length - 1);
    }
    for (let i = 0; i < allMeasurements.length; i++) {
      if (allMeasurements[i].includes(unit)) {
        convertedUnit =
            (quantity === "1" ?
             allMeasurements[i][0] :
             allMeasurements[i][1]);
        break;
      }
    }
  }

  if (convertedUnit == null && unit != null) {
    return { error: "Invalid unit" };
  }
  return { quantity: parseFloat(quantity), unit: convertedUnit };
}
