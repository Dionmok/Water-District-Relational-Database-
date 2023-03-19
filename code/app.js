// App.js

// Citation for app and javascript files
// Date: 7/28/2022
// Entire app/website is heavily based on the Node Starter App
// Adapted from the code at this URL:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

PORT = 9122; // Set a port number at the top so it's easy to change in the future

const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars"); // Import express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set("view engine", ".hbs"); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use("/public", express.static(__dirname + "/public"));

var db = require("./database/db-connector");

/*
    ROUTES
*/

app.get("/", function (req, res) {
  res.render("index"); // Render the index.hbs file, and also send the renderer
});

// app.use('/customers', customersRouter)

app.get("/customers", function (req, res) {
  let query1;

  if ((req.query.zipCode == "") | (req.query.zipCode === undefined)) {
    query1 =
      "SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, \
            addresses.city, addresses.state, addresses.zip \
            from customers \
            left join addresses on addresses.customersCustomerID = customerID;"; // Define our query
  } else {
    query1 = `SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, 
            addresses.city, addresses.state, addresses.zip 
            from customers 
            left join addresses on addresses.customersCustomerID = customerID 
            where addresses.zip =  ${req.query.zipCode}`;
  }

  let query2 = `SELECT occupantType FROM occupanttypes;`;

  let query3 = `SELECT customerID FROM customers order by customerID;`;

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let customers = rows;

    db.pool.query(query2, (error, rows, fields) => {
      let occupanttypes = rows;

      db.pool.query(query2, (error, rows, fields) => {
        let occupanttypes = rows;

        db.pool.query(query3, (error, rows, fields) => {
          let customerIDs = rows;
          return res.render("customers", {
            data: customers,
            occupanttypes: occupanttypes,
            customerIDs: customerIDs,
          });
        });
        // Render the customers.hbs file, and also send the renderer

        // an object where 'data' is equal to the 'rows' we
      });
    });
  });
});

app.get("/addresses", function (req, res) {
  let query1 = `SELECT addressID, street, city, state, zip, customerscustomerID
                FROM addresses;`;

  let query2 =
    "SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, \
            addresses.city, addresses.state, addresses.zip \
            from customers \
            left join addresses on addresses.customersCustomerID = customerID;";

  db.pool.query(query1, function (error, rows, fields) {
    addresses = rows;

    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      db.pool.query(query2, function (error, rows, fields) {
        customers = rows;
        // Check to see if there was an error
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render("addresses", {
            addresses: addresses,
            customers: customers,
          });
        }
      });
    }
  });
});

app.get("/materials", function (req, res) {
  let query1 = `SELECT material FROM materials;`;

  db.pool.query(query1, function (error, rows, fields) {
    materials = rows;

    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else
      res.render("materials", {
        materials: materials,
      });
  });
});

app.get("/occupanttypes", function (req, res) {
  let query1 = `SELECT occupantType FROM occupanttypes;`;

  db.pool.query(query1, function (error, rows, fields) {
    occupantTypes = rows;

    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else
      res.render("occupanttypes", {
        occupantTypes: occupantTypes,
      });
  });
});

app.get("/storages", function (req, res) {
  let query1 =
    "SELECT storageID, storageCapacity, storageTypesStorageType, isCovered, materialsMaterial from storages;"; // Define our query

  let query2 = `SELECT storageType FROM storagetypes;`;

  let query3 = `SELECT isCovered FROM storages;`;

  let query4 = `SELECT material FROM materials;`;

  let query5 = `SELECT addressID, street, city, state, zip, customerscustomerID
                FROM addresses;`;

  let query6 = `SELECT sourceName FROM sources;`;

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let storages = rows;

    db.pool.query(query2, (error, rows, fields) => {
      let storagetypes = rows;

      db.pool.query(query3, (error, rows, fields) => {
        let isCovered = rows;

        db.pool.query(query4, (error, rows, fields) => {
          let material = rows;

          db.pool.query(query5, (error, rows, fields) => {
            let addresses = rows;

            db.pool.query(query6, (error, rows, fields) => {
              let sources = rows;

              db.pool.query(query1, (error, rows, fields) => {
                let storageIDs = rows;
                return res.render("storages", {
                  data: storages,
                  storagetypes: storagetypes,
                  isCovered: isCovered,
                  material: material,
                  storageIDs: storageIDs,
                  addresses: addresses,
                  sources: sources,
                });
              });
            });
          });
        });
        // Render the storages.hbs file, and also send the renderer

        // an object where 'data' is equal to the 'rows' we
      });
    });
  });
});

app.get("/storagetypes", function (req, res) {
  let query1 = `SELECT storageType FROM storagetypes;`;

  db.pool.query(query1, function (error, rows, fields) {
    storageTypes = rows;

    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else
      res.render("storagetypes", {
        storageTypes: storageTypes,
      });
  });
});

app.get("/sourcetypes", function (req, res) {
  let query1 = `SELECT * FROM sourcetypes`;

  db.pool.query(query1, function (error, rows, fields) {
    sourceTypes = rows;

    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else
      res.render("sourcetypes", {
        sourceTypes: sourceTypes,
      });
  });
});

