// Form & Inputs
const form = document.querySelector('#transaction-form');
const titleInput = document.querySelector('#title');
const amountInput = document.querySelector('#amount');
const categoryInput = document.querySelector('#category');
const typeInput = document.querySelector('#type');
const dateInput = document.querySelector('#date');

// Error messages
const titleError = document.querySelector('#title-error');
const amountError = document.querySelector('#amount-error');
const categoryError = document.querySelector('#category-error');
const dateError = document.querySelector('#date-error');
const typeError = document.querySelector('#type-error');

// Summary cards
const balanceElement = document.querySelector('#balance');
const incomeElement = document.querySelector('#income');
const expenseElement = document.querySelector('#expense');

// History Modal & Filter Elements
const historyModalElement = document.querySelector('#history-modal');
const transactionList = document.querySelector('#transaction-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const categoryFilter = document.querySelector('#category-filter');

let transactions = [];
let currentFilter = 'all';
let currentCategory = 'all';

// Load saved transactions from Local Storage
const savedTransactions = localStorage.getItem('transactions');
if (savedTransactions) {
  transactions = JSON.parse(savedTransactions);
}

// Initial renders 
updateSummary();
renderTransaction();

// Form Submit Event
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const transaction = {
    id: Date.now(),
    title: titleInput.value.trim(),
    amount: Number(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value,
    type: typeInput.value,
  };
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  // Update UI and reset form
  updateSummary();
  renderTransaction();
  form.reset();

  
  if (historyModalElement) {
    const modal = new bootstrap.Modal(historyModalElement);
    modal.show();
  }
});

// Update summary card 
function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(function (transaction) {
    if (transaction.type === 'Income') {
      totalIncome += Number(transaction.amount);
    }
    if (transaction.type === 'Expense') {
      totalExpense += Number(transaction.amount);
    }
  });

  const balance = totalIncome - totalExpense;

  if (incomeElement) incomeElement.textContent = `₹${totalIncome.toFixed(2)}`;
  if (expenseElement) expenseElement.textContent = `₹${totalExpense.toFixed(2)}`;
  if (balanceElement) balanceElement.textContent = `₹${balance.toFixed(2)}`;
}

// Render Table Rows 
function renderTransaction() {
  if (!transactionList) return;

  transactionList.innerHTML = '';
  let filteredTransactions = transactions;

  if (currentFilter !== 'all') {
    filteredTransactions = filteredTransactions.filter(function (t) {
      return t.type === currentFilter;
    });
  }

  if (currentCategory !== 'all') {
    filteredTransactions = filteredTransactions.filter(function (t) {
      return t.category === currentCategory;
    });
  }

  if (filteredTransactions.length === 0) {
    transactionList.innerHTML = `<tr class="empty-state"><td colspan="6" class="text-center py-4 text-muted">No transactions found.</td></tr>`;
    return;
  }

  filteredTransactions.forEach(function (transaction) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${transaction.title}</td>
      <td class="fw-bold">₹${Number(transaction.amount).toFixed(2)}</td>
      <td>${transaction.category}</td>
      <td>${transaction.date}</td>
      <td>
        <span class="badge ${transaction.type === 'Income' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
          ${transaction.type}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${transaction.id}">
          Delete
        </button>
      </td>
    `;

    transactionList.appendChild(row);
  });

  // Handle delete button clicks
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const id = Number(button.dataset.id);
      deleteTransaction(id);
    });
  });
}

function deleteTransaction(id) {
  transactions = transactions.filter(function (t) {
    return t.id !== id;
  });

  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateSummary();
  renderTransaction();
}

// Type Filter buttons 
filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
    currentFilter = button.dataset.filterType;
    renderTransaction();
  });
});

// Category Filter dropdown
if (categoryFilter) {
  categoryFilter.addEventListener('change', function () {
    currentCategory = categoryFilter.value;
    renderTransaction();
  });
}

// Form validation
function validateForm() {
  let isValid = true;

  // Reset error messages
  titleError.textContent = '';
  amountError.textContent = '';
  categoryError.textContent = '';
  dateError.textContent = '';
  typeError.textContent = '';

  // Reset input states
  titleInput.classList.remove('is-invalid');
  amountInput.classList.remove('is-invalid');
  categoryInput.classList.remove('is-invalid');
  dateInput.classList.remove('is-invalid');
  typeInput.classList.remove('is-invalid');

  if (titleInput.value.trim() === '') {
    titleError.textContent = 'Title is required';
    titleInput.classList.add('is-invalid');
    isValid = false;
  }

  if (amountInput.value === '' || Number(amountInput.value) <= 0) {
    amountError.textContent = 'Enter a valid amount';
    amountInput.classList.add('is-invalid');
    isValid = false;
  }

  if (categoryInput.value === '') {
    categoryError.textContent = 'Select a category';
    categoryInput.classList.add('is-invalid');
    isValid = false;
  }

  if (dateInput.value === '') {
    dateError.textContent = 'Select a date';
    dateInput.classList.add('is-invalid');
    isValid = false;
  }

  if (typeInput.value === '') {
    typeError.textContent = 'Select transaction type';
    typeInput.classList.add('is-invalid');
    isValid = false;
  }

  return isValid;
}
