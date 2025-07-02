const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income-amount");
const expenseElement = document.getElementById("expense-amount");
const transactionListElement = document.getElementById("transaction-list");
const transactionFormElement = document.getElementById("transaction-form");
const descriptionElement = document.getElementById("description");
const amountElement = document.getElementById("amount");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormElement.addEventListener("submit", addTransaction);

function addTransaction(event) {
    event.preventDefault();

    // get form values
    const description = descriptionElement.value.trim();
    const amount = parseFloat(amountElement.value);

    transactions.push({
        id: Date.now(),
        description: description,
        amount: amount
    })

    localStorage.setItem("transactions", JSON.stringify(transactions))

    updateTransactionList();
    updateSummary();

    transactionFormElement.reset();
}

function updateTransactionList(){
    transactionListElement.innerHTML = "";

    const sortedTransactions = [...transactions].reverse()

    sortedTransactions.forEach((transaction) =>{
        const transactionElement = createTransactionElement(transaction);
        transactionListElement.appendChild(transactionElement);
    })

}

function createTransactionElement(transaction){
    const li = document.createElement("li");
    li.classList.add("transaction")
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${formatCurrency(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
        </span>
        `;
    return li;
}

function updateSummary(){

    const balance = transactions.reduce((acc, transaction) =>
        acc + transaction.amount, 0)

    const income = transactions
    .filter(transaction => transaction.amount > 0).reduce((acc, transaction) =>
        acc + transaction.amount, 0) 
    const expenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) =>
        acc + transaction.amount, 0)

    //update the UI
    balanceElement.textContent = formatCurrency(balance);
    incomeElement.textContent = formatCurrency(income);
    expenseElement.textContent = formatCurrency(expenses);
}

function formatCurrency(number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number);
}
//Initial render
updateTransactionList();
updateSummary();