import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const auth = getAuth(app);
let createAccount = document.getElementById("createAccount");


createAccount.addEventListener("click", function (ev) {
    ev.preventDefault();

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let emailAddress = document.getElementById("emailAddress");
    let passWord = document.getElementById("passWord");
    let confirmPassword = document.getElementById("confirmPassword");

    let UserInformation = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: emailAddress.value,
        acctNumber: ""
    };

    if (passWord.value === "") {
    return alert("Password invalid");
    } else if (passWord.value !== confirmPassword.value) {
        return alert("Password does not match");
    } else if (passWord.value.length < 8) {
        return alert("Password must be a minimum of 8 characters");
    }

    // console.log("UserInformation : ", UserInformation);

    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("passWord").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // console.log("User Info : ", user);
            alert("User signed up successfully");
            window.location.href = "Loading.html";
            // console.log(UserInformation);
            localStorage.setItem("UserInformation", JSON.stringify(UserInformation));
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
               return alert("Email already in use");
            } else if (error.code === "auth/invalid-email") {
               return alert("Invalid Email");
            } else if (error.code === "auth/weak-password") {
               return alert("Weak Password");
            } else {
               return alert(error.message);
            }
        });
})