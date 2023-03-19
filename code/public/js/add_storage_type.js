// Get the objects we need to modify
let addCustomerForm = document.getElementById("add-storage-type-form-ajax");

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputStorageType = document.getElementById("storageType-input");

  // Get the values from the form fields
  let storageTypeValue = inputStorageType.value;

  // Put our data we want to send in a javascript object
  let data = {
    storageType: storageTypeValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-storage-type-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // refresh page to re-load tables
      window.location.reload();

      // Clear the input fields for another transaction
      inputStorageType.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});
