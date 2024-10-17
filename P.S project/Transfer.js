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

let backArrow = document.getElementById("backArrow");

backArrow.addEventListener('click', function () {
    window.location.href = "Dashboard.html"
});

const acctNo = document.getElementById("acctNo");
let checkUser = document.getElementById("checkUser");
let transFer = document.getElementById("transFer");
let acctName = document.getElementById("acctName");
let selectBank = document.getElementById("selectBank")
let swiftPay = document.getElementById("swiftPay");
let firstBank = document.getElementById("firstBank");
let gtBank = document.getElementById("gtBank");
let kudaBank = document.getElementById("kudaBank");
let oPay = document.getElementById("oPay");
let palmPay = document.getElementById("palmPay");

firstBank.addEventListener('click', function () {
    selectBank.innerHTML = "First Bank PLC"
})

kudaBank.addEventListener('click', function () {
    selectBank.innerHTML = "Kuda Bank"
})

gtBank.addEventListener('click', function () {
    selectBank.innerHTML = "Guaranty Trust Bank"
})

oPay.addEventListener('click', function () {
    selectBank.innerHTML = "Paycom (OPay)"
})

palmPay.addEventListener('click', function () {
    selectBank.innerHTML = "palmPay"
})

swiftPay.addEventListener('click', function () {
    selectBank.innerHTML = "SwiftPay"
})

let userInt = JSON.parse(localStorage.getItem("UserInformation"));

checkUser.addEventListener('click', function () {
    const acctNumber = Number(acctNo.value);
    const ownAcct = Number(userInt.acctNumber)

    if (selectBank.innerHTML !== "SwiftPay") {
        acctName.innerHTML = "";
        return alert ("User not found")
    } else if (acctNumber.length < 9) {
        return alert("Recepient account number is invalid")
    } else if (acctNumber === ownAcct) {
        return alert ("Recepient account cannot be same as own account")
    }

    // console.log("AcctNo:", acctNumber);

    const userRef = ref(db, `UserDetails`)
    onValue(userRef, (userInfo) => {
        const userdetails = [userInfo.val()]
        console.log("Userdetails:", userdetails);

        function findUserByAcctNumber(acctNumber) {
            for (const lastName in userdetails[0]) {
                if (userdetails[0].hasOwnProperty(lastName)) {
                    const user = userdetails[0][lastName];
                    if (user.acctNumber === acctNumber) {
                        return user;
                    }
                }
            }
            return null;
        }

        const foundUser = findUserByAcctNumber(acctNumber);
        console.log("Found User:", foundUser);
        acctName.innerHTML = `<span class="text-uppercase">${foundUser.firstName} ${foundUser.lastName}</span>`;

        localStorage.setItem("foundUser", JSON.stringify(foundUser))
    });

    transFer.addEventListener('click', function () {
            window.location.href = "Transfer2.html";
        });
});