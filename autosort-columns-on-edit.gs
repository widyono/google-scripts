function onEdit(e){
  var sheet = e.source.getActiveSheet();
  var editedCell = sheet.getActiveCell();
  var lastRow = sheet.getMaxRows();
  var tableRange = "A2:Y" + lastRow; // What to sort.

  Logger.log("sheet: " + sheet.getName());
  var range = sheet.getRange(tableRange);
  Logger.log("range: " + range.getA1Notation());
  range.sort( [ { column : 1, ascending: true }, { column : 3, ascending : true }, { column : 2, ascending : true } ] );

  var checkBoxRange = "A:A";
  var checkBoxValues = sheet.getRange(checkBoxRange).getValues();
  var numChecked = 0;
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
