const restockingBtn = document.getElementById("restockingBtn");
const restockingSection = document.getElementById("restockingSection");
const restockingTableBody = document.getElementById("restockingTableBody");
const performanceTableBody = document.getElementById("performanceTableBody");
const performanceBtn = document.getElementById("performanceBtn");
const performanceSection = document.getElementById("performanceSection");
const dashboardBtn = document.getElementById("dashboardBtn");
const inventoryBtn = document.getElementById("inventoryBtn");

const dashboardSummary = document.getElementById("dashboardSummary");
const inventorySection = document.getElementById("inventorySection");
const productSearch = document.getElementById("productSearch");
const alerts = document.getElementById("alerts");
const productPerformance = document.getElementById("productPerformance");
const lowStockItems = document.getElementById("lowStockItems");
const totalProducts = document.getElementById("totalProducts");
const csvFile = document.getElementById("csvFile");
const productTableBody = document.getElementById("productTableBody");

csvFile.addEventListener("change", function () {
  const file = csvFile.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const csvText = event.target.result;
    const rows = csvText.split("\n");
    let productCount = 0;
    let lowStockCount = 0;
    let performingWellCount = 0;
    let alertCount = 0;
    productTableBody.innerHTML = "";
    performanceTableBody.innerHTML = "";
    restockingTableBody.innerHTML = "";

    for (let i = 1; i < rows.length; i++) {
  if (rows[i].trim() === "") {
    continue;
  }

  productCount++;

  const columns = rows[i].split(",");

  const totalPurchases = Number(columns[3]);
  const quantityRemaining = Number(columns[4]);

  const totalAvailable = totalPurchases + quantityRemaining;

  let sellThroughRate = 0;

  if (totalAvailable > 0) {
    sellThroughRate = totalPurchases / totalAvailable;

    if (sellThroughRate >= 0.70) {
      performingWellCount++;
    }
  }
      let priority = "";
let recommendation = "";

if (quantityRemaining < 5 && sellThroughRate >= 0.70) {
  priority = "High";
  recommendation = "Restock soon";
} else if (quantityRemaining < 10 || sellThroughRate >= 0.50) {
  priority = "Medium";
  recommendation = "Monitor and prepare to restock";
} else {
  priority = "Low";
  recommendation = "No immediate restock needed";
}
      let performanceStatus = "";
let feedback = "";

if (totalAvailable === 0) {
  performanceStatus = "No Data";
  feedback = "Not enough information";
} else if (sellThroughRate >= 0.70) {
  performanceStatus = "Performing Well";
  feedback = "Consider restocking";
} else if (sellThroughRate >= 0.30) {
  performanceStatus = "Needs Attention";
  feedback = "Continue monitoring";
} else {
  performanceStatus = "Poor Performance";
  feedback = "Consider pricing or product changes";
}
let pricingFeedback = "";

if (totalAvailable === 0) {
  pricingFeedback = "Not enough data";
} else if (sellThroughRate >= 0.70) {
  pricingFeedback = "Current pricing appears to be working";
} else if (sellThroughRate >= 0.30) {
  pricingFeedback = "Monitor sales before changing the price";
} else {
  pricingFeedback = "Consider reviewing the price";
}
  if (quantityRemaining < 5) {
    lowStockCount++;
  }

  const isLowStock = quantityRemaining < 5;
  const isPoorPerformance =
    totalAvailable > 0 && sellThroughRate < 0.30;

  if (isLowStock || isPoorPerformance) {
    alertCount++;
  }

  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${columns[0]}</td>
    <td>${columns[1]}</td>
    <td>${columns[2]}</td>
    <td>${columns[3]}</td>
    <td>${columns[4]}</td>
  `;

  productTableBody.appendChild(newRow);
      const performanceRow = document.createElement("tr");

performanceRow.innerHTML = `
  <td>${columns[0]}</td>
  <td>${totalPurchases}</td>
  <td>${Math.round(sellThroughRate * 100)}%</td>
  <td>${performanceStatus}</td>
  <td>${feedback}</td>
  <td>${pricingFeedback}</td>
`;

performanceTableBody.appendChild(performanceRow);
      const restockingRow = document.createElement("tr");

let priorityClass = "";

if (priority === "High") {
  priorityClass = "priority-high";
} else if (priority === "Medium") {
  priorityClass = "priority-medium";
} else {
  priorityClass = "priority-low";
}

restockingRow.innerHTML = `
  <td>${columns[0]}</td>
  <td>${quantityRemaining}</td>
  <td>${Math.round(sellThroughRate * 100)}%</td>
  <td class="${priorityClass}">${priority}</td>
  <td>${recommendation}</td>
`;
      
restockingTableBody.appendChild(restockingRow);

      
}
totalProducts.textContent = productCount;
lowStockItems.textContent = lowStockCount;
productPerformance.textContent = performingWellCount;
alerts.textContent = alertCount;
    const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3
};

const restockingRows = Array.from(restockingTableBody.rows);

restockingRows.sort(function (a, b) {
  const priorityA = a.cells[3].textContent;
  const priorityB = b.cells[3].textContent;

  return priorityOrder[priorityA] - priorityOrder[priorityB];
});

restockingRows.forEach(function (row) {
  restockingTableBody.appendChild(row);
});
    
  };

  reader.readAsText(file);
});

 productSearch.addEventListener("input", function () {
  const searchText = productSearch.value.toLowerCase();
  const productRows = productTableBody.getElementsByTagName("tr");

  for (let i = 0; i < productRows.length; i++) {
    const productName = productRows[i].cells[0].textContent.toLowerCase();
    const sku = productRows[i].cells[1].textContent.toLowerCase();

    if (
      productName.includes(searchText) ||
      sku.includes(searchText)
    ) {
      productRows[i].style.display = "";
    } else {
      productRows[i].style.display = "none";
    }
  }
});

dashboardBtn.addEventListener("click", function () {
  dashboardSummary.classList.remove("hidden");
  inventorySection.classList.remove("hidden");
  performanceSection.classList.add("hidden");
  restockingSection.classList.add("hidden");
});

inventoryBtn.addEventListener("click", function () {
  dashboardSummary.classList.add("hidden");
  inventorySection.classList.remove("hidden");
  performanceSection.classList.add("hidden");
  restockingSection.classList.add("hidden");
});

performanceBtn.addEventListener("click", function () {
  dashboardSummary.classList.add("hidden");
  inventorySection.classList.add("hidden");
  performanceSection.classList.remove("hidden");
  restockingSection.classList.add("hidden");
});

restockingBtn.addEventListener("click", function () {
  dashboardSummary.classList.add("hidden");
  inventorySection.classList.add("hidden");
  performanceSection.classList.add("hidden");
  restockingSection.classList.remove("hidden");
});
