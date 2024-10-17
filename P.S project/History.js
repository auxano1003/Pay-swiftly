let backArrow = document.getElementById("backArrow")

backArrow.addEventListener('click', function () {
    window.location.href = "Dashboard.html"
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBs8xzZ_NImJb45cGgURPSfsYP42hn5yNw",
    authDomain: "sqi-level-two-project.firebaseapp.com",
    databaseURL: "https://sqi-level-two-project-default-rtdb.firebaseio.com",
    projectId: "sqi-level-two-project",
    storageBucket: "sqi-level-two-project.appspot.com",
    messagingSenderId: "543903052576",
    appId: "1:543903052576:web:e276b5d2b7175fcabddd45",
    measurementId: "G-XSLF84G9DK"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let user = JSON.parse(localStorage.getItem("UserInformation"));
const lastName = user.lastName;
const transactionList = document.getElementById("transactionList");

const transactionsRef = ref(db, `TransactionHistory/${lastName}`)
onValue(transactionsRef, (tranHistory) => {
    const transactions = tranHistory.val()
    if (transactions) {
        Object.values(transactions).forEach(transaction => {
            const transactionItem = document.createElement("div");
            transactionItem.innerHTML = `
                <div class="card mt-3 col-11 col-md-6 col-lg-6 px-3 pt-2">
                    <p class="mb-1">Type: Money Transfer</p>
                    <p class="mb-1">Sender: ${transaction.from}</p>
                    <p class="mb-1">Recepient: ${transaction.to}</p>
                    <p class="mb-1">Amount: ${transaction.amount}</p>
                    <p class="mb-1">Date: ${transaction.date}</p>
                    <p class="mb-1">Narration: ${transaction.narration}</p>
                <div>
                `;
                transactionList.appendChild(transactionItem);
            });
        }
});

const airtimeRef = ref(db, `AirtimeHistory/${lastName}`)
onValue(airtimeRef, (tranHistory) => {
    const trans = tranHistory.val()
    if (trans) {
        Object.values(trans).forEach(transaction => {
            const airtimeItem = document.createElement("div");
            airtimeItem.innerHTML = `
                <div class="card mt-3 col-11 col-md-6 col-lg-6 px-3 pt-2">
                    <p class="mb-1">Type: Airtime Purchase</p>
                    <p class="mb-1">Amount: ${transaction.amount}</p>
                    <p class="mb-1">Date: ${transaction.date}</p>
                    <p class="mb-1">Network: ${transaction.network}</p>
                    <p class="mb-1">Phone No: ${transaction.phoneNo}</p>
                </div>
                `;
                transactionList.appendChild(airtimeItem);
            });
        }
});