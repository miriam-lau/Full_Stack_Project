import React from 'react';

// const teaspoon = ['teaspoon', 'teaspoons', 't', 'tsp'];
// const tablespoon = ['tablespoon', 'tablespoons', 'T', 'tbl', 'tbs', 'tbsp'];
// const fluidounce = ['fluid ounce', 'fluid ounces', 'fl oz'];
// const gill = ['gill', 'gills'];
// const cup = ['cup', 'cups', 'c'];
// const pint = ['pint', 'pints', 'p', 'pt', 'fl pt'];
// const quart = ['quart', 'quarts', 'q', 'qt', 'fl qt'];
// const gallon = ['gallon', 'gallons', 'g', 'gal'];
// const milliliter = ['milliliter', 'milliliters', 'millilitre', 'millilitres', 'ml', 'cc', 'mL'];
// const liter = ['liter', 'liters', 'litre', 'litres', 'L'];
// const deciliter = ['deciliter', 'deciliters', 'decilitre', 'decilitres', 'dL'];
// const pound = ['pound', 'pounds', 'lb', 'lbs'];
// const ounce = ['ounce', 'ounces', 'oz'];
// const milligram = ['milligram', 'milligrams', 'milligramme', 'milligrammes', 'mg'];
// const gram = ['gram', 'grams', 'gramme', 'grammes', 'g'];
// const kilogram = ['kilogram', 'kilograms', 'kilogramme', 'kilogrammes', 'kg', 'kgs'];
// const millimeter = ['millimeter', 'millimeters', 'millimetre', 'millimetres', 'mm'];
// const centimeter = ['centimeter', 'centimeters', 'centimetre', 'centimetres', 'cm'];
// const meter = ['meter', 'meters', 'metre', 'metres', 'm'];
// const inch = ['inch', 'inches', 'in', '"'];
// const foot = ['foot', 'feet', '\''];
//
// const allMeasurements = [teaspoon, tablespoon, fluidounce, gill, cup,
//   pint, quart, gallon, milliliter, liter, deciliter, pound, ounce,
//   milligram, gram, kilogram, millimeter, centimeter, meter, inch, foot];

const UpdatePantry = (key, grocery_item, pantry_items,
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

  //
  // constructor(props) {
  //   super(props);
  //   this.state = { category: '', name: '', quantity: 0, unit: '',
  //     temp: '', errors: false };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.parseAddItem = this.parseAddItem.bind(this);
  // }
  //
  // parseAddItem(str) {
  //   let words = str.split(' ');
  //   let firstNum = /(^\d+(?:\.\d+)?)/;
  //   let splitFirstWord = words.shift().split(firstNum);
  //   if (splitFirstWord.length === 1) {
  //  	  return this.setState({errors: true});
  //   }
  //
  //   words = splitFirstWord.concat(words);
  //   words = words.filter(function(entry) { return entry.trim() != ''; });
  //   let quantity = words.shift();
  //   let unit = words[0];
  //   let convertedUnit = null;
  //
  //   if (unit == null || unit.length === 0) {
  //    return this.setState({errors: true})
  //   }
  //
  //   if (unit[unit.length - 1] == '.') {
  //   unit = unit.substring(0, unit.length - 1);
  //   }
  //
  //   for (let i = 0; i < allMeasurements.length; i++) {
  //     if (allMeasurements[i].includes(unit)) {
  //       convertedUnit = (quantity === '1' ? allMeasurements[i][0] : allMeasurements[i][1]);
  //       break;
  //     }
  //   }
  //
  //   if (convertedUnit != null) {
  //     words.shift();
  //   }
  //
  //   if (words.length == 0) {
  //    return this.setState({errors: true});
  //   }
  //
  //   if (convertedUnit === null) {
  //     convertedUnit = '';
  //   }
  //   let item = words.join(' ');
  //
  //   let items = this.props.pantry_items;
  //   this.setState({name: item, quantity: parseFloat(quantity),
  //     unit: convertedUnit, temp: '', errors: false}, () => {
  //       let current_pantry_item = this.state;
  //       let pantry_itemUnit = current_pantry_item.unit.toLowerCase();
  //       if (pantry_itemUnit.charAt(pantry_itemUnit.length - 1) === 's') {
  //         pantry_itemUnit = pantry_itemUnit.substring(0, (pantry_itemUnit.length - 1))
  //       }
  //
  //       let items = this.props.pantry_items;
  //       for (var i = 0; i < items.length; i++) {
  //         let itemName = items[i].name.toLowerCase();
  //         let itemUnit = items[i].unit.toLowerCase();
  //         if (itemUnit.charAt(itemUnit.length - 1) === 's') {
  //           itemUnit = itemUnit.substring(0, (itemUnit.length - 1))
  //         }
  //         let newUnit;
  //         if (current_pantry_item.name.toLowerCase() === itemName) {
  //           itemName = itemName[0].toUpperCase() + itemName.substring(1);
  //           if (pantry_itemUnit === itemUnit) {
  //             if (pantry_itemUnit === "") {
  //               newUnit = "";
  //             } else {
  //               newUnit = itemUnit;
  //             }
  //             let newQuantity = parseFloat(items[i].quantity) + parseFloat(current_pantry_item.quantity);
  //             if (newQuantity > 1 && newUnit !== "") {
  //               newUnit += 's';
  //             }
  //             let unparsed_quantity = newQuantity + (newUnit != '' ? (' ' + newUnit) : '');
  //             let pantry_item = {id: items[i].id, name: itemName, quantity: newQuantity, unit: newUnit, 'unparsed_quantity': unparsed_quantity};
  //             this.props.editPantryItemDbOnly({pantry_item});
  //             return true;
  //           }
  //         }
  //       }
  //
  //       this.props.createPantryItem({'pantry_item': current_pantry_item});
  //     });
  //   return true;
  // }

export default UpdatePantry;
