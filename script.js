// Get elements from the HTML

const csvFile = document.getElementById("csvFile");
const csvError = document.getElementById("csvError");

const productTableBody = document.getElementById("productTableBody");
const performanceTableBody = document.getElementById("performanceTableBody");
const restockingTableBody = document.getElementById("restockingTableBody");
const costTableBody = document.getElementById("costTableBody");

const totalProducts = document.getElementById("totalProducts");
const lowStockItems = document.getElementById("lowStockItems");
const productPerformance = document.getElementById("productPerformance");
const alerts = document.getElementById("alerts");

const productSearch = document.getElementById("productSearch");

const dashboardBtn = document.getElementById("dashboardBtn");
const inventoryBtn = document.getElementById("inventoryBtn");
const performanceBtn = document.getElementById("performanceBtn");
const restockingBtn = document.getElementById("restockingBtn");
const costBtn = document.getElementById("costBtn");

const dashboardSummary = document.getElementById("dashboardSummary");
const inventorySection = document.getElementById("inventorySection");
const performanceSection = document.getElementById("performanceSection");
const restockingSection = document.getElementById("restockingSection");
const costSection = document.getElementById("costSection");


// Display inventory information

function displayInventory(products) {

  productTableBody.innerHTML = "";
  performanceTableBody.innerHTML = "";
  restockingTableBody.innerHTML = "";
  costTableBody.innerHTML = "";

  let productCount = 0;
  let lowStockCount = 0;
  let performingWellCount = 0;
  let alertCount = 0;


  for (let i = 0; i < products.length; i++) {

    let product = products[i];

    let productName = product.productName;
    let sku = product.sku;
    let quantity = Number(product.quantity);
    let totalPurchases = Number(product.totalPurchases);
    let quantityRemaining = Number(product.quantityRemaining);
    let price = Number(product.price);


    productCount++;


    // Check price

    let priceDisplay = "0.00";

    if (!isNaN(price)) {
      priceDisplay = price.toFixed(2);
    }


    // Calculate sell-through rate

    let totalAvailable = totalPurchases + quantityRemaining;

    let sellThroughRate = 0;

    if (totalAvailable > 0) {
      sellThroughRate = totalPurchases / totalAvailable;
    }


    // Count products performing well

    if (sellThroughRate >= 0.70) {
      performingWellCount++;
    }


    // Restocking priority

    let priority = "";
    let recommendation = "";

    if (quantityRemaining < 5 && sellThroughRate >= 0.70) {

      priority = "High";
      recommendation = "Restock soon";

    }

    else if (quantityRemaining < 10 || sellThroughRate >= 0.50) {

      priority = "Medium";
      recommendation = "Monitor and prepare to restock";

    }

    else {

      priority = "Low";
      recommendation = "No immediate restock needed";

    }


    // Product performance

    let performanceStatus = "";
    let feedback = "";

    if (totalAvailable === 0) {

      performanceStatus = "No Data";
      feedback = "Not enough information";

    }

    else if (sellThroughRate >= 0.70) {

      performanceStatus = "Performing Well";
      feedback = "Consider restocking";

    }

    else if (sellThroughRate >= 0.30) {

      performanceStatus = "Needs Attention";
      feedback = "Continue monitoring";

    }

    else {

      performanceStatus = "Poor Performance";
      feedback = "Consider pricing or product changes";

    }


    // Pricing feedback

    let pricingFeedback = "";

    if (totalAvailable === 0) {

      pricingFeedback = "Not enough data";

    }

    else if (sellThroughRate >= 0.70) {

      pricingFeedback = "Current pricing appears to be working";

    }

    else if (sellThroughRate >= 0.30) {

      pricingFeedback = "Monitor sales before changing the price";

    }

    else {

      pricingFeedback = "Consider reviewing the price";

    }


    // Low stock count

    if (quantityRemaining < 5) {
      lowStockCount++;
    }


    // Alerts

    if (quantityRemaining < 5) {

      alertCount++;

    }

    else if (totalAvailable > 0 && sellThroughRate < 0.30) {

      alertCount++;

    }


    // Inventory table

    let inventoryRow = document.createElement("tr");

    inventoryRow.innerHTML =
      "<td>" + productName + "</td>" +
      "<td>" + sku + "</td>" +
      "<td>" + quantity + "</td>" +
      "<td>" + totalPurchases + "</td>" +
      "<td>" + quantityRemaining + "</td>" +
      "<td><input type='number' class='price-input' min='0' step='0.01' value='" + priceDisplay + "'></td>";

    productTableBody.appendChild(inventoryRow);


    // Cost Per Unit

    let costPerUnit = "";

    if (product.costPerUnit !== undefined) {

      costPerUnit = product.costPerUnit;

    }

    else if (product.supplierCost !== undefined) {

      costPerUnit = product.supplierCost;
      product.costPerUnit = product.supplierCost;

    }


    let costRow = document.createElement("tr");

    costRow.innerHTML =
      "<td>" + productName + "</td>" +
      "<td>" + sku + "</td>" +
      "<td class='selling-price'>$" + priceDisplay + "</td>" +
      "<td><input type='number' class='cost-input' min='0' step='0.01' value='" + costPerUnit + "' placeholder='0.00'></td>";

    costTableBody.appendChild(costRow);


    // Edit Cost Per Unit

    let costInput = costRow.querySelector(".cost-input");

    costInput.addEventListener("change", function() {

      if (costInput.value === "") {

        product.costPerUnit = "";

        localStorage.setItem(
          "stockFixtureInventory",
          JSON.stringify(products)
        );

        return;
      }


      let newCost = Number(costInput.value);


      if (isNaN(newCost) || newCost < 0) {

        costInput.value = product.costPerUnit || "";

        return;
      }


      product.costPerUnit = newCost;


      localStorage.setItem(
        "stockFixtureInventory",
        JSON.stringify(products)
      );

    });


    // Edit product price

    let priceInput = inventoryRow.querySelector(".price-input");

    priceInput.addEventListener("change", function() {

      let newPrice = Number(priceInput.value);


      if (
        priceInput.value === "" ||
        isNaN(newPrice) ||
        newPrice < 0
      ) {

        priceInput.value = product.price.toFixed(2);

        return;
      }


      product.price = newPrice;

      priceInput.value = newPrice.toFixed(2);


      // Update price in Cost Per Unit table

      let sellingPriceCell = costRow.querySelector(".selling-price");

      sellingPriceCell.textContent =
        "$" + newPrice.toFixed(2);


      // Save updated price

      localStorage.setItem(
        "stockFixtureInventory",
        JSON.stringify(products)
      );

    });


    // Product performance table

    let performanceRow = document.createElement("tr");

    performanceRow.innerHTML =
      "<td>" + productName + "</td>" +
      "<td>" + totalPurchases + "</td>" +
      "<td>" + Math.round(sellThroughRate * 100) + "%</td>" +
      "<td>" + performanceStatus + "</td>" +
      "<td>" + feedback + "</td>" +
      "<td>" + pricingFeedback + "</td>";

    performanceTableBody.appendChild(performanceRow);


    // Restocking table

    let priorityClass = "";

    if (priority === "High") {

      priorityClass = "priority-high";

    }

    else if (priority === "Medium") {

      priorityClass = "priority-medium";

    }

    else {

      priorityClass = "priority-low";

    }


    let restockingRow = document.createElement("tr");

    restockingRow.innerHTML =
      "<td>" + productName + "</td>" +
      "<td>" + quantityRemaining + "</td>" +
      "<td>" + Math.round(sellThroughRate * 100) + "%</td>" +
      "<td class='" + priorityClass + "'>" + priority + "</td>" +
      "<td>" + recommendation + "</td>";

    restockingTableBody.appendChild(restockingRow);

  }


  // Update dashboard numbers

  totalProducts.textContent = productCount;

  lowStockItems.textContent = lowStockCount;

  productPerformance.textContent = performingWellCount;

  alerts.textContent = alertCount;


  // Sort restocking priorities

  let restockingRows = Array.from(
    restockingTableBody.rows
  );


  restockingRows.sort(function(a, b) {

    let firstPriority =
      a.cells[3].textContent;

    let secondPriority =
      b.cells[3].textContent;


    let firstNumber = 0;
    let secondNumber = 0;


    if (firstPriority === "High") {

      firstNumber = 1;

    }

    else if (firstPriority === "Medium") {

      firstNumber = 2;

    }

    else {

      firstNumber = 3;

    }


    if (secondPriority === "High") {

      secondNumber = 1;

    }

    else if (secondPriority === "Medium") {

      secondNumber = 2;

    }

    else {

      secondNumber = 3;

    }


    return firstNumber - secondNumber;

  });


  for (let i = 0; i < restockingRows.length; i++) {

    restockingTableBody.appendChild(
      restockingRows[i]
    );

  }

}