app.get("/sourceshassourcetypes", function (req, res) {
  let query1 = `SELECT sourcesSourceName, sourceTypesSourceType FROM sourceshassourcetypes;`;

  db.pool.query(query1, function (error, rows, fields) {
    sourcesHasSourceTypes = rows;

    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else
      res.render("sourceshassourcetypes", {
        sourcesHasSourceTypes: sourcesHasSourceTypes,
      });
  });
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});

// app.js - ROUTES section

app.post("/add-customer-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Capture NULL values
  let potableWater = parseInt(data.potableWater);
  if (isNaN(potableWater)) {
    potableWater = 0;
  }

  let recycledWater = parseInt(data.recycledWater);
  if (isNaN(recycledWater)) {
    recycledWater = 0;
  }

  let occupantType = "'" + data.occupantType.toString() + "'";

  // Create the query and run it on the database

  query1 = `INSERT INTO customers (potableWater, recycledWater, occupantTypesOccupantType) VALUES ('${potableWater}', '${recycledWater}', ${occupantType})`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on customers
      query2 =
        "SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, \
                        addresses.city, addresses.state, addresses.zip \
                        from customers \
                        left join addresses on addresses.customersCustomerID = customerID; ";
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(rows);
        }
      });
    }
  });
});

app.delete("/delete-customer-ajax/", function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);
  let delete_customer = `DELETE FROM customers WHERE customerID = ?`;

  // Run the 1st query
  db.pool.query(delete_customer, [customerID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.put("/put-customer-ajax", function (req, res, next) {
  let data = req.body;

  let recycledWater = parseInt(data.recycledWater);
  let potableWater = parseInt(data.potableWater);
  let occupantType = data.occupantType;
  let customerID = data.customerID.toString();

  let queryUpdateCustomer = `UPDATE customers SET potableWater = ?, recycledWater = ?, occupantTypesOccupantType 
        = ? WHERE (customerID = ?);`;

  // Run the 1st query
  db.pool.query(
    queryUpdateCustomer,
    [potableWater, recycledWater, occupantType, customerID],
    function (error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/sources", function (req, res) {
  let query1 = `SELECT sourceName, waterSupplied FROM sources;`;

  let query2 = `SELECT * FROM sourcetypes;`;

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let sources = rows;

    db.pool.query(query2, (error, rows, fields) => {
      let sourceTypes = rows;

      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        return res.render("sources", {
          sources: sources,
          sourceTypes: sourceTypes,
        });
      }
    });
  });
});

app.post("/add-sources-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let sourceName = data.sourceName;
  let waterSupplied = data.waterSupplied;
  let sourceType = data.sourceType;

  // Create the query and run it on the database
  query1 = `INSERT INTO sources (sourceName, waterSupplied) VALUES ('${sourceName}','${waterSupplied}')`;
  query2 = `INSERT INTO sourceshassourcetypes (sourcesSourceName, sourceTypesSourceType) VALUES ('${sourceName}','${sourceType}')`;
  query3 = "SELECT * FROM sources;";
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on Sources
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        } else {
          db.pool.query(query3, function (error, rows, fields) {
            // If there was an error on the second query, send a 400
            if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else {
              res.send(rows);
            }
          });
        }
      });
    }
  });
});

app.post("/add-address-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let street = data.street;
  let city = data.city;
  let state = data.state;
  let zip = data.zip;
  let customerID = data.customerID;

  // Create the query and run it on the database
  query1 = `insert into addresses(street, city, state, zip, customerscustomerID)
                values('${street}', '${city}', '${state}', '${zip}', ${customerID});`;

  query2 = `SELECT addressID, street, city, state, zip, customerscustomerID
                FROM addresses;`;

  query3 =
    "SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, \
                addresses.city, addresses.state, addresses.zip \
                from customers \
                left join addresses on addresses.customersCustomerID = customerID; ";

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If there was no error, perform a SELECT * on customers

      db.pool.query(query2, function (error, rows, fields) {
        let addresses = rows;

        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          res.send(addresses);
        }
      });
    }
  });
});

app.post("/add-material-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let material = data.material;

  // Create the query and run it on the database
  query1 = `insert into materials(material)
                values('${material}');`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If all went well, send the results of the query back.

      res.send(materials);
    }
  });
});

app.delete("/delete-material-ajax", function (req, res, next) {
  let data = req.body;
  let material = data.material;
  let delete_material = `DELETE FROM materials WHERE material = ?`;

  // Run the 1st query
  db.pool.query(delete_material, [material], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.post("/add-occupant-type-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let occupantType = data.occupantType;

  // Create the query and run it on the database
  query1 = `insert into occupanttypes(occupantType) 
                values('${occupantType}');`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If all went well, send the results of the query back.

      res.sendStatus(200);
    }
  });
});

app.post("/add-storage-type-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let storageType = data.storageType;

  // Create the query and run it on the database
  query1 = `insert into storagetypes(storageType) 
                values('${storageType}');`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If all went well, send the results of the query back.

      res.sendStatus(200);
    }
  });
});

