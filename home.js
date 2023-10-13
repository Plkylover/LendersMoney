//-------------database feild-------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAm0PgCI6cIjGCUUysA7IANz0iowIsaxEI",
authDomain: "lendersmoney-627a9.firebaseapp.com",
databaseURL: "https://lendersmoney-627a9-default-rtdb.firebaseio.com",
projectId: "lendersmoney-627a9",
storageBucket: "lendersmoney-627a9.appspot.com",
messagingSenderId: "1099035127766",
 appId: "1:1099035127766:web:327ddd11a7d7718667fe77"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
const database = getDatabase()

//-----------------code feild-------------------
let user = localStorage.getItem("user")
let dbref = ref(database)
let container = document.getElementsByClassName("container")[0]
get(child(dbref, "usersDetails/"+user)).then((snapshot)=>{
  container.innerHTML = snapshot.val().inHtml
}).then(()=>{
  sessionStorage.removeItem("view")
  let popup_window = document.querySelector(".popup-container")
  let err = document.getElementById('err')
  popup_window.style.display = 'none'
  err.style.display = 'none'
// variable defining
let tab1C = document.getElementById("Moneytaken")
let tab2C = document.getElementById("Moneygiven")
let tab3C = document.getElementById("Receipt")
let tab =  document.getElementsByClassName("tab")
let createBtn = document.getElementsByClassName("button")[0]
let paid = document.getElementsByClassName("paid")
let add = document.getElementsByClassName("add")
let elm
let nameInput = document.getElementById("nameInput")
let search = document.getElementById("search")
let amount = document.getElementById("amount")
let date = document.getElementById("date")
let submit = document.getElementById("submit")
let cancel = document.getElementById("cancel")
let logOutBtn = document.getElementById("logout")
// fonction defining
const updateit = () => {
  update(ref(database, "usersDetails/" + user), {
    inHtml: container.innerHTML
  }).catch(() => {
    alert("Something went wrong....")
  })
}
const details = ()=>{
  let sendVal = ''
  for (let i = 0; i < tab3C.children.length; i++) {
    if (tab3C.children[i].firstElementChild.firstElementChild.innerHTML.toLowerCase().trim() == event.currentTarget.
    innerHTML.toLowerCase()) {
      sendVal += tab3C.children[i].outerHTML
    }
  }
  sessionStorage.setItem("detail", sendVal)
  location.href = 'details.html'
} 
const logout = ()=>{
    localStorage.removeItem("logined")
    localStorage.removeItem("user")
    location.href = 'index.html'
  }
const searchIt = ()=>{
  let parent = document.getElementById(sessionStorage.getItem("location"))
  if (nameInput.value.trim() == '') {
    for (let i = 0; i < parent.children.length; i++) {
      parent.children[i].style.display = 'flex'
    }
  }
  if (!(nameInput.value.trim() == '')) {
  for (let i = 0; i < parent.children.length; i++) {
    parent.children[i].style.display = 'none'
    if (parent.children[i].firstElementChild.firstElementChild.innerHTML.toLowerCase().trim().includes(nameInput.value.toLowerCase())) {
      parent.children[i].style.display = 'flex'
    }
  }
  }
}
const arrange = ()=>{
const divs = tab3C.children
const sortedDivs = Array.from(divs).sort((a, b) => {
  const dateA = new Date(a.firstElementChild.firstElementChild.nextElementSibling.innerHTML.split(" ")[1]);
  const dateB = new Date(b.firstElementChild.firstElementChild.nextElementSibling.innerHTML.split(" ")[1]);
  return dateA - dateB;
});
tab3C.innerHTML = '';
for (const div of sortedDivs) {
  tab3C.appendChild(div);
}
}
//actual code 
arrange()
for (let i = 0; i < tab.length; i++) {
tab[i].addEventListener("click", ()=>{
  sessionStorage.setItem("location", event.currentTarget.innerHTML.split(" ").join("").trim())
  for (let i = 0; i < tab.length; i++) {
    tab[i].classList.remove("active")
  }
  event.currentTarget.classList.add("active")
  tab1C.style.display = "none"
  tab2C.style.display = "none"
  tab3C.style.display = "none"
  document.getElementById(event.currentTarget.innerHTML.split(" ").join("").trim()).style.display = "block"
})
}
if (!(sessionStorage.getItem("receipt") == undefined || sessionStorage.getItem("receipt") == null)) {
  tab3C.innerHTML += sessionStorage.getItem("receipt")
  sessionStorage.removeItem("receipt")
  updateit()
}
if (!(sessionStorage.getItem("new") == undefined || sessionStorage.getItem("new") == null)) {
  document.getElementById(sessionStorage.getItem("location")).innerHTML += sessionStorage.getItem("new")
  sessionStorage.removeItem("new")
  document.getElementById(sessionStorage.getItem("location")).style.display = 'block'
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].innerHTML.split(" ").join("").trim() == sessionStorage.getItem("location")) {
      tab[i].classList.add("active")
      tab[i].click()
      document.getElementById(sessionStorage.getItem("location")).style.display = 'block'
    }
  }
  updateit()
} else{
sessionStorage.setItem("location", "Moneytaken")
tab1C.style.display = 'block'
tab[0].classList.add("active")
tab[0].click()
}
for (let i = 0; i < paid.length; i++) {
  paid[i].addEventListener("click", () => {
    sessionStorage.setItem("todo", "paid")
    popup_window.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    elm = event.currentTarget.parentElement.parentElement
  })
}
for (let i = 0; i < add.length; i++) {
  add[i].addEventListener("click", () => {
    popup_window.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    elm = event.currentTarget.parentElement.parentElement
  })
}
for (let i = 0; i < tab1C.children.length; i++) {
  tab1C.children[i].firstElementChild.firstElementChild.addEventListener("click", details)
}
for (let i = 0; i < tab2C.children.length; i++) {
  tab2C.children[i].firstElementChild.firstElementChild.addEventListener("click", details)
}
tab[2].addEventListener("click", arrange)
logOutBtn.addEventListener("click", logout)
nameInput.addEventListener("input", searchIt)
search.addEventListener("click", searchIt)
cancel.addEventListener("click", ()=>{
  event.preventDefault()
  document.body.style.overflowY = 'scroll'
  document.body.style.overflowX = 'hidden'
  popup_window.style.display = 'none'
  err.style.display = 'none'
  amount.value = ''
  date.value = ''
})
submit.addEventListener("click", () => {
  event.preventDefault()
  let inHtml = elm.firstElementChild.firstElementChild.nextElementSibling.innerHTML.split(" ")
  err.style.display = 'none'
  if (amount.value.trim() == '') {
    err.innerHTML = 'Enter any Amount'
    err.style.display = 'block'
  }
  else if (isNaN(Number.parseInt(amount.value))) {
    err.innerHTML = 'Enter Numbers only'
    err.style.display = 'block'
  }
  else if (date.value == '') {
    err.innerHTML = 'choose the Date'
    err.style.display = 'block'
  }
  else if (Number.parseInt(inHtml[3]) < Number.parseInt(amount.value)) {
    err.innerHTML = 'The Amount should not be more than left Amount'
    err.style.display = 'block'
  }
  else if(new Date(elm.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML) > new Date(date.value)){
    err.innerHTML = 'The date should not be less than Transiction date'
    err.style.display = 'block'
  }
  else {
    popup_window.style.display = 'none'
    let newAmount = Number.parseInt(inHtml[3])
    if (sessionStorage.getItem("todo") == 'paid') {
    newAmount = newAmount - Number.parseInt(amount.value)
    }
    else {
      newAmount = newAmount + Number.parseInt(amount.value)
    }
    inHtml[3] = newAmount
    elm.firstElementChild.firstElementChild.nextElementSibling.innerHTML = inHtml.join(" ")
    document.body.style.overflowY = 'scroll'
    document.body.style.overflowX= 'hidden'
    updateit()
if (sessionStorage.getItem("todo") == 'paid'){
  if (sessionStorage.getItem("location") == "Moneytaken") {
    tab3C.innerHTML += `<div class='debt'><div><h2>${elm.firstElementChild.firstElementChild.innerHTML.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Given: ₹${amount.value.trim()}</h4></div></div>`
    updateit()
  }
  if (sessionStorage.getItem("location") == "Moneygiven") {
    tab3C.innerHTML += `<div class='debt'><div><h2>${elm.firstElementChild.firstElementChild.innerHTML.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Received: ₹${amount.value.trim()}</h4></div></div>`
    updateit()
  }
}
  else{
    if (sessionStorage.getItem("location") == "Moneygiven") {
      tab3C.innerHTML += `<div class='debt'><div><h2>${elm.firstElementChild.firstElementChild.innerHTML.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Given: ₹${amount.value.trim()}</h4></div></div>`
      updateit()
    }
    if (sessionStorage.getItem("location") == "Moneytaken") {
      tab3C.innerHTML += `<div class='debt'><div><h2>${elm.firstElementChild.firstElementChild.innerHTML.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Received: ₹${amount.value.trim()}</h4></div></div>`
      updateit()
    }
  }
  if (inHtml[3] == 0 && sessionStorage.getItem("todo") == 'paid') {
    elm.remove()
    updateit()
  }
  sessionStorage.removeItem("todo")
  }
  amount.value = ''
  date.value = ''
})
createBtn.addEventListener('click', ()=>{
  event.preventDefault()
  location.href = 'create.html'
})
})