// CSV upload

csvFile.addEventListener("change", function() {

  let file = csvFile.files[0];


  csvError.textContent = "";

  csvError.style.display = "none";


  if (!file) {
    return;
  }


  // Check file type

  if (!file.name.toLowerCase().endsWith(".csv")) {

    csvError.textContent =
      "Please upload a CSV file.";

    csvError.style.display =
      "block";

    csvFile.value = "";

    return;

  }


  let reader = new FileReader();


  reader.onload = function(event) {

    let csvText =
      event.target.result.trim();


    // Check empty file

    if (csvText === "") {

      csvError.textContent =
        "The CSV file is empty.";

      csvError.style.display =
        "block";

      return;

    }


    let rows =
      csvText.split(/\r?\n/);


    let headers =
      rows[0].split(",");


    // Remove spaces from headers

    for (let i = 0; i < headers.length; i++) {

      headers[i] =
        headers[i].trim();

    }


    // Required columns

    let requiredHeaders = [
      "Product Name",
      "SKU",
      "Quantity",
      "Total Purchases",
      "Quantity Remaining",
      "Price"
    ];


    // Check missing columns

    let missingHeaders = [];


    for (let i = 0; i < requiredHeaders.length; i++) {

      if (!headers.includes(requiredHeaders[i])) {

        missingHeaders.push(
          requiredHeaders[i]
        );

      }

    }


    if (missingHeaders.length > 0) {

      csvError.textContent =
        "Missing required column(s): " +
        missingHeaders.join(", ");

      csvError.style.display =
        "block";

      return;

    }


    // Find column positions

    let productNameIndex =
      headers.indexOf("Product Name");

    let skuIndex =
      headers.indexOf("SKU");

    let quantityIndex =
      headers.indexOf("Quantity");

    let totalPurchasesIndex =
      headers.indexOf("Total Purchases");

    let quantityRemainingIndex =
      headers.indexOf("Quantity Remaining");

    let priceIndex =
      headers.indexOf("Price");


    let products = [];


    // Read CSV rows

    for (let i = 1; i < rows.length; i++) {


      if (rows[i].trim() === "") {

        continue;

      }


      let columns =
        rows[i].split(",");


      let productName = "";

      if (columns[productNameIndex] !== undefined) {

        productName =
          columns[productNameIndex].trim();

      }


      let sku = "";

      if (columns[skuIndex] !== undefined) {

        sku =
          columns[skuIndex].trim();

      }


      let quantity = "";

      if (columns[quantityIndex] !== undefined) {

        quantity =
          columns[quantityIndex].trim();

      }


      let totalPurchasesValue = "";

      if (columns[totalPurchasesIndex] !== undefined) {

        totalPurchasesValue =
          columns[totalPurchasesIndex].trim();

      }


      let quantityRemainingValue = "";

      if (columns[quantityRemainingIndex] !== undefined) {

        quantityRemainingValue =
          columns[quantityRemainingIndex].trim();

      }


      let priceValue = "";

      if (columns[priceIndex] !== undefined) {

        priceValue =
          columns[priceIndex].trim();

      }


      // Check missing information

      if (
        productName === "" ||
        sku === "" ||
        quantity === "" ||
        totalPurchasesValue === "" ||
        quantityRemainingValue === "" ||
        priceValue === ""
      ) {

        csvError.textContent =
          "Row " +
          (i + 1) +
          " contains missing information.";

        csvError.style.display =
          "block";

        return;

      }


      // Check numbers

      if (
        isNaN(Number(quantity)) ||
        isNaN(Number(totalPurchasesValue)) ||
        isNaN(Number(quantityRemainingValue)) ||
        isNaN(Number(priceValue))
      ) {

        csvError.textContent =
          "Row " +
          (i + 1) +
          " contains an invalid number. Check Quantity, Total Purchases, Quantity Remaining, and Price.";

        csvError.style.display =
          "block";

        return;

      }


      // Check negative numbers

      if (
        Number(quantity) < 0 ||
        Number(totalPurchasesValue) < 0 ||
        Number(quantityRemainingValue) < 0 ||
        Number(priceValue) < 0
      ) {

        csvError.textContent =
          "Row " +
          (i + 1) +
          " contains a negative inventory or price value.";

        csvError.style.display =
          "block";

        return;

      }


      // Save product

      let product = {

        productName: productName,

        sku: sku,

        quantity:
          Number(quantity),

        totalPurchases:
          Number(totalPurchasesValue),

        quantityRemaining:
          Number(quantityRemainingValue),

        price:
          Number(priceValue),

        costPerUnit: ""

      };


      products.push(product);

    }


    // Save inventory in browser

    localStorage.setItem(
      "stockFixtureInventory",
      JSON.stringify(products)
    );


    // Display inventory

    displayInventory(products);

  };


  reader.readAsText(file);

});


