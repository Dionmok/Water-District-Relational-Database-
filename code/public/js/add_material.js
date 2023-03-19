// Get the objects we need to modify
let addCustomerForm = document.getElementById("add-material-form-ajax");

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputMaterial = document.getElementById("material-input");

  // Get the values from the form fields
  let materialValue = inputMaterial.value;

  // Put our data we want to send in a javascript object
  let data = {
    material: materialValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-material-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // refresh page to re-load tables
      window.location.reload();

      // Clear the input fields for another transaction
      inputMaterial.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});
