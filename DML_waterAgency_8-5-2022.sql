--------------------------
-- customers page (Lance)
--------------------------

-- get all customers and their addresses for the customers page
SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, addresses.city, addresses.state, addresses.zip
from customers
join addresses on addresses.customersCustomerID = customerID;

-- add a new customer
INSERT INTO customers (potableWater, recycledWater, occupantTypesOccupantType) VALUES 
(:potableWater, :recycledWater, :occupantType_from_dropdown_Input)

-- update a customer based on submission of the Update Customer form 
UPDATE customers SET potableWater = :potableWater, recycledWater= :recycledWater, occupantTypesOccupantType 
= :occupantType_from_dropdown_Input, WHERE 
id= :customer_ID_selected_from_customer_page

-- delete a customer
DELETE FROM customer WHERE id = :customer_ID_selected_from_customer_page

-- search for customer
SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, addresses.city, addresses.state, addresses.zip
from customers
join addresses on addresses.customersCustomerID = customerID
where occupantTypesOccupantType = :occupantType_from_dropdown_Input and addresses.zip = :zip;

-- occupantType drop down
SELECT occupantType FROM occupanttypes;

-- customerID drop down
SELECT customerID FROM customers;


--------------------------
-- addresses page (Lance)
--------------------------

-- select addresses and also show storageID
SELECT addressID, street, city, state, zip, customerscustomerID
FROM addresses;

-- select all customers with address id
SELECT customerID, potableWater, recycledWater, occupantTypesOccupantType, addresses.street, addresses.city, addresses.state, addresses.zip
from customers
join addresses on addresses.customersCustomerID = customerID;

-- insert new address 
insert into addresses(street, city, state, zip, customerscustomerID)
values(:street, :city, :state, :zip, :customerscustomerID_from_drop_down);

--------------------------
-- materials page (Lance)
--------------------------

-- select all material types
SELECT material FROM materials;

-- add new material type
Insert into materials(material) values(:material);

-- delete material
DELETE FROM materials WHERE material = :material_from_dropdown_Input

--------------------------
-- occupanttypes page (Lance)
--------------------------

-- select all occupant types
SELECT occupantType FROM occupanttypes;

-- add new occupant type
insert into occupantTypes(occupantType) 
values (:occupantType);

--------------------------
-- sources page (Dion)
--------------------------

-- select all sources
SELECT sourceName, waterSupplied FROM sources;

-- add a new source
INSERT INTO sources (sourceName, waterSupplied) VALUES 
(:sourceName, :waterSupplied)

-- update a source based on submission of the Update Source form 
UPDATE sources SET sourceName = :sourceName, waterSupplied= :waterSupplied WHERE 
sourceName= :sourceName_selected_from_sources_page

-- delete a source
DELETE FROM source WHERE sourceName = :sourceName_selected_from_sources_page

-- search for customer
SELECT waterSupplied, recycledWater FROM sources

-- pull source type from Drop Down
SELECT * FROM sourcetypes;

--------------------------
-- sourcetypes (Dion)
--------------------------
SELECT * FROM SourceTypes;

-- add new storage type
Insert into SourceTypes(sourceType) values(:sourceType);

--------------------------
-- storages (Dion)
--------------------------

-- get all storages
SELECT storageID, storageCapacity, storageTypesStorageType, isCovered, materialsMaterial
from storages;

-- add a new storage
INSERT INTO storages (storageCapacity, storageTypesStorageType, isCovered, materialsMaterial) VALUES 
(:storageCapacity, :storageTypes_from_dropdown_Input, :isCovered_from_dropdown_Input, material_from_dropdown_Input)

-- update a storage based on submission of the Update Storage form 
UPDATE storages SET storageCapacity = :storageCapacity, storageTypesStorageType = :storageTypes_from_dropdown_Input, isCovered 
= :isCovered_from_dropdown_Input, materialsMaterial = :material_from_dropdown_Input WHERE 
storageid:storage_ID_selected_from_storage_page

-- delete a storage
DELETE FROM storages WHERE storageid:storage_ID_selected_from_storage_page

-- search for storage
SELECT storageID, storageCapacity, storageTypesStorageType, isCovered, materialsMaterial
from storages

-- storageTypesStorageType drop down
SELECT storageTypesStorageType FROM storages;

-- isCovered drop down
SELECT isCovered FROM storages;

-- materialsMaterial drop down
SELECT materialsMaterial FROM storages;

-- storage ID drop down
SELECT storageID FROM storages;

-- select sourceName
SELECT sourceName FROM sources;

-- get last storageID that was entered
select max(storageID) as lastStorageID from storages;

--------------------------
-- storagetypes (Dion)
--------------------------
SELECT storageType FROM StorageTypes;

-- add new storage type
Insert into StorageTypes(storageType) values(:storageType);

--------------------------
-- storagehasaddresses (Dion/Lance)
--------------------------

-- get storageHasAddresses table
SELECT storageStorageID, addressesAddressID FROM storagehasaddresses;

-- add new entry to storageHasAddresses
INSERT INTO storagehasaddresses (storageStorageID, addressesAddressID) VALUES (:last_storage_id, :address_id);

--------------------------
-- storagehassources (Dion/Lance)
--------------------------

-- get the storageHasSources table
SELECT storageStorageID, sourcesSourceName FROM storagehassources;

-- add new entry to storageHasSources
INSERT INTO storagehassources (storageStorageID, sourcesSourceName) VALUES (:last_storage_id, :sourceName);

--------------------------
-- sourceshassourcetypes 
--------------------------

-- get the sourcesHasSourceTypes table
SELECT sourcesSourceName, sourceTypesSourceType FROM sourceshassourcetypes;

-- add to sourcesHasSourceTypes table
INSERT INTO sourceshassourcetypes (sourcesSourceName, sourceTypesSourceType) VALUES (:source_name_from_drop_down, :sourceTypesSourceType_from_drop_down)



