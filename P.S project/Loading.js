import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

let userDisplay = document.getElementById("userDisplay");
let acctNo = document.getElementById("acctNo");

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.addEventListener('load', function (ev) {
    ev.preventDefault()

    let user = JSON.parse(localStorage.getItem("UserInformation"));
    // console.log(user)
    userDisplay.innerHTML = `Hello, ${user.firstName}`
    // console.log(user.acctNumber)
    const acctNumber = user.acctNumber
    // console.log(acctNumber)

    if (acctNumber && acctNumber.toString().length > 8) {
        acctNo.innerHTML = acctNumber;
    } else {
        let firstInterval = setInterval(() => {
            let x = Math.floor((Math.random(0o0) * 999999999) + 1);
            acctNo.innerHTML = x;

            let updatedUser = {
                ...user,
                acctNumber: x,
                acctBalance: 20000,
            };

            // console.log(UserInformation);
            set(ref(db, "UserDetails/" + updatedUser.lastName), updatedUser)
                .then(() => {
                    alert("User Information saved")
                    // console.log(updatedUser)
                })
                .catch((error) => {
                    console.log(error);
                });

            localStorage.setItem("UserInformation", JSON.stringify(updatedUser));
        }, 3000)


        let firstTimeout = setTimeout(() => {
            clearInterval(firstInterval)
        }, 3000)
    }

})

nextBtn.addEventListener('click', () => {
    window.location.href = "SetPin.html";
})