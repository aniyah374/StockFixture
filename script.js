
// ==================================================
// 1. GET ELEMENTS FROM HTML
// ==================================================

// CSV upload
const csvFile = document.getElementById("csvFile");
const csvError = document.getElementById("csvError");

// Tables
const productTableBody = document.getElementById("productTableBody");
const performanceTableBody = document.getElementById("performanceTableBody");
const restockingTableBody = document.getElementById("restockingTableBody");
const costTableBody = document.getElementById("costTableBody");

// Dashboard numbers
const totalProducts = document.getElementById("totalProducts");
const lowStockItems = document.getElementById("lowStockItems");
const productPerformance = document.getElementById("productPerformance");
const alerts = document.getElementById("alerts");

// Search
const productSearch = document.getElementById("productSearch");

// Navigation buttons
const dashboardBtn = document.getElementById("dashboardBtn");
const inventoryBtn = document.getElementById("inventoryBtn");
const performanceBtn = document.getElementById("performanceBtn");
const restockingBtn = document.getElementById("restockingBtn");
const costBtn = document.getElementById("costBtn");
const plannerBtn = document.getElementById("plannerBtn");

// Sections
const dashboardSummary = document.getElementById("dashboardSummary");
const inventorySection = document.getElementById("inventorySection");
const performanceSection = document.getElementById("performanceSection");
const restockingSection = document.getElementById("restockingSection");
const costSection = document.getElementById("costSection");
const plannerSection = document.getElementById("plannerSection");

// Restocking planner
const restockBudget = document.getElementById("restockBudget");
const cashReserve = document.getElementById("cashReserve");
const availableRestockBudget = document.getElementById(
  "availableRestockBudget"
);

const createPlanBtn = document.getElementById("createPlanBtn");
const plannerError = document.getElementById("plannerError");

const restockPlanTableBody = document.getElementById(
  "restockPlanTableBody"
);

const plannedSpending = document.getElementById("plannedSpending");
const budgetRemaining = document.getElementById("budgetRemaining");

// Welcome name popup
const namePopup = document.getElementById("namePopup");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const userName = document.getElementById("userName");
const nameError = document.getElementById("nameError");


// ==================================================
// 2. GLOBAL VARIABLES
// ==================================================

let currentProducts = [];


// ==================================================
// 3. DISPLAY INVENTORY
// ==================================================

