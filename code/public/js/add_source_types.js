// Get the objects we need to modify
let addSourceTypesForm = document.getElementById("add-sourcetypes-form-ajax");

// Modify the objects we need
addSourceTypesForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputsourcetypes = document.getElementById("sourceType-input");

  // Get the values from the form fields
  let sourceTypesValue = inputsourcetypes.value;

  // Put our data we want to send in a javascript object
  let data = {
    sourceTypes: sourceTypesValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-source-type-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      window.location.reload();
      //addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputsourcetypes.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from
// customers
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("sourcetypes-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 4 cells
  let row = document.createElement("TR");
  let sourceTypesCell = document.createElement("TD");

  // Fill the cells with correct data
  idCell.innerText = newRow.sourceTypes;

  // Add the cells to the row
  row.appendChild(idCell);

  row.setAttribute("sourceTypesIDvalue", newRow.sourceTypesID);

  // Add the row to the table
  currentTable.appendChild(row);
};
