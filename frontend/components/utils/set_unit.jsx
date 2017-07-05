import React from "react";

/*
  Converts unit to singular.

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

export const pluralizeUnit = (unit) => {
  let result = "";
  if (unit === "inch") {
    result = "inches";
  } else if (unit === "foot") {
    result = "feet";
  } else {
    result = unit + "s";
  }
  return result;
}