function displayInventory(products) {

  currentProducts = products;

  // Clear tables before rebuilding them
  productTableBody.innerHTML = "";
  performanceTableBody.innerHTML = "";
  restockingTableBody.innerHTML = "";
  costTableBody.innerHTML = "";

  let productCount = 0;
  let lowStockCount = 0;
  let performingWellCount = 0;
  let alertCount = 0;


  // Loop through every product
  for (let i = 0; i < products.length; i++) {

    let product = products[i];

    let productName = product.productName;
    let sku = product.sku;
    let quantity = Number(product.quantity);
    let totalPurchases = Number(product.totalPurchases);
    let quantityRemaining = Number(product.quantityRemaining);
    let price = Number(product.price);

    productCount++;


    // --------------------------------------------------
    // PRICE
    // --------------------------------------------------

    let priceDisplay = "0.00";

    if (!isNaN(price)) {

      priceDisplay = price.toFixed(2);

    }


    // --------------------------------------------------
    // SELL-THROUGH RATE
    // --------------------------------------------------

    let totalAvailable =
      totalPurchases + quantityRemaining;

    let sellThroughRate = 0;

    if (totalAvailable > 0) {

      sellThroughRate =
        totalPurchases / totalAvailable;

    }


    // --------------------------------------------------
    // PERFORMANCE COUNT
    // --------------------------------------------------

    if (sellThroughRate >= 0.70) {

      performingWellCount++;

    }


    // --------------------------------------------------
    // RESTOCKING PRIORITY
    // --------------------------------------------------

    let priority = "";
    let recommendation = "";

    if (
      quantityRemaining < 5 &&
      sellThroughRate >= 0.70
    ) {

      priority = "High";

      recommendation =
        "Restock soon";

    }

    else if (
      quantityRemaining < 10 ||
      sellThroughRate >= 0.50
    ) {

      priority = "Medium";

      recommendation =
        "Monitor and prepare to restock";

    }

    else {

      priority = "Low";

      recommendation =
        "No immediate restock needed";

    }


    // --------------------------------------------------
    // PRODUCT PERFORMANCE
    // --------------------------------------------------

    let performanceStatus = "";
    let feedback = "";

    if (totalAvailable === 0) {

      performanceStatus = "No Data";

      feedback =
        "Not enough information";

    }

    else if (sellThroughRate >= 0.70) {

      performanceStatus =
        "Performing Well";

      feedback =
        "Consider restocking";

    }

    else if (sellThroughRate >= 0.30) {

      performanceStatus =
        "Needs Attention";

      feedback =
        "Continue monitoring";

    }

    else {

      performanceStatus =
        "Poor Performance";

      feedback =
        "Consider pricing or product changes";

    }


    // --------------------------------------------------
    // PRICING FEEDBACK
    // --------------------------------------------------

    let pricingFeedback = "";

    if (totalAvailable === 0) {

      pricingFeedback =
        "Not enough data";

    }

    else if (sellThroughRate >= 0.70) {

      pricingFeedback =
        "Current pricing appears to be working";

    }

    else if (sellThroughRate >= 0.30) {

      pricingFeedback =
        "Monitor sales before changing the price";

    }

    else {

      pricingFeedback =
        "Consider reviewing the price";

    }


    // --------------------------------------------------
    // LOW STOCK COUNT
    // --------------------------------------------------

    if (quantityRemaining < 5) {

      lowStockCount++;

    }


    // --------------------------------------------------
    // ALERT COUNT
    // --------------------------------------------------

    if (quantityRemaining < 5) {

      alertCount++;

    }

    else if (
      totalAvailable > 0 &&
      sellThroughRate < 0.30
    ) {

      alertCount++;

    }


    // ==================================================
    // INVENTORY TABLE
    // ==================================================

    let inventoryRow =
      document.createElement("tr");

    inventoryRow.innerHTML =

      "<td>" +
      productName +
      "</td>" +

      "<td>" +
      sku +
      "</td>" +

      "<td>" +
      quantity +
      "</td>" +

      "<td>" +
      totalPurchases +
      "</td>" +

      "<td>" +
      quantityRemaining +
      "</td>" +

      "<td>" +

      "<input " +
      "type='number' " +
      "class='price-input' " +
      "min='0' " +
      "step='0.01' " +
      "value='" +
      priceDisplay +
      "'>" +

      "</td>";


    productTableBody.appendChild(
      inventoryRow
    );


    // ==================================================
    // COST PER UNIT TABLE
    // ==================================================

    let costPerUnit = "";

    if (
      product.costPerUnit !== undefined
    ) {

      costPerUnit =
        product.costPerUnit;

    }

    else if (
      product.supplierCost !== undefined
    ) {

      costPerUnit =
        product.supplierCost;

      product.costPerUnit =
        product.supplierCost;

    }


    let costRow =
      document.createElement("tr");


    costRow.innerHTML =

      "<td>" +
      productName +
      "</td>" +

      "<td>" +
      sku +
      "</td>" +

      "<td class='selling-price'>$" +
      priceDisplay +
      "</td>" +

      "<td>" +

      "<input " +
      "type='number' " +
      "class='cost-input' " +
      "min='0' " +
      "step='0.01' " +
      "value='" +
      costPerUnit +
      "' " +
      "placeholder='0.00'>" +

      "</td>";


    costTableBody.appendChild(
      costRow
    );


    // --------------------------------------------------
    // EDIT COST PER UNIT
    // --------------------------------------------------

    let costInput =
      costRow.querySelector(
        ".cost-input"
      );


    costInput.addEventListener(
      "change",
      function() {

        // Allow the field to remain blank
        if (costInput.value === "") {

          product.costPerUnit = "";

          saveProducts(products);

          return;

        }


        let newCost =
          Number(costInput.value);


        if (
          isNaN(newCost) ||
          newCost < 0
        ) {

          costInput.value =
            product.costPerUnit || "";

          return;

        }


        product.costPerUnit =
          newCost;


        saveProducts(products);

      }
    );


    // --------------------------------------------------
    // EDIT PRODUCT PRICE
    // --------------------------------------------------

    let priceInput =
      inventoryRow.querySelector(
        ".price-input"
      );


    priceInput.addEventListener(
      "change",
      function() {

        let newPrice =
          Number(priceInput.value);


        if (
          priceInput.value === "" ||
          isNaN(newPrice) ||
          newPrice < 0
        ) {

          priceInput.value =
            Number(product.price).toFixed(2);

          return;

        }


        product.price =
          newPrice;


        priceInput.value =
          newPrice.toFixed(2);


        // Update the price in Cost Per Unit table
        let sellingPriceCell =
          costRow.querySelector(
            ".selling-price"
          );


        sellingPriceCell.textContent =
          "$" +
          newPrice.toFixed(2);


        saveProducts(products);

      }
    );


    // ==================================================
    // PERFORMANCE TABLE
    // ==================================================

    let performanceRow =
      document.createElement("tr");


    performanceRow.innerHTML =

      "<td>" +
      productName +
      "</td>" +

      "<td>" +
      totalPurchases +
      "</td>" +

      "<td>" +
      Math.round(
        sellThroughRate * 100
      ) +
      "%</td>" +

      "<td>" +
      performanceStatus +
      "</td>" +

      "<td>" +
      feedback +
      "</td>" +

      "<td>" +
      pricingFeedback +
      "</td>";


    performanceTableBody.appendChild(
      performanceRow
    );


    // ==================================================
    // RESTOCKING TABLE
    // ==================================================

    let priorityClass = "";

    if (priority === "High") {

      priorityClass =
        "priority-high";

    }

    else if (
      priority === "Medium"
    ) {

      priorityClass =
        "priority-medium";

    }

    else {

      priorityClass =
        "priority-low";

    }


    let restockingRow =
      document.createElement("tr");


    restockingRow.innerHTML =

      "<td>" +
      productName +
      "</td>" +

      "<td>" +
      quantityRemaining +
      "</td>" +

      "<td>" +
      Math.round(
        sellThroughRate * 100
      ) +
      "%</td>" +

      "<td class='" +
      priorityClass +
      "'>" +
      priority +
      "</td>" +

      "<td>" +
      recommendation +
      "</td>";


    restockingTableBody.appendChild(
      restockingRow
    );

  }


  // ==================================================
  // DASHBOARD NUMBERS
  // ==================================================

  totalProducts.textContent =
    productCount;

  lowStockItems.textContent =
    lowStockCount;

  productPerformance.textContent =
    performingWellCount;

  alerts.textContent =
    alertCount;


  // ==================================================
  // SORT RESTOCKING PRIORITIES
  // High -> Medium -> Low
  // ==================================================

  let restockingRows =
    Array.from(
      restockingTableBody.rows
    );


  restockingRows.sort(
    function(a, b) {

      let firstPriority =
        a.cells[3].textContent;

      let secondPriority =
        b.cells[3].textContent;


      let firstNumber = 0;
      let secondNumber = 0;


      if (
        firstPriority === "High"
      ) {

        firstNumber = 1;

      }

      else if (
        firstPriority === "Medium"
      ) {

        firstNumber = 2;

      }

      else {

        firstNumber = 3;

      }


      if (
        secondPriority === "High"
      ) {

        secondNumber = 1;

      }

      else if (
        secondPriority === "Medium"
      ) {

        secondNumber = 2;

      }

      else {

        secondNumber = 3;

      }


      return (
        firstNumber -
        secondNumber
      );

    }
  );


  for (
    let i = 0;
    i < restockingRows.length;
    i++
  ) {

    restockingTableBody.appendChild(
      restockingRows[i]
    );

  }

}


