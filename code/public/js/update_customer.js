// Get the objects we need to modify
let updateCustomerForm = document.getElementById("update-customer-form-ajax");

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputPotableWater = document.getElementById("input-potable-water");
  let inputRecycledWater = document.getElementById("input-recycled-water");
  let inputOccupantType = document.getElementById("input-occupant-type");
  let inputCustomerID = document.getElementById("input-customer-id");

  // Get the values from the form fields
  let potableWater = inputPotableWater.value;
  let recycledWater = inputRecycledWater.value;
  let occupantType = inputOccupantType.value;
  let customerID = inputCustomerID.value;

  // set defaults for potableWater and recycledWater, cannot pass null values

  if (potableWater == "") {
    potableWater = 0;
  }

  if (recycledWater == "") {
    recycledWater = 0;
  }

  // Put our data we want to send in a javascript object
  let data = {
    potableWater: potableWater,
    recycledWater: recycledWater,
    occupantType: occupantType,
    customerID: customerID,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateRow(xhttp.response, data);

      // clear the update fields
      inputPotableWater.value = "";
      inputRecycledWater.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("customers-table");

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (
      table.rows[i].getAttribute("customerIDvalue") == customerID.customerID
    ) {
      // Get the location of the row where we found the matching customer ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of potable water value
      let td = updateRowIndex.getElementsByTagName("td")[1];

      // Reassign potable water to our update value
      td.innerHTML = customerID.potableWater;

      // Get td of recycled water
      td = updateRowIndex.getElementsByTagName("td")[2];

      // Reassign recycled water to our update value
      td.innerHTML = customerID.recycledWater;

      // Get td of occupantType value
      td = updateRowIndex.getElementsByTagName("td")[3];

      // Reassign occupantType to our update value
      td.innerHTML = customerID.occupantType;
    }
  }
}
