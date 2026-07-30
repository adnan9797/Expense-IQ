# Expense-IQ
ExpenseIQ is a lightweight personal expense tracker I built to make logging daily spending quick, private, and painless. It calculates your income, expenses, and net balance in real time—all without requiring an account, an internet connection, or sending your personal financial data to a cloud server.

# Why I Built This
Most budgeting apps out there force you to create an account, complete onboarding screens, or deal with slow network requests just to log a simple $5 coffee. I wanted to build something straightforward and instant: open the page, enter the amount, hit save, and get back to your day.

# Features
Instant & Private: Runs 100% inside your browser. Your financial data stays stored on your device via localStorage.

Live Financial Overview: Automatically updates your Total Income, Total Expense, and Net Balance as you add or remove items.

History & Filtering: Easily view your past transactions and filter them by category (Food, Travel, Bills, etc.) or type (Income/Expense).

Mobile Friendly: Fully responsive design that adapts cleanly to phone screens and desktops alike.

Smart Form Guard: Prevents accidental empty entries or invalid numbers with clear error messages.

# Tech Stack
HTML5 & Modern CSS3

Bootstrap 5.3 (for grid layouts and utility styling)

JavaScript 

Browser LocalStorage API (for saving data locally)

# Project Structure
Plaintext
ExpenseIQ/
├── index.html              # Main dashboard (Summary cards & transaction input form)
├── add-transaction.html    # History page (Filter controls & transaction table)
├── style.css               # Minimal custom styling overrides
├── main.js                 # Dashboard logic (Form validation & balance calculations)
└── add-transaction.js      # History page logic (Dynamic rendering & filtering)
# How It Works Behind the Scenes
Adding Data: When you submit a transaction on the home page, JavaScript intercepts the form, validates your inputs, generates a unique timestamp ID (Date.now()), and formats the entry into an object.

Saving Data: The object is converted to a string using JSON.stringify() and pushed into an array saved inside your browser's localStorage.

Displaying History: On the history page, JavaScript reads that array, parses it back into objects using JSON.parse(), applies any active category or type filters, and dynamically builds the table rows.

# How to Run It Locally
You don't need npm, Node.js, or any build setup to run this!

Clone the repository:

Bash
git clone https://github.com/your-username/ExpenseIQ.git
Open the project folder:

Bash
cd ExpenseIQ
Double-click index.html (or open it with VS Code's Live Server extension) to launch the app in your browser.

# Future Improvements
[ ] Add CSV export so users can download their data for Excel/Google Sheets.

[ ] Add Chart.js pie charts to visualize spending categories visually.

[ ] Add a Dark Mode toggle.

[ ] Convert into a Progressive Web App (PWA) for desktop/mobile installation.

# Author
Md Adnan

B.Tech in Computer Science & Engineering
