// Get the objects we need to modify
let updateSourceForm = document.getElementById("update-source-form-ajax");

// Modify the objects we need
updateSourceForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputSourceName = document.getElementById("input-source-name");
  let inputWaterSupplied = document.getElementById("input-water-supplied");
  let inputSourceType = document.getElementById("input-source-type");
  let inputNewSourceName = document.getElementById("input-new-source-name");

  // Get the values from the form fields
  let sourceName = inputSourceName.value;
  let waterSupplied = inputWaterSupplied.value;
  let sourceType= inputSourceType.value;
  let newSourceName = inputNewSourceName.value;

  // set defaults for potableWater and recycledWater, cannot pass null values

  if (waterSupplied === "") {
    waterSupplied = 0;
  }

  // Put our data we want to send in a javascript object
  let data = {
    sourceName: sourceName,
    waterSupplied: waterSupplied,
    sourceType: sourceType,
    newSourceName: newSourceName,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-source-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      window.location.reload();
      //updateRow(xhttp.response, data);

      // clear the update fields
      waterSupplied.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, sourceName) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("sources-table");

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (
      table.rows[i].getAttribute("sourcenamevalue") == sourceName.sourceName
    ) {
      // Get the location of the row where we found the matching source name
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of potable water value
      let td = updateRowIndex.getElementsByTagName("td")[1];

      // Reassign potable water to our update value
      td.innerHTML = sourceName.waterSupplied;
    }
  }
}
