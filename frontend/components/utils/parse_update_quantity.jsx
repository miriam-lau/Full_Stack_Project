import React from "react";
import { allMeasurements } from "../utils/measurements";

/*
  Checks if combined quantity and unit string is valid, and updates changes to the new quantity and unit string.

  @param str {string} quantity and unit string
  @return {object} error messages or quantity{float} and unit{string}
*/
const parseUpdateQuantity = (str) => {
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

export default parseUpdateQuantity;
