// Get the objects we need to modify
let addStorageForm = document.getElementById("add-storage-form-ajax");

// Modify the objects we need
addStorageForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputstorageCapacity = document.getElementById("input-storage-capacity");
  let inputstorageType = document.getElementById("input-storage-type");
  let inputisCovered = document.getElementById("input-is-covered");
  let inputMaterial = document.getElementById("input-material");
  let inputAddressID = document.getElementById("input-address-id");
  let inputSourceName = document.getElementById("input-source-name");

  // Get the values from the form fields
  let storageCapacityValue = inputstorageCapacity.value;
  let storageTypeValue = inputstorageType.value;
  let isCoveredValue = inputisCovered.value;
  let materialValue = inputMaterial.value; // this is where I need to figure out how to pull from drop down
  let addressIDValue = inputAddressID.value;
  let sourceNameValue = inputSourceName.value;

  // Put our data we want to send in a javascript object
  let data = {
    storageCapacity: storageCapacityValue,
    storageType: storageTypeValue,
    isCovered: isCoveredValue,
    material: materialValue,
    addressID: addressIDValue,
    sourceName: sourceNameValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-storage-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      window.location.reload();
      // addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputstorageCapacity.value.value = "";
      inputstorageType.value = "";
      inputisCovered.value = "";
      inputmaterial.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from
// storages
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById("storages-table");

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 4 cells
  let row = document.createElement("TR");
  let idCell = document.createElement("TD");
  let waterCapacityCell = document.createElement("TD");
  let storageTypeCell = document.createElement("TD");
  let isCoveredCell = document.createElement("TD");
  let materialCell = document.createElement("TD");

  // Fill the cells with correct data
  idCell.innerText = newRow.storageID;
  storageCapacityCell.innerText = newRow.potableWater;
  storageTypeCell.innerText = newRow.recycledWater;
  isCoveredCell.innerText = newRow.occupantTypesOccupantType;
  materialCell.innerText = "";

  // Add the cells to the row
  row.appendChild(idCell);
  row.appendChild(storageCapacityCell);
  row.appendChild(storageTypeCell);
  row.appendChild(isCoveredCelll);
  row.appendChild(materialCell);

  row.setAttribute("storageIDvalue", newRow.storageID);

  // Add the row to the table
  currentTable.appendChild(row);
};
