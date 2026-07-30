// Form & Inputs
const form = document.querySelector('#transaction-form');
const titleInput = document.querySelector('#title');
const amountInput = document.querySelector('#amount');
const categoryInput = document.querySelector("#category");
const typeInput = document.querySelector("#type");
const dateInput = document.querySelector('#date');

// Error messages
const titleError = document.querySelector('#title-error');
const amountError = document.querySelector('#amount-error');
const categoryError = document.querySelector('#category-error');
const dateError = document.querySelector('#date-error');
const typeError = document.querySelector('#type-error');

// Summary elements
const balanceElement = document.querySelector('#balance');
const incomeElement = document.querySelector('#income');
const expenseElement = document.querySelector("#expense");

// Update summary card totals on load
updateSummary();

// Form Submit Event
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const transaction = {
        id: Date.now(), // Unique ID for each transaction
        title: titleInput.value.trim(),
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value,
        type: typeInput.value
    };

    // Save transaction to Local Storage
    const saved = localStorage.getItem("transactions");
    const transactions = saved ? JSON.parse(saved) : [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Redirect to the history table page
    window.location.href = "add-transaction.html";
});

function updateSummary() {
    const saved = localStorage.getItem("transactions");
    const transactions = saved ? JSON.parse(saved) : [];

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (transaction) {
        if (transaction.type === "Income") {
            totalIncome += transaction.amount;
        }
        if (transaction.type === "Expense") {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    if (incomeElement) incomeElement.textContent = `₹${totalIncome}`;
    if (expenseElement) expenseElement.textContent = `₹${totalExpense}`;
    if (balanceElement) balanceElement.textContent = `₹${balance}`;
}

function validateForm() {
    let isValid = true;

    // Clear previous error messages
    titleError.textContent = "";
    amountError.textContent = "";
    categoryError.textContent = "";
    dateError.textContent = "";
    typeError.textContent = "";

    // Clear previous red borders
    titleInput.classList.remove("invalid");
    amountInput.classList.remove("invalid");
    categoryInput.classList.remove("invalid");
    dateInput.classList.remove("invalid");
    typeInput.classList.remove("invalid");

    if (titleInput.value.trim() === "") {
        titleError.textContent = "Title is required";
        titleInput.classList.add("invalid");
        isValid = false;
    }

    if (amountInput.value === "" || Number(amountInput.value) <= 0) {
        amountError.textContent = "Enter a valid amount";
        amountInput.classList.add("invalid");
        isValid = false;
    }

    if (categoryInput.value === "") {
        categoryError.textContent = "Select a category";
        categoryInput.classList.add("invalid");
        isValid = false;
    }

    if (dateInput.value === "") {
        dateError.textContent = "Select a date";
        dateInput.classList.add("invalid");
        isValid = false;
    }

    if (typeInput.value === "") {
        typeError.textContent = "Select transaction type";
        typeInput.classList.add("invalid");
        isValid = false;
    }

    // Example modification inside validateForm() in main.js
    if (titleInput.value.trim() === "") {
        titleError.textContent = "Title is required";
        titleInput.classList.add("is-invalid"); // Bootstrap error border class
        isValid = false;
    } else {
        titleInput.classList.remove("is-invalid");
    }

    return isValid;
}