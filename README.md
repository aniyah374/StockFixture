# StockFixture

StockFixture is a web-based inventory and restocking dashboard designed for small e-commerce sellers. It allows users to upload inventory information through a CSV file, monitor product performance, identify products that may need to be restocked, enter product costs, and create a restocking plan based on a specific budget.

## 1. Project Files

The StockFixture project includes:

1. `index.html` – Contains the structure of the website.
2. `style.css` – Contains the design and styling of the website.
3. `script.js` – Contains the JavaScript used for CSV uploads, inventory calculations, validation, local storage, product performance, restocking priorities, and the Budget-Based Restocking Planner.
4. `README.md` – Contains instructions for running and testing StockFixture.
5. Sample CSV file – Contains sample inventory data that can be uploaded to StockFixture for testing.

## 2. How to Download StockFixture

1. Open the StockFixture GitHub repository.
2. Click the green **Code** button.
3. Select **Download ZIP**.
4. Locate the downloaded ZIP file on the computer.
5. Extract or unzip the downloaded folder.
6. Open the extracted StockFixture folder.

## 3. How to Run StockFixture

StockFixture does not require any additional software or installation.

1. Open the extracted StockFixture folder.
2. Locate the `index.html` file.
3. Double-click `index.html`.
4. StockFixture should open in the computer's default web browser.
5. Enter your name into the welcome popup.
6. Select **Continue**.
7. The StockFixture dashboard is now ready to use.

## 4. CSV File Requirements

To use StockFixture, the CSV file must contain the following column headers:

1. Product Name
2. SKU
3. Quantity
4. Total Purchases
5. Quantity Remaining
6. Price

The CSV file must also contain product information underneath the headers.

A sample CSV file is included in the repository so StockFixture can be tested without creating a new inventory file.

## 5. CSV Validation

StockFixture checks uploaded CSV files for several types of errors.

The system checks for:

1. Missing required columns
2. Missing product information
3. Invalid numbers
4. Negative values
5. Duplicate SKUs
6. CSV files containing headers but no product data

If an error is detected, StockFixture displays a message explaining what needs to be corrected before the file can be used.

## 6. How to Upload Inventory

1. Open StockFixture.
2. Select **Upload CSV**.
3. Locate the sample CSV file included in the StockFixture folder.
4. Select the CSV file.
5. StockFixture will validate the file.
6. If the file is valid, the inventory information will be displayed on the dashboard.

## 7. Dashboard

After uploading a valid CSV file, the Dashboard displays:

1. Total Products
2. Low Stock Items
3. Product Performance
4. Alerts

The Dashboard also displays the uploaded product information.

## 8. Inventory

To use the Inventory section:

1. Select **Inventory** from the navigation menu.
2. Review the uploaded product information.
3. View product names and SKUs.
4. View inventory quantities.
5. Use the search bar to search for a product by its product name or SKU.
6. Edit a product's selling price if needed.

Inventory information is saved using browser local storage so the data can remain available when the page is refreshed on the same browser.

## 9. Product Performance

To view Product Performance:

1. Select **Product Performance** from the navigation menu.
2. Review the sell-through rate for each product.
3. Review the performance status assigned to each product.
4. Review the product and pricing feedback provided by StockFixture.

Products may be categorized as:

- Performing Well
- Needs Attention
- Poor Performance

The performance status is determined using the product's sell
