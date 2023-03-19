// Get the objects we need to modify
let addCustomerForm = document.getElementById("add-address-form-ajax");

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputStreet = document.getElementById("street-input");
  let inputCity = document.getElementById("city-input");
  let inputState = document.getElementById("state-input");
  let inputZip = document.getElementById("zip-input");
  let inputCustomerID = document.getElementById("customerID-input");

  // Get the values from the form fields
  let streetValue = inputStreet.value;
  let cityValue = inputCity.value;
  let stateValue = inputState.value;
  let zipValue = inputZip.value;
  let customerIDValue = inputCustomerID.value;

  // Put our data we want to send in a javascript object
  let data = {
    street: streetValue,
    city: cityValue,
    state: stateValue,
    zip: zipValue,
    customerID: customerIDValue,

  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-address-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputStreet.value = "";
      inputCity.value = "";
      inputState.value = "";
      inputZip.value = "";
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
  let currentTable = document.getElementById("address-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 4 cells
  let row = document.createElement("TR");
  let idCell = document.createElement("TD");
  let streetCell = document.createElement("TD");
  let cityCell = document.createElement("TD");
  let stateCell = document.createElement("TD");
  let ZipCell = document.createElement("TD");
  let customerIDCell = document.createElement("TD");

  // Fill the cells with correct data
  idCell.innerText = newRow.addressID;
  streetCell.innerText = newRow.street;
  cityCell.innerText = newRow.city;
  stateCell.innerText = newRow.state;
  ZipCell.innerText = newRow.zip;
  customerIDCell.innerText = newRow.customerscustomerID;

  // Add the cells to the row
  row.appendChild(idCell);
  row.appendChild(streetCell);
  row.appendChild(cityCell);
  row.appendChild(stateCell);
  row.appendChild(ZipCell);
  row.appendChild(customerIDCell);

  row.setAttribute("addressIDvalue", newRow.addressID);

  // Add the row to the table
  currentTable.appendChild(row);

  window.location.reload();
};
