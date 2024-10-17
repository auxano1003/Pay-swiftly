import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

let backArrow = document.getElementById("backArrow");

backArrow.addEventListener('click', function () {
    window.location.href = "Transfer.html";
});

let foundUser = JSON.parse(localStorage.getItem("foundUser"));
// console.log(foundUser);
const balance = foundUser.acctBalance;

let user = JSON.parse(localStorage.getItem("UserInformation"));
// console.log(user);
const userBalance = user.acctBalance;

let amountInput = document.getElementById("amount");
let inp = document.getElementById("tranPin");
let traN = document.getElementById("traN");
let transFer = document.getElementById("transFer");

transFer.addEventListener('click', function () {
    const amount = Number(amountInput.value);
    const tranPin = inp.value;

    if (amount < 100) {
        return alert("Amount cannot be less than #100");
    } else if (amount > userBalance) {
        return alert("Insufficient funds");
    } else if (tranPin !== user.transactionPin) {
        return alert("The transaction pin is incorrect");
    } else if (traN.value.length < 1) {
        return alert("Please input transfer narration");
    }

    let newuserBalance = userBalance - amount;
    const newBalance = balance + amount;

    let UserInformation = {
        ...user,
        acctBalance: newuserBalance,
    };
    localStorage.setItem("UserInformation", JSON.stringify(UserInformation));

    let newInformation = {
        ...foundUser,
        acctBalance: newBalance,
    };

    // Update both users' balances in the database
    set(ref(db, "UserDetails/" + newInformation.lastName), newInformation)
        .then(() => {
            set(ref(db, "UserDetails/" + UserInformation.lastName), UserInformation);
            
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            const formattedDate = mm + '/' + dd + '/' + yyyy;
            // console.log('Current date:', formattedDate);

            const date = new Date();
            const currentHours = date.getHours();
            const currentMinutes = date.getMinutes();
            const currentSeconds = date.getSeconds();
            const formattedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;
            // console.log('Current time:', formattedTime);

            const fullDate = `${formattedDate} ${formattedTime}`
            const sender = `${UserInformation.firstName} ${UserInformation.lastName}`
            const recipient = `${foundUser.firstName} ${foundUser.lastName}`

            // Log the transaction history
            const transaction = {
                type: "Transfer",
                from: sender,
                to: recipient,
                amount: amount,
                narration: traN.value,
                date: fullDate
            };

            // Save transaction history for the sender
            push(ref(db, "TransactionHistory/" + UserInformation.lastName), transaction)
                .then(() => {
                    // Save transaction history for the recipient
                    push(ref(db, "TransactionHistory/" + newInformation.lastName), transaction)
                        .then(() => {
                            window.location.href = "TranSuccess.html";
                            localStorage.setItem("TransHistory", JSON.stringify(transaction));
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("Transfer failed");
                        });
                })
                .catch((error) => {
                    console.log(error);
                    alert("Transfer failed");
                });
        })
        .catch((error) => {
            console.log(error);
            alert("Transfer failed");
        });
});
