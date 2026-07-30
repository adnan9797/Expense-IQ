"use strict";

// ========================================
// DOM ELEMENTS
// ========================================

// Input Fields
const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const categorySelect = document.getElementById("categorySelect");

// Radio Buttons
const typeRadios = document.querySelectorAll(
    'input[name="type"]'
);

// Buttons
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const themeToggle = document.getElementById("themeToggle");
const viewTransactions =
    document.getElementById("viewTransactions");

// Summary Cards
const totalBalance =
    document.getElementById("totalBalance");

const totalIncome =
    document.getElementById("totalIncome");

const totalExpense =
    document.getElementById("totalExpense");

// ========================================
// VARIABLES
// ========================================

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

const editTransactionId =
    localStorage.getItem("editTransactionId");

let isEditing = false;

// ========================================
// HELPER FUNCTIONS
// ========================================

// Save data into localStorage
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// Currency Formatter
function formatCurrency(amount) {

    return "₹" + Number(amount).toFixed(2);

}

// Selected Radio Button
function getSelectedType() {

    for (const radio of typeRadios) {

        if (radio.checked) {

            return radio.value;

        }

    }

    return "expense";

}

// Reset Form
function resetForm() {

    descInput.value = "";

    amountInput.value = "";

    categorySelect.selectedIndex = 0;

    document.querySelector(
        'input[value="expense"]'
    ).checked = true;

    addBtn.innerHTML = `
        <i class="fas fa-plus"></i>
        Add Transaction
    `;

    isEditing = false;

}

// ========================================
// SUMMARY CARDS
// ========================================

function updateSummary() {

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction){

        if(transaction.type === "income"){

            income += transaction.amount;

        }
        else{

            expense += transaction.amount;

        }

    });

    totalIncome.textContent =
        formatCurrency(income);

    totalExpense.textContent =
        formatCurrency(expense);

    totalBalance.textContent =
        formatCurrency(income - expense);

}
// ========================================
// LOAD TRANSACTION FOR EDIT
// ========================================

function loadTransactionForEdit() {

    if (!editTransactionId) return;

    const transaction = transactions.find(function (item) {

        return item.id == editTransactionId;

    });

    if (!transaction) return;

    descInput.value = transaction.description;

    amountInput.value = transaction.amount;

    categorySelect.value = transaction.category;

    document.querySelector(
        `input[value="${transaction.type}"]`
    ).checked = true;

    addBtn.innerHTML = `
        <i class="fas fa-edit"></i>
        Update Transaction
    `;

    isEditing = true;

}

// ========================================
// ADD / UPDATE TRANSACTION
// ========================================

function addTransaction() {

    const description = descInput.value.trim();

    const amount = Number(amountInput.value);

    const category = categorySelect.value;

    const type = getSelectedType();

    // Validation

    if (description === "") {

        alert("Please enter a description.");

        descInput.focus();

        return;

    }

    if (amount <= 0 || isNaN(amount)) {

        alert("Please enter a valid amount.");

        amountInput.focus();

        return;

    }

    // Transaction Object

    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        category: category,

        type: type,

        date: new Date().toLocaleDateString()

    };

    // =============================
    // EDIT EXISTING TRANSACTION
    // =============================

    if (isEditing) {

        transaction.id = Number(editTransactionId);

        const index = transactions.findIndex(function (item) {

            return item.id == editTransactionId;

        });

        if (index !== -1) {

            transactions[index] = transaction;

        }

        localStorage.removeItem("editTransactionId");

    }

    // =============================
    // ADD NEW TRANSACTION
    // =============================

    else {

        transactions.push(transaction);

    }

    // Save Data

    saveTransactions();

    // Update Cards

    updateSummary();

    // Reset Form

    resetForm();

    // Redirect

    window.location.href = "transaction.html";

}
// ========================================
// THEME (DARK / LIGHT)
// ========================================

// Load Saved Theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.documentElement.setAttribute(
        "data-theme",
        "dark"
    );

    if (themeToggle) {

        themeToggle.innerHTML = `
            <i class="fas fa-sun"></i>
        `;

    }

}

// Toggle Theme

function toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {

        document.documentElement.removeAttribute("data-theme");

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML = `
            <i class="fas fa-moon"></i>
        `;

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML = `
            <i class="fas fa-sun"></i>
        `;

    }

}

// ========================================
// CLEAR ALL TRANSACTIONS
// ========================================

function clearAllTransactions() {

    if (transactions.length === 0) {

        alert("No transactions found.");

        return;

    }

    const confirmClear = confirm(
        "Are you sure you want to delete all transactions?"
    );

    if (!confirmClear) {

        return;

    }

    transactions = [];

    saveTransactions();

    localStorage.removeItem("editTransactionId");

    updateSummary();

    resetForm();

    alert("All transactions have been deleted.");

}

// ========================================
// INITIAL LOAD
// ========================================

loadTransactionForEdit();

updateSummary();

// ========================================
// EVENT LISTENERS
// ========================================

// Add Transaction

if (addBtn) {

    addBtn.addEventListener("click", addTransaction);

}

// Theme Toggle

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}

// Clear All

if (clearAllBtn) {

    clearAllBtn.addEventListener(
        "click",
        clearAllTransactions
    );

}

// View Transactions Page

if (viewTransactions) {

    viewTransactions.addEventListener(
        "click",
        function () {

            window.location.href =
                "transactions.html";

        }
    );

}