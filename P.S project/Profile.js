let backArrow = document.getElementById("backArrow")

backArrow.addEventListener('click', function () {
    window.location.href = "Dashboard.html"
})

let lastName = document.getElementById("lastName")
let fullName = document.getElementById("fullName")
let FullName = document.getElementById("FullName")
let acctNo = document.getElementById("acctNo")
let tranPin = document.getElementById("tranPin")
let userName = document.getElementById("userName")
let emailAdd = document.getElementById("emailAdd")

let user = JSON.parse(localStorage.getItem("UserInformation"));
// console.log(user)
lastName.innerHTML = `${user.lastName}`
fullName.innerHTML = `${user.firstName} ${user.lastName}`
FullName.innerHTML = `${user.firstName} ${user.lastName}`
acctNo.innerHTML = `${user.acctNumber}`
tranPin.innerHTML = `${user.tranPin}`
emailAdd.innerHTML = `${user.email}`

let logOut = document.getElementById("logOut")

logOut.addEventListener("click", function () {
    window.location.href = "Log In.html"
})