// Load saved inventory after refresh

let savedInventory =
  localStorage.getItem(
    "stockFixtureInventory"
  );


if (savedInventory) {

  try {

    let savedProducts =
      JSON.parse(savedInventory);


    if (Array.isArray(savedProducts)) {

      displayInventory(
        savedProducts
      );

    }

  }

  catch (error) {

    console.log(
      "Saved inventory could not be loaded."
    );

  }

}


// Product search

productSearch.addEventListener("input", function() {

  let searchText =
    productSearch.value.toLowerCase();


  let productRows =
    productTableBody.getElementsByTagName("tr");


  for (let i = 0; i < productRows.length; i++) {

    let productName =
      productRows[i]
        .cells[0]
        .textContent
        .toLowerCase();


    let sku =
      productRows[i]
        .cells[1]
        .textContent
        .toLowerCase();


    if (
      productName.includes(searchText) ||
      sku.includes(searchText)
    ) {

      productRows[i].style.display = "";

    }

    else {

      productRows[i].style.display = "none";

    }

  }

});


// Dashboard button

dashboardBtn.addEventListener("click", function() {

  dashboardSummary.classList.remove("hidden");

  inventorySection.classList.remove("hidden");

  performanceSection.classList.add("hidden");

  restockingSection.classList.add("hidden");

  costSection.classList.add("hidden");

});


