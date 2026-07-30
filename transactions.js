"use strict";

// ==============================
// DOM ELEMENTS
// ==============================

const transactionsContainer = document.getElementById("transactionsContainer");

// ==============================
// VARIABLES
// ==============================

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

// ==============================
// DISPLAY TRANSACTIONS
// ==============================

function displayTransactions() {

    transactionsContainer.innerHTML = "";

    // No Transactions
    if (transactions.length === 0) {

        transactionsContainer.innerHTML = `
            <div class="no-expenses">
                No transactions found.
            </div>
        `;

        return;
    }

    // Display each transaction
    transactions.forEach(function (transaction) {

        const card = document.createElement("div");

        card.className = "expense-item";

        const amountClass =
            transaction.type === "income"
                ? "income-amount"
                : "";

        card.innerHTML = `

            <div class="expense-info">

                <strong>${transaction.description}</strong>

                <div class="expense-meta">

                    <span class="category">
                        ${transaction.category}
                    </span>

                    <span>
                        ${transaction.date}
                    </span>

                </div>

            </div>

            <div class="expense-amount ${amountClass}">

                ${transaction.type === "income" ? "+" : "-"}

                ₹${transaction.amount.toFixed(2)}

            </div>

            <div class="expense-actions">

                <button class="edit-btn">

                    <i class="fas fa-edit"></i>

                </button>

                <button class="delete-btn">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        `;

        transactionsContainer.appendChild(card);

        // ==========================
        // DELETE BUTTON
        // ==========================

        const deleteBtn = card.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {

            deleteTransaction(transaction.id);

        });

        // ==========================
        // EDIT BUTTON
        // ==========================

        const editBtn = card.querySelector(".edit-btn");

        editBtn.addEventListener("click", function () {

            localStorage.setItem(
                "editTransactionId",
                transaction.id
            );

            window.location.href = "index.html";

        });

    });

}

// ==============================
// DELETE TRANSACTION
// ==============================

function deleteTransaction(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) {

        return;

    }

    transactions = transactions.filter(function (transaction) {

        return transaction.id !== id;

    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    displayTransactions();

}

// ==============================
// INITIAL LOAD
// ==============================

displayTransactions();