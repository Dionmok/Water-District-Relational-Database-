// Get the objects we need to modify
let addCustomerForm = document.getElementById("add-customer-form-ajax");

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputpotableWater = document.getElementById("potableWater-input");
  let inputrecycledWater = document.getElementById("recycledWater-input");
  let inputoccupantType = document.getElementById("occupantType-input");

  // Get the values from the form fields
  let potableWaterValue = inputpotableWater.value;
  let recycledWatertValue = inputrecycledWater.value;
  let occupantTypeValue = inputoccupantType.value; // this is where I need to figure out how to pull from drop down

  // Put our data we want to send in a javascript object
  let data = {
    potableWater: potableWaterValue,
    recycledWater: recycledWatertValue,
    occupantType: occupantTypeValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      window.location.reload();

      // Clear the input fields for another transaction
      inputpotableWater.value = "";
      inputrecycledWater.value = "";
      inputoccupantType.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});
