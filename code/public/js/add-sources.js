// Get the objects we need to modify
let addSourcesForm = document.getElementById("add-sources-form-ajax");

// Modify the objects we need
addSourcesForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputsourceName = document.getElementById("sourceName-input");
  let inputwaterSupplied = document.getElementById("waterSupplied-input");
  let inputsourceType = document.getElementById("input-source-type");

  // Get the values from the form fields
  let sourceNameValue = inputsourceName.value;
  let waterSuppliedValue = inputwaterSupplied.value;
  let sourceTypeValue = inputsourceType.value; // this is where I need to figure out how to pull from drop down

  // Put our data we want to send in a javascript object
  let data = {
    sourceName: sourceNameValue,
    waterSupplied: waterSuppliedValue,
    sourceType: sourceTypeValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-sources-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      window.location.reload();
      //addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputNewSourceName.value = "";
      inputwaterSupplied.value = "";
      inputsourceType.value = "";
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
  let currentTable = document.getElementById("sources-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 4 cells
  let row = document.createElement("TR");
  let sourceNameCell = document.createElement("TD");
  let waterSuppliedCell = document.createElement("TD");
  let sourceTypeCell = document.createElement("TD");

  // Fill the cells with correct data
  sourceNameCell.innerText = newRow.sourceName;
  waterSuppliedCell.innerText = newRow.waterSupplied;
  sourceTypeCell.innerText = newRow.sourceType;

  deleteCell = document.createElement("button");
  deleteCell.innerHTML = "Delete";
  deleteCell.onclick = function () {
    deleteSource(newRow.sourceName);
  };

  // Add the cells to the row
  row.appendChild(sourceNameCell);
  row.appendChild(waterSuppliedCell);
  row.appendChild(deleteCell);

  row.setAttribute("sourceNamevalue", newRow.sourceName);

  // Add the row to the table
  currentTable.appendChild(row);
};
