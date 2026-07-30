const transactionList = document.querySelector("#transaction-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const categoryFilter = document.querySelector("#category-filter");

let transactions = [];
let currentFilter = "all";
let currentCategory = "all";

// Load saved transactions from local storage
const savedTransactions = localStorage.getItem("transactions");
if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
}

// Initial render
renderTransaction();

// Filter button events
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        currentFilter = button.dataset.filterType;
        renderTransaction();
    });
});

// Category filter event
if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
        currentCategory = categoryFilter.value;
        renderTransaction();
    });
}

function renderTransaction() {
    transactionList.innerHTML = "";
    let filteredTransactions = transactions;

    if (currentFilter !== "all") {
        filteredTransactions = filteredTransactions.filter(function (transaction) {
            return transaction.type === currentFilter;
        });
    }

    if (currentCategory !== "all") {
        filteredTransactions = filteredTransactions.filter(function (transaction) {
            return transaction.category === currentCategory;
        });
    }

    if (filteredTransactions.length === 0) {
        transactionList.innerHTML = `<tr class="empty-state"><td colspan="6" style="text-align: center; padding: 1.5rem;">No transactions found.</td></tr>`;
        return;
    }

    filteredTransactions.forEach(function (transaction) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.title}</td>
            <td class="amount">₹${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
            <td>
                <span class="type badge ${transaction.type.toLowerCase()}">
                    ${transaction.type}
                </span>
            </td>
            <td>
                <button class="delete-btn" data-id="${transaction.id}">
                    Delete
                </button>
            </td>
        `;

        transactionList.appendChild(row);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const id = Number(button.dataset.id);
            deleteTransaction(id);
        });
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransaction();
}