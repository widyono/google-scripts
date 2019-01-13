function onEdit(e) {

  Logger.log("Function onEdit() called in autosort script");

  var sheet = e.source.getActiveSheet();
  Logger.log("Active sheet: " + sheet.getName());

  var editedCell = sheet.getActiveCell();

  var firstDataRow = 2;
  var firstDataCol = 1;
  var lastDataRow = sheet.getLastRow();  // Dynamically ascertain height of sheet
  var lastDataCol = sheet.getLastColumn();  // Dynamically ascertain width of sheet
  var dataRange = sheet.getRange(firstDataRow, firstDataCol, lastDataRow, lastDataCol); // Define range that excludes header row
  Logger.log("Data range: " + dataRange.getA1Notation());

  var checkBoxRange = "A:A";         // checkBoxes are in first column
  var checkBoxValues = sheet.getRange(checkBoxRange).getValues();
  var numChecked = 0;
  
 


  if (checkBoxValues[0][0].toString().match('x')=='x') {
    // $A1 is 'x' so we are in shopping mode: sort by Aisle first (column 3)
    Logger.log("in shopping mode, sorting by Aisle first");
    dataRange.sort( [ { column : 1, ascending: true }, { column : 3, ascending : true }, { column : 2, ascending : true } ] );
  } else {
    // $A1 is not 'x' so we are in search mode: sort alphabetically
    Logger.log("in search mode, sorting alphabetically");
    dataRange.sort( [ { column : 1, ascending: true }, { column : 2, ascending : true } ] );
  }

  Logger.log("Now checking checkbox values");
  
  for (n=0; n<checkBoxValues.length; ++n) {
    Logger.log("checking row " + n);
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