// ==================================================
// 4. SAVE PRODUCTS
// ==================================================

function saveProducts(products) {

  localStorage.setItem(
    "stockFixtureInventory",
    JSON.stringify(products)
  );

}


// ==================================================
// 5. CSV UPLOAD
// ==================================================

csvFile.addEventListener(
  "change",
  function() {

    let file =
      csvFile.files[0];


    csvError.textContent = "";

    csvError.style.display =
      "none";


    if (!file) {

      return;

    }


    // --------------------------------------------------
    // CHECK FILE TYPE
    // --------------------------------------------------

    if (
      !file.name
        .toLowerCase()
        .endsWith(".csv")
    ) {

      csvError.textContent =
        "Please upload a CSV file.";

      csvError.style.display =
        "block";

      csvFile.value = "";

      return;

    }


    let reader =
      new FileReader();


    reader.onload =
      function(event) {

        let csvText =
          event.target.result.trim();


        // --------------------------------------------------
        // CHECK EMPTY FILE
        // --------------------------------------------------

        if (csvText === "") {

          csvError.textContent =
            "The CSV file is empty.";

          csvError.style.display =
            "block";

          csvFile.value = "";

          return;

        }


        let rows =
          csvText.split(/\r?\n/);


        let headers =
          rows[0].split(",");


        // Remove spaces from headers

        for (
          let i = 0;
          i < headers.length;
          i++
        ) {

          headers[i] =
            headers[i].trim();

        }


        // --------------------------------------------------
        // REQUIRED COLUMNS
        // --------------------------------------------------

        let requiredHeaders = [

          "Product Name",
          "SKU",
          "Quantity",
          "Total Purchases",
          "Quantity Remaining",
          "Price"

        ];


        // --------------------------------------------------
        // CHECK MISSING COLUMNS
        // --------------------------------------------------

        let missingHeaders = [];


        for (
          let i = 0;
          i < requiredHeaders.length;
          i++
        ) {

          if (
            !headers.includes(
              requiredHeaders[i]
            )
          ) {

            missingHeaders.push(
              requiredHeaders[i]
            );

          }

        }


        if (
          missingHeaders.length > 0
        ) {

          csvError.textContent =
            "Missing required column(s): " +
            missingHeaders.join(", ");

          csvError.style.display =
            "block";

          csvFile.value = "";

          return;

        }


        // --------------------------------------------------
        // FIND COLUMN POSITIONS
        // --------------------------------------------------

        let productNameIndex =
          headers.indexOf(
            "Product Name"
          );

        let skuIndex =
          headers.indexOf(
            "SKU"
          );

        let quantityIndex =
          headers.indexOf(
            "Quantity"
          );

        let totalPurchasesIndex =
          headers.indexOf(
            "Total Purchases"
          );

        let quantityRemainingIndex =
          headers.indexOf(
            "Quantity Remaining"
          );

        let priceIndex =
          headers.indexOf(
            "Price"
          );


        let products = [];

        let negativeRows = [];


        // --------------------------------------------------
        // READ CSV ROWS
        // --------------------------------------------------

        for (
          let i = 1;
          i < rows.length;
          i++
        ) {

          if (
            rows[i].trim() === ""
          ) {

            continue;

          }


          let columns =
            rows[i].split(",");


          let productName = "";

          if (
            columns[productNameIndex] !==
            undefined
          ) {

            productName =
              columns[
                productNameIndex
              ].trim();

          }


          let sku = "";

          if (
            columns[skuIndex] !==
            undefined
          ) {

            sku =
              columns[
                skuIndex
              ].trim();

          }


          let quantity = "";

          if (
            columns[quantityIndex] !==
            undefined
          ) {

            quantity =
              columns[
                quantityIndex
              ].trim();

          }


          let totalPurchasesValue = "";

          if (
            columns[
              totalPurchasesIndex
            ] !== undefined
          ) {

            totalPurchasesValue =
              columns[
                totalPurchasesIndex
              ].trim();

          }


          let quantityRemainingValue = "";

          if (
            columns[
              quantityRemainingIndex
            ] !== undefined
          ) {

            quantityRemainingValue =
              columns[
                quantityRemainingIndex
              ].trim();

          }


          let priceValue = "";

          if (
            columns[priceIndex] !==
            undefined
          ) {

            priceValue =
              columns[
                priceIndex
              ].trim();

          }


          // --------------------------------------------------
          // CHECK MISSING INFORMATION
          // --------------------------------------------------

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

            csvFile.value = "";

            return;

          }


          // --------------------------------------------------
          // CHECK NUMBERS
          // --------------------------------------------------

          if (
            isNaN(
              Number(quantity)
            ) ||

            isNaN(
              Number(
                totalPurchasesValue
              )
            ) ||

            isNaN(
              Number(
                quantityRemainingValue
              )
            ) ||

            isNaN(
              Number(priceValue)
            )
          ) {

            csvError.textContent =
              "Row " +
              (i + 1) +
              " contains an invalid number. " +
              "Check Quantity, Total Purchases, " +
              "Quantity Remaining, and Price.";

            csvError.style.display =
              "block";

            csvFile.value = "";

            return;

          }


          // --------------------------------------------------
          // CHECK NEGATIVE NUMBERS
          // --------------------------------------------------

          if (
            Number(quantity) < 0 ||

            Number(
              totalPurchasesValue
            ) < 0 ||

            Number(
              quantityRemainingValue
            ) < 0 ||

            Number(priceValue) < 0
          ) {

            negativeRows.push(
              i + 1
            );

          }


          // --------------------------------------------------
          // SAVE PRODUCT
          // --------------------------------------------------

          let product = {

            productName:
              productName,

            sku:
              sku,

            quantity:
              Number(quantity),

            totalPurchases:
              Number(
                totalPurchasesValue
              ),

            quantityRemaining:
              Number(
                quantityRemainingValue
              ),

            price:
              Number(priceValue),

            costPerUnit:
              ""

          };


          products.push(
            product
          );

        }


        // --------------------------------------------------
        // CHECK FOR PRODUCT VALUES
        // --------------------------------------------------

        if (
          products.length === 0
        ) {

          csvError.textContent =
            "The CSV file does not contain any product values. " +
            "Please add product data and reupload the file.";

          csvError.style.display =
            "block";

          csvFile.value = "";

          return;

        }


        // --------------------------------------------------
        // CHECK NEGATIVE VALUES
        // --------------------------------------------------

        if (
          negativeRows.length > 0
        ) {

          csvError.textContent =
            "Negative values were found in row(s): " +
            negativeRows.join(", ") +
            ". Please fix these values and reupload the file.";

          csvError.style.display =
            "block";

          csvFile.value = "";

          return;

        }


        // --------------------------------------------------
        // CHECK DUPLICATE SKUS
        // --------------------------------------------------

        let skuList = [];
        let duplicateSku = "";
        let duplicateRow = 0;


        for (
          let i = 0;
          i < products.length;
          i++
        ) {

          let currentSku =
            products[i].sku;


          if (
            skuList.includes(
              currentSku
            )
          ) {

            duplicateSku =
              currentSku;

            duplicateRow =
              i + 2;

            break;

          }


          skuList.push(
            currentSku
          );

        }


        if (
          duplicateSku !== ""
        ) {

          csvError.textContent =
            "Row " +
            duplicateRow +
            " contains a duplicate SKU: " +
            duplicateSku +
            ". Please fix the duplicate SKU and reupload the file.";

          csvError.style.display =
            "block";

          csvFile.value = "";

          return;

        }


        // --------------------------------------------------
        // SAVE INVENTORY
        // --------------------------------------------------

        saveProducts(
          products
        );


        // --------------------------------------------------
        // DISPLAY INVENTORY
        // --------------------------------------------------

        displayInventory(
          products
        );

      };


    reader.readAsText(
      file
    );

  }
);


