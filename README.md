StockFixture

StockFixture is a web-based inventory and restocking dashboard designed for small e-commerce sellers. It allows users to upload inventory information through a CSV file, monitor product performance, identify products that may need to be restocked, enter product costs, and create a restocking plan based on a specific budget.


Project Files
The StockFixture project includes:
index.html – Contains the structure of the website.
style.css – Contains the design and styling of the website.
script.js – Contains the JavaScript used for CSV uploads, inventory calculations, validation, local storage, product performance, restocking priorities and the Budget-Based Restocking Planner.
README.md – Contains instructions for running and testing StockFixture.
Sample CSV file – Contains sample inventory data that can be uploaded to StockFixture for testing.


How to Download StockFixture:
Open the StockFixture GitHub repository.
Click the green Code button.
Select Download ZIP.
Locate the downloaded ZIP file on the computer.
Extract or unzip the folder.
Open the extracted StockFixture folder.
How to Run StockFixture
StockFixture does not require any additional software or installation.
Open the downloaded StockFixture folder.
Locate the index.html file.
Double-click index.html.
StockFixture should open in the computer's default web browser.

Enter your name into the welcome popup and select the button to continue.

The dashboard is now ready to use.


CSV File Requirements
To use StockFixture, upload a .csv file containing the following column headers:
Product Name
SKU
Quantity
Total Purchases
Quantity Remaining
Price

The CSV file must contain product information underneath the headers.

A sample CSV file is included in the repository so StockFixture can be tested without creating a new inventory file.


StockFixture checks uploaded files for several types of errors, including:
Missing required columns
Missing product information
Invalid numbers
Negative values
Duplicate SKUs
CSV files containing headers but no product data

If an error is detected, StockFixture will display a message explaining what needs to be corrected.


How to Use StockFixture Dashboard:
After uploading a valid CSV file, the Dashboard displays:
Total Products
Low Stock Items
Product Performance
Alerts
Inventory

The Inventory section displays the uploaded product information.
Users can:
View product names and SKUs
View inventory quantities
Search for products using the search bar
Edit product prices

Inventory information is saved using local storage so the data can remain available when the page is refreshed on the same browser.

Product Performance

The Product Performance section calculates each product's sell-through rate using its purchase and inventory information.
Products are categorized based on their performance and are provided with feedback to help the user determine whether the product should continue to be monitored or reviewed.
Restocking Priorities

StockFixture assigns products a:
High Priority
Medium Priority
Low Priority
The priority is determined using the product's remaining quantity and sell-through rate.


Cost Per Unit
The Cost Per Unit section allows users to enter or update how much each product costs to purchase or produce.
These values are used by the Budget-Based Restocking Planner.


Budget-Based Restocking Planner
The Restocking Planner helps users decide how they may use a limited restocking budget.
To use the planner:
Enter a Restocking Budget.
Enter a Cash Reserve if you want to keep some of the budget available.

Select Create Restocking Plan.

StockFixture calculates how much money is available for restocking.

The planner recommends quantities based on product priority, sell-through rate, quantity remaining, Cost Per Unit, and the available budget.



The results include:
Product Name
Restocking Priority
Quantity Remaining
Sell-Through Rate
Cost Per Unit
Suggested Quantity
Your Quantity
Estimated Cost
Reason for the recommendation
The Your Quantity field can be changed by the user.
When the quantity is changed, StockFixture automatically recalculates:
Estimated Cost
Planned Spending
Money Remaining

If the selected quantities exceed the available restocking budget, StockFixture displays a warning.


Testing the Project

To confirm that StockFixture is working correctly:
Open index.html.
Enter a name into the welcome popup.
Upload the sample CSV file included in the repository.
Confirm that the Dashboard displays the uploaded product information.
Open the Inventory section and search for a product.
Open Product Performance and review the calculated sell-through rates.
Open Restocking Priorities and confirm that products are assigned High, Medium, or Low priorities.
Enter Cost Per Unit values for products.
Open the Restocking Planner.
Enter a budget and optional cash reserve.
Create the restocking plan.
Change a value under Your Quantity and confirm that the spending totals update.
Enter quantities that exceed the available budget to confirm that the budget warning appears.

Technologies Used

StockFixture was developed using:
HTML
CSS
JavaScript
CSV files
Browser Local Storage
GitHub

Author

Aniyah Campbell
IST 440W – Fall 2026