// Inventory button

inventoryBtn.addEventListener("click", function() {

  dashboardSummary.classList.add("hidden");

  inventorySection.classList.remove("hidden");

  performanceSection.classList.add("hidden");

  restockingSection.classList.add("hidden");

  costSection.classList.add("hidden");

});


// Product Performance button

performanceBtn.addEventListener("click", function() {

  dashboardSummary.classList.add("hidden");

  inventorySection.classList.add("hidden");

  performanceSection.classList.remove("hidden");

  restockingSection.classList.add("hidden");

  costSection.classList.add("hidden");

});


// Restocking Priorities button

restockingBtn.addEventListener("click", function() {

  dashboardSummary.classList.add("hidden");

  inventorySection.classList.add("hidden");

  performanceSection.classList.add("hidden");

  restockingSection.classList.remove("hidden");

  costSection.classList.add("hidden");

});


// Cost Per Unit button

costBtn.addEventListener("click", function() {

  dashboardSummary.classList.add("hidden");

  inventorySection.classList.add("hidden");

  performanceSection.classList.add("hidden");

  restockingSection.classList.add("hidden");

  costSection.classList.remove("hidden");

});


// Welcome name popup

const namePopup = document.getElementById("namePopup");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const userName = document.getElementById("userName");
const nameError = document.getElementById("nameError");


// Check if a name was already saved

let savedName =
  localStorage.getItem(
    "stockFixtureUserName"
  );


if (savedName) {

  userName.textContent = savedName;

  namePopup.style.display = "none";

}

// Save name

saveNameBtn.addEventListener("click", function() {

  let newName =
    nameInput.value.trim();


  if (newName === "") {

    nameError.textContent =
      "Please enter your name.";

    return;

  }

  localStorage.setItem(
    "stockFixtureUserName",
    newName
  );

  userName.textContent =
    newName;


  namePopup.style.display =
    "none";

});