app.post("/add-source-type-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  let sourceType = data.sourceTypes;

  // Create the query and run it on the database
  query1 = `insert into sourcetypes(sourceType) 
                values('${sourceType}');`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // If all went well, send the results of the query back.

      res.sendStatus(200);
    }
  });
});

app.delete("/delete-source-ajax", function (req, res, next) {
  let data = req.body;
  let source = data.source;
  let delete_source = `DELETE FROM sources WHERE sourceName = ?`;

  // Run the 1st query
  db.pool.query(delete_source, [source], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.put("/put-source-ajax", function (req, res, next) {
  let data = req.body;

  let waterSupplied = data.waterSupplied;
  let sourceName = data.sourceName;
  let newSourceName = data.newSourceName;

  let queryUpdateSource = `UPDATE sources SET sourceName = ?, waterSupplied = ? WHERE 
      sourceName = ?;`;

  // Run the 1st query
  db.pool.query(
    queryUpdateSource,
    [newSourceName, waterSupplied, sourceName],
    function (error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    }
  );
});

app.put("/put-storages-ajax", function (req, res, next) {
  let data = req.body;

  let = parseInt(data.recycledWater);
  let potableWater = parseInt(data.potableWater);
  let occupantType = data.occupantType;
  let customerID = data.customerID.toString();

  let queryUpdateCustomer = `UPDATE customers SET potableWater = ?, recycledWater = ?, occupantTypesOccupantType 
        = ? WHERE (customerID = ?);`;

  // Run the 1st query
  db.pool.query(
    queryUpdateCustomer,
    [potableWater, recycledWater, occupantType, customerID],
    function (error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/add-storage-ajax", function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Capture NULL values
  let storageCapacity = parseInt(data.storageCapacity);
  if (isNaN(storageCapacity)) {
    storageCapacity = 0;
  }

  let storageType = data.storageType;
  let isCovered = data.isCovered;
  let material = data.material;
  let addressID = data.addressID;
  let sourceName = data.sourceName;

  // Create the query and run it on the database
  query1 = `INSERT INTO storages (storageCapacity, storageTypesStorageType, isCovered, materialsMaterial) VALUES ('${storageCapacity}', '${storageType}', '${isCovered}', '${material}')`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      let storagesInfo = rows;
      // If there was no error, perform a SELECT * on storages
      query2 =
        "SELECT storageID, storageCapacity, storageTypesStorageType, isCovered, materialsMaterial from storages;";
      db.pool.query(query2, function (error, rows, fields) {
        // If there was an error on the second query, send a 400
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        // If all went well, send the results of the query back.
        else {
          // get the last inserted ID, I wasn't sure how else to do this.
          // adapted from https://beansoftware.com/T-SQL-FAQ/Get-Last-Inserted-ID.aspx
          query5 = `select max(storageID) as lastStorageID from storages`;
          db.pool.query(query5, function (error, rows, fields) {
            lastID = rows;
            if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else {
              query3 = `INSERT INTO storagehasaddresses (storageStorageID, addressesAddressID) VALUES ('${lastID[0].lastStorageID}', '${addressID}');`;
              db.pool.query(query3, function (error, rows, fields) {
                if (error) {
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                  query4 = `INSERT INTO storagehassources (storageStorageID, sourcesSourceName) VALUES ('${lastID[0].lastStorageID}', '${sourceName}');`;
                  db.pool.query(query4, function (error, rows, fields) {
                    if (error) {
                      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                      console.log(error);
                      res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else {
                      res.send(rows);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.put("/put-storage-ajax", function (req, res, next) {
  let data = req.body;

  let storageCapacity = data.storageCapacity;
  let storageType = data.storageType;
  let isCovered = data.isCovered;
  let material = data.material;
  let storageID = data.storageID;

  let queryUpdateStorage = `UPDATE storages SET storageCapacity = ?, storageTypesStorageType = ?, isCovered 
  = ?, materialsMaterial = ? WHERE storageID = '${storageID}'`;

  // Run the 1st query
  db.pool.query(
    queryUpdateStorage,
    [storageCapacity, storageType, isCovered, material, storageID],
    function (error, rows, fields) {
      if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/source-types", function (req, res) {
  let query1 = `SELECT sourceType FROM sourcetypes;`;

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let sourceTypes = rows;

    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      return res.render("sourcetypes", {
        sourceTypes: sourceTypes,
      });
    }
  });
});

app.get("/storagehasaddresses", function (req, res) {
  let query1 = `SELECT storageStorageID, addressesAddressID FROM storagehasaddresses;`;

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let storageandaddress = rows;

    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      return res.render("storagehasaddresses", {
        storageandaddress: storageandaddress,
      });
    }
  });
});

app.get("/storagehassources", function (req, res) {
  let query1 = `SELECT storageStorageID, sourcesSourceName FROM storagehassources;`;

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    let storageandsources = rows;

    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      return res.render("storagehassources", {
        storageandsources: storageandsources,
      });
    }
  });
});
