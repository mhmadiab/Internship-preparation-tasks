# API Documentation

This is the API documentation for the Item Management Service. The API allows users to add, update, delete, and retrieve items. It also includes validation for phone numbers.

## Prerequisites:
- Node.js
- MongoDB
- External API for phone number validation

# API Endpoints:

1. POST /api/item/additem:
Description: Adds a new item to the database. Optionally, validates the phone number by calling an external API to check the validity.

Request Body:
{
  "name": "Item Name",
  "description": "Item Description",
  "phoneNumber": "1234567890"
}

Response: 
200 OK: 
{
  "message": "Item created successfully",
  "item": {
    "name": "Item Name",
    "description": "Item Description",
    "countryCode": "US",
    "countryName": "United States",
    "operatorName": "Verizon"
  }
}

400 Bad Request: 
{
  "message": "Invalid phone number"
}

---------------------------------------------------------------
2. PATCH /api/item/updateitem/:id
Description: Updates an existing item by ID. Optionally, validates the phone number if provided.

Request Parameters: id (string): The unique ID of the item to update.

Request Body: 
{
  "name": "Updated Item Name",
  "description": "Updated Description",
  "phoneNumber": "9876543210"
}

Response:
200 OK:
{
  "message": "Success",
  "item": {
    "name": "Updated Item Name",
    "description": "Updated Description",
    "countryCode": "IN",
    "countryName": "India",
    "operatorName": "Airtel"
  }
}

404 Not Found:
{
  "message": "Item not found"
}

------------------------------------------------------------

3. DELETE /api/item/deleteitem/:id
Description: Deletes an item from the database by ID.

Request Parameters:
id (string): The unique ID of the item to delete.


Response:
200 OK:
{
  "message": "Item deleted successfully",
  "item": {
    "name": "Deleted Item",
    "description": "Item Description",
    "countryCode": "GB",
    "countryName": "United Kingdom",
    "operatorName": "Vodafone"
  }
}

404 Not Found:
{
  "message": "Item not found"
}

----------------------------------------------------------------------

4. GET /api/item/allitems
Description: Fetches all items from the database.

Response:

200 OK: List of all items.
{
  "message": "Items found",
  "items": [
    {
      "name": "Item 1",
      "description": "Description 1",
      "countryCode": "US",
      "countryName": "United States",
      "operatorName": "Verizon"
    },
    {
      "name": "Item 2",
      "description": "Description 2",
      "countryCode": "IN",
      "countryName": "India",
      "operatorName": "Airtel"
    }
  ]
}

400: No items found.
{
  "message": "No items found",
  "items": []
}

------------------------------------------------------------

# Common Errors:
400 Bad Request:
{
  "message": "Invalid phone number"
}

404 Not Found:
{
  "message": "Item not found"
}

500 Internal Server Error:
{
  "message": "An error occurred while processing the request"
}

----------------------------------------------------------------


5. POST /api/number/validatenumber
Description: Validates a phone number using the google-libphonenumber library and an external API (NumVerify). The API checks if the number is valid and returns details about the number such as the country code, country name, and operator name.

Request Body:
{
  "phoneNumber": "+1234567890"
}
phoneNumber (string): The phone number to validate.

Response:

200 OK:
{
  "message": "valid phone number",
  "data": {
    "countryCode": "+1",
    "countryName": "United States",
    "operatorName": "Verizon"
  }
}

400 Bad Request:
{
  "message": "Invalid phone number",
  "data": null
}


400 Bad Request (Invalid for region):
{
  "message": "The number is invalid for the region: US",
  "data": null
}


500 Internal Server Error:
{
  "message": "An error occurred while validating the phone number.",
  "data": null
}




# Error Handling for this Endpoint: 
Missing API Key:
{
  "error": "API key is missing."
}

Validation Error:
{
  "message": "The number is invalid for the region: <RegionCode>.",
  "data": null
}


----------------------------------------------------------------------------------

# Instructions to Run the Code

Before running the code, ensure that the following software is installed on your machine:

Step 1:

    1. Node.js: This is the runtime environment for JavaScript that allows you to run the server-side code.

    Download and install Node.js.
    You can verify the installation by running the following commands in your terminal:
    - node -v
    - npm -v

    2. MongoDB:
    You can either install MongoDB locally or use MongoDB Atlas for a cloud database setup.

Step 2: 

Clone the Repository, clone it to your local machine using the following command:
- git clone https://github.com/mhmadiab/Internship-preparation-tasks


Step 3: 

Install Dependencies
Navigate to the project directory and install the necessary dependencies:

- npm install
This will install all the required libraries from the package.json file.


Step 4: Run the Server
Once everything is set up, run the server using the following command:

- npm start

---------------------------------------------------------------------------------------

Efficient Parts of the Code

1. Phone Number Validation:

The integration with google-libphonenumber and the external API (NumVerify) is well-structured. The combination of local phone number parsing and region-specific validation ensures high reliability.



2. Error Handling:

The code includes structured error handling, such as handling invalid phone numbers, missing environment variables, and internal errors. This helps in debugging and provides meaningful messages for users.

3. Database Operations:

Using mongoose for MongoDB interaction (via itemModel) is efficient for querying, updating, and deleting data. The use of findByIdAndUpdate and findByIdAndDelete allows for straightforward and reliable database operations.

4. Code Structure:

The code is modularized into routes and controllers. This separation of concerns makes it easy to add new features or modify existing ones.