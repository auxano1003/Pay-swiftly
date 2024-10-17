import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, push, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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
    window.location.href = "Dashboard.html"
});

let airTel = document.getElementById("airTel");
let gLo = document.getElementById("gLo");
let mTn = document.getElementById("mTn");
let eTi = document.getElementById("eTi");
let net = document.getElementById("netWork");

airTel.addEventListener('click', function () {
    net.innerHTML = "airtel"
})

gLo.addEventListener('click', function () {
    net.innerHTML = "glo"
})

mTn.addEventListener('click', function () {
    net.innerHTML = "mtn"
})

eTi.addEventListener('click', function () {
    net.innerHTML = "9Mobile"
})

let user = JSON.parse(localStorage.getItem("UserInformation"));
// console.log(user)
let acctBalance = user.acctBalance;
let phoneNo = document.getElementById("phoneNo");
let airTime = document.getElementById("airTime");
let inp = document.getElementById("tranPin");
let topUp = document.getElementById("topUp");

topUp.addEventListener('click', function () {
    const tranPin = inp.value;
    const amount = airTime.value;

    if (phoneNo.value.length < 10) {
        return alert("Phone number is not valid");
    } else if (amount < 50) {
        return alert("Amount cannot be less than #50");
    } else if (amount > acctBalance) {
        return alert("Insufficient funds");
    } else if (tranPin !== user.transactionPin) {
        return alert("The transaction pin is incorrect");
    } else if (net.innerHTML.length < 2) {
        return alert ("Please select a network")
    }

    let newBalance = acctBalance - amount;

    let UserInformation = {
        ...user,
        acctBalance: newBalance,
    };

    localStorage.setItem("UserInformation", JSON.stringify(UserInformation));

    set(ref(db, "UserDetails/" + UserInformation.lastName), UserInformation)
    .then(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const formattedDate = mm + '/' + dd + '/' + yyyy;

        const date = new Date();
        const currentHours = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();
        const formattedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

        const fullDate = `${formattedDate} ${formattedTime}`

        const transaction = {
            type: 'Airtime Purchase',
            amount: amount,
            date: fullDate,
            network: net.innerHTML.toUpperCase(),
            phoneNo: phoneNo.value
        };

        push(ref(db, "AirtimeHistory/" + user.lastName), transaction);

        window.location.href = "TranSuccess.html";
    })
    .catch((error) => {
        console.log(error);
        alert("Airtime purchase failed");
    });
});
