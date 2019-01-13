function onEdit(e){
  var sheet = e.source.getActiveSheet();
  var editedCell = sheet.getActiveCell();
  var lastRow = sheet.getMaxRows();  // Dynamically ascertain height of sheet
  var tableRange = "A2:Y" + lastRow; // What to sort; don't touch header row
  var checkBoxRange = "A:A";         // checkBoxes are in first column
  var checkBoxValues = sheet.getRange(checkBoxRange).getValues();
  var numChecked = 0;
  

  Logger.log("onEdit() called in autosort script");
 
  Logger.log("sheet: " + sheet.getName());
  var range = sheet.getRange(tableRange);
  Logger.log("range: " + range.getA1Notation());

  if (checkBoxValues[0][0].toString().match('x')=='x') {
    // $A1 is 'x' so we are in shopping mode: sort by Aisle first (column 3)
    Logger.log("in shopping mode, sorting by Aisle first");
    range.sort( [ { column : 1, ascending: true }, { column : 3, ascending : true }, { column : 2, ascending : true } ] );
  } else {
    // $A1 is not 'x' so we are in search mode: sort alphabetically
    Logger.log("in search mode, sorting alphabetically");
    range.sort( [ { column : 1, ascending: true }, { column : 2, ascending : true } ] );
  }

  for (n=0; n<checkBoxValues.length; ++n) {
    if (checkBoxValues[n][0].toString().match('x')=='x'){ 
      numChecked++;
    };
  }

  Logger.log("numChecked: " + numChecked);
  if (numChecked > 0) {
    sheet.setTabColor("#00ff00");
  } else {
    sheet.setTabColor("#e9e9e9");
  }
  Logger.log("done");
}
