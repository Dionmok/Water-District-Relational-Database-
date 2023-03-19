// Get the objects we need to modify
let updateStorageForm = document.getElementById("update-storage-form-ajax");

// Modify the objects we need
updateStorageForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputStorageID = document.getElementById("update-storage-id");
  let inputStorageCapacity = document.getElementById("update-storage-capacity");
  let inputStorageType = document.getElementById("update-storage-type");
  let inputIsCovered = document.getElementById("update-is-covered");
  let inputMaterial = document.getElementById("update-material");

  // Get the values from the form fields
  let storageID = inputStorageID.value;
  let storageCapacity = inputStorageCapacity.value;
  let storageType = inputStorageType.value;
  let isCovered = inputIsCovered.value;
  let material = inputMaterial.value;  

  // set defaults for storageCapacity, cannot pass null values

  // if (storageCapacity === "") {
  //   storageCapacity = 0;
  // }

  // Put our data we want to send in a javascript object
  let data = {
    storageID: storageID,
    storageCapacity: storageCapacity,
    storageType: storageType,
    isCovered: isCovered,
    material: material,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-storage-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      window.location.reload();
      //updateRow(xhttp.response, data);

      // clear the update fields
      inputStorageCapacity.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("storages-table");

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (
      table.rows[i].getAttribute("storageIDvalue") == storageID.stroageID
    ) {
      // Get the location of the row where we found the matching customer ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of storage value
      let td = updateRowIndex.getElementsByTagName("td")[1];

      // Reassign storage capacity to our update value
      td.innerHTML = storageID.storageCapcity;

      // Get td of storage capcity value 
      td = updateRowIndex.getElementsByTagName("td")[2];

      // Reassign storage capacity to our update value
      td.innerHTML = storageID.storageType;

      // Get td of occupantType value
      td = updateRowIndex.getElementsByTagName("td")[3];

      // Reassign occupantType to our update value
      td.innerHTML = storageID.isCovered;

        // Get td of occupantType value
        td = updateRowIndex.getElementsByTagName("td")[4];

        // Reassign occupantType to our update value
        td.innerHTML = storageID.material;
    }
  }
}
