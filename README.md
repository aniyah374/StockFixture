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

The performance status is determined using the product's sell-through rate.

## 10. Restocking Priorities

To view Restocking Priorities:

1. Select **Restocking Priorities** from the navigation menu.
2. Review each product's quantity remaining.
3. Review each product's sell-through rate.
4. Review the priority assigned to each product.
5. Review the restocking recommendation.

StockFixture assigns products one of the following priorities:

- High Priority
- Medium Priority
- Low Priority

The priority is determined using the product's quantity remaining and sell-through rate.

## 11. Cost Per Unit

To enter Cost Per Unit information:

1. Select **Cost Per Unit** from the navigation menu.
2. Locate the product you want to update.
3. Enter the amount it costs to purchase or produce one unit of the product.
4. Repeat this process for additional products if needed.

The Cost Per Unit values are used by the Budget-Based Restocking Planner.

## 12. Budget-Based Restocking Planner

To use the Budget-Based Restocking Planner:

1. Select **Restocking Planner** from the navigation menu.
2. Enter a **Restocking Budget**.
3. Enter a **Cash Reserve** if you want to keep part of the budget available.
4. Select **Create Restocking Plan**.
5. StockFixture calculates how much money is available for restocking.
6. The planner creates suggested restocking quantities.

The recommendations are based on:

- Product priority
- Sell-through rate
- Quantity remaining
- Cost Per Unit
- Available budget

The Restocking Planner displays:

1. Product Name
2. Restocking Priority
3. Quantity Remaining
4. Sell-Through Rate
5. Cost Per Unit
6. Suggested Quantity
7. Your Quantity
8. Estimated Cost
9. Reason for the recommendation

## 13. Changing Restocking Quantities

The **Your Quantity** field can be changed by the user.

To change the quantity:

1. Locate the product in the Restocking Planner.
2. Change the number under **Your Quantity**.
3. StockFixture automatically recalculates the Estimated Cost.
4. The Planned Spending total is updated.
5. The Money Remaining total is updated.

If the selected quantities exceed the available restocking budget, StockFixture displays a warning.

## 14. Testing StockFixture

To confirm that StockFixture is working correctly:

1. Open `index.html`.
2. Enter a name into the welcome popup.
3. Select **Continue**.
4. Upload the sample CSV file included in the repository.
5. Confirm that the Dashboard displays the uploaded product information.
6. Confirm that the Total Products and other dashboard values are displayed.
7. Open the **Inventory** section.
8. Search for a product using its name or SKU.
9. Open **Product Performance**.
10. Review the calculated sell-through rates and performance statuses.
11. Open **Restocking Priorities**.
12. Confirm that products are assigned High, Medium, or Low priorities.
13. Open **Cost Per Unit**.
14. Enter Cost Per Unit values for products.
15. Open the **Restocking Planner**.
16. Enter a restocking budget.
17. Enter an optional cash reserve.
18. Select **Create Restocking Plan**.
19. Review the suggested quantities and estimated costs.
20. Change a value under **Your Quantity**.
21. Confirm that Planned Spending and Money Remaining update automatically.
22. Enter quantities that exceed the available budget.
23. Confirm that StockFixture displays an over-budget warning.

## 15. Technologies Used

StockFixture was developed using:

1. HTML
2. CSS
3. JavaScript
4. CSV files
5. Browser Local Storage
6. GitHub

## Author

Aniyah Campbell  
IST 440W – Fall 2026