// ==================================================
// 6. LOAD SAVED INVENTORY AFTER REFRESH
// ==================================================

let savedInventory =
  localStorage.getItem(
    "stockFixtureInventory"
  );


if (savedInventory) {

  try {

    let savedProducts =
      JSON.parse(
        savedInventory
      );


    if (
      Array.isArray(
        savedProducts
      )
    ) {

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


// ==================================================
// 7. PRODUCT SEARCH
// ==================================================

productSearch.addEventListener(
  "input",
  function() {

    let searchText =
      productSearch.value
        .toLowerCase();


    let productRows =
      productTableBody
        .getElementsByTagName(
          "tr"
        );


    for (
      let i = 0;
      i < productRows.length;
      i++
    ) {

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
        productName.includes(
          searchText
        ) ||

        sku.includes(
          searchText
        )
      ) {

        productRows[i]
          .style.display = "";

      }

      else {

        productRows[i]
          .style.display =
          "none";

      }

    }

  }
);


// ==================================================
// 8. NAVIGATION
// ==================================================


// --------------------------------------------------
// DASHBOARD
// --------------------------------------------------

dashboardBtn.addEventListener(
  "click",
  function() {

    dashboardSummary
      .classList
      .remove("hidden");

    inventorySection
      .classList
      .remove("hidden");

    performanceSection
      .classList
      .add("hidden");

    restockingSection
      .classList
      .add("hidden");

    costSection
      .classList
      .add("hidden");

    plannerSection
      .classList
      .add("hidden");

  }
);


// --------------------------------------------------
// INVENTORY
// --------------------------------------------------

inventoryBtn.addEventListener(
  "click",
  function() {

    dashboardSummary
      .classList
      .add("hidden");

    inventorySection
      .classList
      .remove("hidden");

    performanceSection
      .classList
      .add("hidden");

    restockingSection
      .classList
      .add("hidden");

    costSection
      .classList
      .add("hidden");

    plannerSection
      .classList
      .add("hidden");

  }
);


// --------------------------------------------------
// PRODUCT PERFORMANCE
// --------------------------------------------------

performanceBtn.addEventListener(
  "click",
  function() {

    dashboardSummary
      .classList
      .add("hidden");

    inventorySection
      .classList
      .add("hidden");

    performanceSection
      .classList
      .remove("hidden");

    restockingSection
      .classList
      .add("hidden");

    costSection
      .classList
      .add("hidden");

    plannerSection
      .classList
      .add("hidden");

  }
);


// --------------------------------------------------
// RESTOCKING PRIORITIES
// --------------------------------------------------

restockingBtn.addEventListener(
  "click",
  function() {

    dashboardSummary
      .classList
      .add("hidden");

    inventorySection
      .classList
      .add("hidden");

    performanceSection
      .classList
      .add("hidden");

    restockingSection
      .classList
      .remove("hidden");

    costSection
      .classList
      .add("hidden");

    plannerSection
      .classList
      .add("hidden");

  }
);


// --------------------------------------------------
// COST PER UNIT
// --------------------------------------------------

costBtn.addEventListener(
  "click",
  function() {

    dashboardSummary
      .classList
      .add("hidden");

    inventorySection
      .classList
      .add("hidden");

    performanceSection
      .classList
      .add("hidden");

    restockingSection
      .classList
      .add("hidden");

    costSection
      .classList
      .remove("hidden");

    plannerSection
      .classList
      .add("hidden");

  }
);


// --------------------------------------------------
// RESTOCKING PLANNER
// --------------------------------------------------

plannerBtn.addEventListener(
  "click",
  function() {

    dashboardSummary
      .classList
      .add("hidden");

    inventorySection
      .classList
      .add("hidden");

    performanceSection
      .classList
      .add("hidden");

    restockingSection
      .classList
      .add("hidden");

    costSection
      .classList
      .add("hidden");

    plannerSection
      .classList
      .remove("hidden");

  }
);


// ==================================================
// 9. RESTOCKING PLANNER
// ==================================================


// --------------------------------------------------
// UPDATE AVAILABLE BUDGET WHILE USER TYPES
// --------------------------------------------------

function updateAvailableBudget() {

  let budget =
    Number(restockBudget.value);

  let reserve =
    Number(cashReserve.value);


  if (
    restockBudget.value === "" ||
    isNaN(budget) ||
    budget < 0
  ) {

    budget = 0;

  }


  if (
    cashReserve.value === "" ||
    isNaN(reserve) ||
    reserve < 0
  ) {

    reserve = 0;

  }


  let available =
    budget - reserve;


  if (available < 0) {

    available = 0;

  }


  availableRestockBudget.textContent =
    available.toFixed(2);

}


restockBudget.addEventListener(
  "input",
  updateAvailableBudget
);


cashReserve.addEventListener(
  "input",
  updateAvailableBudget
);


// --------------------------------------------------
// CREATE RESTOCKING PLAN
// --------------------------------------------------

createPlanBtn.addEventListener(
  "click",
  function() {

    // Reset planner
    plannerError.textContent = "";

    restockPlanTableBody.innerHTML = "";

    plannedSpending.textContent =
      "0.00";

    budgetRemaining.textContent =
      "0.00";


    // --------------------------------------------------
    // CHECK INVENTORY
    // --------------------------------------------------

    if (
      currentProducts.length === 0
    ) {

      plannerError.textContent =
        "Please upload inventory before creating a restocking plan.";

      return;

    }


    let budget =
      Number(restockBudget.value);

    let reserve =
      Number(cashReserve.value);


    // --------------------------------------------------
    // CHECK BUDGET
    // --------------------------------------------------

    if (
      restockBudget.value === "" ||
      isNaN(budget) ||
      budget <= 0
    ) {

      plannerError.textContent =
        "Please enter a restocking budget greater than $0.";

      return;

    }


    // Allow reserve to stay blank
    if (
      cashReserve.value === ""
    ) {

      reserve = 0;

    }


    // --------------------------------------------------
    // CHECK CASH RESERVE
    // --------------------------------------------------

    if (
      isNaN(reserve) ||
      reserve < 0
    ) {

      plannerError.textContent =
        "Please enter a valid cash reserve.";

      return;

    }


    if (
      reserve > budget
    ) {

      plannerError.textContent =
        "Cash reserve cannot be greater than the restocking budget.";

      return;

    }


    let availableBudget =
      budget - reserve;


    availableRestockBudget.textContent =
      availableBudget.toFixed(2);


    // ==================================================
    // CREATE PRODUCT LIST FOR PLANNER
    // ==================================================

    let plannerProducts = [];


    for (
      let i = 0;
      i < currentProducts.length;
      i++
    ) {

      let product =
        currentProducts[i];


      let totalPurchases =
        Number(
          product.totalPurchases
        );


      let quantityRemaining =
        Number(
          product.quantityRemaining
        );


      let totalAvailable =
        totalPurchases +
        quantityRemaining;


      let sellThroughRate = 0;


      if (
        totalAvailable > 0
      ) {

        sellThroughRate =
          totalPurchases /
          totalAvailable;

      }


      let priority = "";
      let priorityNumber = 0;


      if (
        quantityRemaining < 5 &&
        sellThroughRate >= 0.70
      ) {

        priority = "High";
        priorityNumber = 1;

      }

      else if (
        quantityRemaining < 10 ||
        sellThroughRate >= 0.50
      ) {

        priority = "Medium";
        priorityNumber = 2;

      }

      else {

        priority = "Low";
        priorityNumber = 3;

      }


      plannerProducts.push({

        product:
          product,

        sellThroughRate:
          sellThroughRate,

        quantityRemaining:
          quantityRemaining,

        priority:
          priority,

        priorityNumber:
          priorityNumber

      });

    }


    // ==================================================
    // SORT PLANNER PRODUCTS
    // High priority first
    // Then highest sell-through rate
    // Then lowest stock
    // ==================================================

    plannerProducts.sort(
      function(a, b) {

        if (
          a.priorityNumber !==
          b.priorityNumber
        ) {

          return (
            a.priorityNumber -
            b.priorityNumber
          );

        }


        if (
          a.sellThroughRate !==
          b.sellThroughRate
        ) {

          return (
            b.sellThroughRate -
            a.sellThroughRate
          );

        }


        return (
          a.quantityRemaining -
          b.quantityRemaining
        );

      }
    );


    let remainingBudget =
      availableBudget;

    let totalPlannedSpending = 0;


    // ==================================================
    // CREATE RESTOCKING RECOMMENDATIONS
    // ==================================================

    for (
      let i = 0;
      i < plannerProducts.length;
      i++
    ) {

      let item =
        plannerProducts[i];

      let product =
        item.product;


      let costPerUnit =
        Number(
          product.costPerUnit
        );


      let suggestedQuantity = 0;
      let estimatedCost = 0;
      let reason = "";


      // --------------------------------------------------
      // MISSING COST INFORMATION
      // --------------------------------------------------

      if (
        product.costPerUnit === "" ||
        product.costPerUnit === undefined ||
        isNaN(costPerUnit) ||
        costPerUnit <= 0
      ) {

        reason =
          "Add Cost Per Unit before creating a purchase recommendation.";

      }

      else {

        let targetStock = 0;


        // --------------------------------------------------
        // HIGH PRIORITY
        // --------------------------------------------------

        if (
          item.priority === "High"
        ) {

          targetStock = 12;

          reason =
            "Low stock and strong sales performance make this product a higher restocking priority.";

        }


        // --------------------------------------------------
        // MEDIUM PRIORITY
        // --------------------------------------------------

        else if (
          item.priority === "Medium"
        ) {

          targetStock = 10;

          reason =
            "This product should be monitored and may benefit from a smaller restock.";

        }


        // --------------------------------------------------
        // LOW PRIORITY
        // --------------------------------------------------

        else {

          targetStock =
            item.quantityRemaining;

          reason =
            "No immediate restock is recommended for this product.";

        }


        let quantityNeeded =
          targetStock -
          item.quantityRemaining;


        if (
          quantityNeeded < 0
        ) {

          quantityNeeded = 0;

        }


        let affordableQuantity =
          Math.floor(
            remainingBudget /
            costPerUnit
          );


        suggestedQuantity =
          Math.min(
            quantityNeeded,
            affordableQuantity
          );


        // Budget cannot afford one unit
        if (
          quantityNeeded > 0 &&
          affordableQuantity === 0
        ) {

          reason =
            "This product may need restocking, but the available budget is not enough to purchase one unit.";

        }


        // Budget only covers part of needed amount
        else if (
          suggestedQuantity <
          quantityNeeded &&
          suggestedQuantity > 0
        ) {

          reason +=
            " The available budget limited the suggested quantity.";

        }


        estimatedCost =
          suggestedQuantity *
          costPerUnit;


        remainingBudget -=
          estimatedCost;


        totalPlannedSpending +=
          estimatedCost;

      }


      // --------------------------------------------------
      // PRIORITY COLOR CLASS
      // --------------------------------------------------

      let priorityClass = "";


      if (
        item.priority === "High"
      ) {

        priorityClass =
          "priority-high";

      }

      else if (
        item.priority === "Medium"
      ) {

        priorityClass =
          "priority-medium";

      }

      else {

        priorityClass =
          "priority-low";

      }


      // --------------------------------------------------
      // COST DISPLAY
      // --------------------------------------------------

      let costDisplay =
        "Not Added";


      if (
        product.costPerUnit !== "" &&
        product.costPerUnit !== undefined &&
        !isNaN(costPerUnit)
      ) {

        costDisplay =
          "$" +
          costPerUnit.toFixed(2);

      }


      // ==================================================
      // CREATE PLANNER TABLE ROW
      // ==================================================

      let plannerRow =
        document.createElement(
          "tr"
        );


      plannerRow.innerHTML =

        "<td>" +
        product.productName +
        "</td>" +

        "<td class='" +
        priorityClass +
        "'>" +
        item.priority +
        "</td>" +

        "<td>" +
        item.quantityRemaining +
        "</td>" +

        "<td>" +
        Math.round(
          item.sellThroughRate * 100 
        ) +
        "%</td>" +

        "<td>" +
        costDisplay +
        "</td>" +

        "<td>" +
        suggestedQuantity +
        "</td>" +

        "<td>" +

        "<input " +
        "type='number' " +
        "class='planner-quantity-input' " +
        "min='0' " +
        "step='1' " +
        "value='" +
        suggestedQuantity +
        "'>" +

        "</td>" +

        "<td class='planner-item-cost'>$" +
        estimatedCost.toFixed(2) +
        "</td>" +

        "<td class='planner-reason'>" +
        reason +
        "</td>";


      restockPlanTableBody.appendChild(
        plannerRow
      );


      // ==================================================
      // ALLOW USER TO CHANGE PLANNER QUANTITY
      // ==================================================

      let quantityInput =
        plannerRow.querySelector(
          ".planner-quantity-input"
        );


      let itemCostCell =
        plannerRow.querySelector(
          ".planner-item-cost"
        );


      quantityInput.addEventListener(
        "change",
        function() {

          // Cost must exist
          if (
            product.costPerUnit === "" ||
            product.costPerUnit === undefined ||
            isNaN(costPerUnit) ||
            costPerUnit <= 0
          ) {

            quantityInput.value = 0;

            itemCostCell.textContent =
              "$0.00";

            recalculatePlannerTotals();

            return;

          }


          let newQuantity =
            Number(
              quantityInput.value
            );


          // Prevent invalid values
          if (
            isNaN(newQuantity) ||
            newQuantity < 0
          ) {

            newQuantity = 0;

          }


          // Whole units only
          newQuantity =
            Math.floor(
              newQuantity
            );


          quantityInput.value =
            newQuantity;


          let newItemCost =
            newQuantity *
            costPerUnit;


          itemCostCell.textContent =
            "$" +
            newItemCost.toFixed(2);


          recalculatePlannerTotals();

        }
      );

    }


    // ==================================================
    // DISPLAY PLANNER TOTALS
    // ==================================================

    plannedSpending.textContent =
      totalPlannedSpending.toFixed(2);


    budgetRemaining.textContent =
      remainingBudget.toFixed(2);

  }
);


// ==================================================
// 10. RECALCULATE PLANNER TOTALS
// ==================================================

function recalculatePlannerTotals() {

  let budget =
    Number(
      restockBudget.value
    );

  let reserve =
    Number(
      cashReserve.value
    );


  if (
    isNaN(budget)
  ) {

    budget = 0;

  }


  if (
    isNaN(reserve)
  ) {

    reserve = 0;

  }


  let availableBudget =
    budget - reserve;


  if (
    availableBudget < 0
  ) {

    availableBudget = 0;

  }


  let plannerRows =
    restockPlanTableBody
      .querySelectorAll("tr");


  let newTotalSpending = 0;


  for (
    let i = 0;
    i < plannerRows.length;
    i++
  ) {

    let costCell =
      plannerRows[i]
        .querySelector(
          ".planner-item-cost"
        );


    if (!costCell) {

      continue;

    }


    let costText =
      costCell.textContent
        .replace("$", "")
        .trim();


    let itemCost =
      Number(costText);


    if (
      !isNaN(itemCost)
    ) {

      newTotalSpending +=
        itemCost;

    }

  }


  let newRemaining =
    availableBudget -
    newTotalSpending;


  plannedSpending.textContent =
    newTotalSpending.toFixed(2);


  budgetRemaining.textContent =
    newRemaining.toFixed(2);


  // Show warning if user manually goes over budget
  if (
    newRemaining < 0
  ) {

    plannerError.textContent =
      "Your selected quantities exceed the available restocking budget.";

  }

  else {

    plannerError.textContent = "";

  }

}

// ==================================================
// 11. WELCOME NAME POPUP
// ==================================================

let savedName =
  localStorage.getItem(
    "stockFixtureUserName"
  );


if (savedName) {

  userName.textContent =
    savedName;

  namePopup.style.display =
    "none";

}

// --------------------------------------------------
// SAVE NAME
// --------------------------------------------------

saveNameBtn.addEventListener(
  "click",
  function() {

    let newName =
      nameInput.value.trim();


    if (
      newName === ""
    ) {

      nameError.textContent =
        "Please enter your name.";

      return;

    }

    if (
      newName.length > 50
    ) {

      nameError.textContent =
        "Please enter a name that is 50 characters or less.";

      return;

    }

    localStorage.setItem(
      "stockFixtureUserName",
      newName
    );


    userName.textContent =
      newName;


    nameError.textContent =
      "";


    namePopup.style.display =
      "none";

  }
);
