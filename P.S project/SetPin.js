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
let Pin = document.getElementById("tranPin");

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.addEventListener('load', function (ev) {
    ev.preventDefault()

    let user = JSON.parse(localStorage.getItem("UserInformation"));
    userDisplay.innerHTML = `Hello, Mr. ${user.lastName}`

    nextBtn.addEventListener('click', () => {
        const tranPin = Pin.value;

        if (tranPin.length < 4) {
            return alert("Pin should be at least four digits")
        } else {
            let UserInformation = {
                ...user,
                transactionPin: tranPin
            };
        
            localStorage.setItem("UserInformation", JSON.stringify(UserInformation));

            set(ref(db, "UserDetails/" + UserInformation.lastName), UserInformation)
                .then(() => {
                    window.location.href = "Dashboard.html";
                })
                .catch((error) => {
                    alert("Error Occured while saving data");
                });
        }
    })
})