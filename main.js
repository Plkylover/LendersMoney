//--------checking user log details-------------
if (localStorage.getItem("logined") == "true") {
  location.href = 'home.html'
}
//-------------database feild---------------
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

let btns = document.getElementsByClassName("btns")
let heading = document.getElementsByTagName("h2")[0]
let button = document.getElementsByTagName("button")[0]
let name = document.getElementsByTagName("input")[0]
let email = document.getElementsByTagName("input")[1]
let password = document.getElementsByTagName("input")[2]
let nameErr = document.getElementById("nameErr")
let emailErr = document.getElementById("emailErr")
let passErr = document.getElementById("passErr")
let commonErr = document.getElementById("commonErr")
let form = document.getElementsByTagName("form")[0]
let err = false
const insetData = ()=>{
  let index = email.value.indexOf("@")
  let str = email.value.slice(0, index)
  set(ref(database, "usersDetails/"+str),{
    name: name.value,
    email: email.value,
    password: password.value,
    inHtml: `<div class="popup-container"> <div class="popup"> <h2>Enter The Amount:</h2> <input type="text" placeholder="Don't use symbols in Amount" id="amount"> <div class="common"> <label>Choose date</label> <input type="date" id="date"> </div> <label id="err"></label> <div class="common"> <button id='submit'>Submit</button> <button style="background-color: navajowhite" id='cancel'>Cancel</button> </div> </div> </div> <div id="Moneytaken" class="frag"> </div> <div id="Moneygiven" class="frag"> </div> <div id="Receipt" class="frag"> </div>`
  }).then(()=>{
    location.href = 'home.html'
  }).catch(()=>{
    commonErr.innerHTML = 'Your internet is slow'
    commonErr.style.display = 'block'
  })
}
sessionStorage.setItem('view', 'signUp')
btns[0].addEventListener("click", ()=>{
    btns[0].classList.add("active")
    btns[1].classList.remove("active")
    heading.innerHTML = btns[0].innerHTML
    button.innerHTML = "Create Account"
    name.style.display = "block"
    name.value = ''
    email.value = ''
    password.value = ''
    nameErr.style.display = "none"
    emailErr.style.display = "none"
    passErr.style.display = "none"
    commonErr.style.display = "none"
    sessionStorage.setItem('view', 'signUp')
  })
btns[1].addEventListener("click", ()=>{
    btns[1].classList.add("active")
    btns[0].classList.remove("active")
    heading.innerHTML = btns[1].innerHTML
    button.innerHTML = "Login Account"
    name.style.display = "none"
    name.value = ''
    email.value = ''
    password.value = ''
    nameErr.style.display = "none"
    emailErr.style.display = "none"
    passErr.style.display = "none"
    commonErr.style.display = "none"
    sessionStorage.setItem('view', 'login')
  })
button.addEventListener("click",()=>{
  err = false
  event.preventDefault()
  nameErr.style.display = "none"
  emailErr.style.display = "none"
  passErr.style.display = "none"
  commonErr.style.display = "none"
  if (sessionStorage.getItem("view") == "signUp") {
  if (name.value.trim() == '' || email.value.trim() == '' || password.value.trim() == '') {
    commonErr.innerHTML = "Enter values in name or email or password"
    commonErr.style.display = 'block'
    err = true
  }
  else{
    if (name.value.trim().length < 3) {
      nameErr.style.display = 'block'
      err = true
    }
    if (password.value.trim().length < 8) {
      passErr.style.display = 'block'
      err = true
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
    emailErr.style.display = 'block'
    err = true
    }
    if (!(err)) {
      let index = email.value.indexOf("@")
      localStorage.setItem("logined", "true")
      localStorage.setItem("user", email.value.slice(0, index))
      insetData()
      name.value = ''
      email.value = ''
      password.value = ''
    }
  }
}
else{
  if (name.value.trim() == '' || email.value.trim() == '' || password.value.trim() == '') {
    commonErr.innerHTML = "Enter values in name or email or password"
    commonErr.style.display = 'block'
    err = true
  }
  const dbref = ref(database)
  let index = email.value.indexOf("@")
  let str = email.value.slice(0, index)
  get(child(dbref, "usersDetails/"+str)).then((snapshot)=>{
    try{
    if (snapshot.val().email == email.value && snapshot.val().password == password.value) {
      name.value = ''
      email.value = ''
      password.value = ''
      localStorage.setItem("logined", "true")
      localStorage.setItem("user", str)
      location.href = 'home.html'
    }
    else{
      throw new Error()
    }
    }
    catch{
      name.value = ''
      email.value = ''
      password.value = ''
      commonErr.innerHTML = 'your email or password is wrong'
      commonErr.style.display = 'block'
    }
  })
}
})
