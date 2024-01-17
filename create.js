let name = document.getElementsByTagName("input")[0]
let totalA = document.getElementsByTagName("input")[1]
let leftA = document.getElementsByTagName("input")[2]
let date = document.getElementsByTagName("input")[3]
let btn  = document.getElementsByTagName("button")[0]
let err = document.getElementsByTagName("label")[1]
let identifier = document.getElementById("identifier")
let selector = document.getElementsByClassName('selector')
if (sessionStorage.getItem("location") == "Receipt") {
  leftA.remove()
  identifier.style.display = 'flex'
}
selector[0].addEventListener('click', ()=>{
  selector[0].classList.add("active")
  selector[1].classList.remove("active")
  sessionStorage.setItem("detail", "gave")
})
selector[1].addEventListener('click', ()=>{
  selector[1].classList.add("active")
  selector[0].classList.remove("active")
  sessionStorage.setItem("detail", "took")
})
btn.addEventListener("click", ()=>{
  event.preventDefault()
if (!(sessionStorage.getItem("location") == "Receipt")){
  if (name.value.trim() == '' || totalA.value.trim() == '' || leftA.value.trim() == ''|| date.value == '')  {
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
    err.innerHTML = "All feild should be filled"
    err.style.display = "block"
  }
  else if (Number.parseInt(totalA.value) < Number.parseInt(leftA.value)) {
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
    err.innerHTML = "Left Amount should never be more than Total Amount"
    err.style.display = "block"
  }
  else if(isNaN(Number.parseInt(totalA.value)) == true || isNaN(Number.parseInt(leftA.value)) == true){
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
    err.innerHTML = "Enter only Number in both Amount Feilds"
    err.style.display = "block"
  }
  else {
    if (sessionStorage.getItem("location") == "Moneytaken") {
      sessionStorage.setItem("new", `<div class='debt'><div><h2>${name.value.trim()}</h2><h4>left Amount: ₹ ${leftA.value.trim()}</h4><p hidden>${date.value}</p></div><div><h4>Total Amount: ₹ ${totalA.value.trim()}</h4><button class='add'>Add</button><button class='paid'>Paid</button></div></div>`)
      sessionStorage.setItem("receipt", `<div class='debt'><div><h2>${name.value.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Received: ₹${leftA.value.trim()}</h4></div></div>`)
      name.value = ''
      totalA.value = ''
      leftA.value = ''
      date.value = ''
    }
    else if (sessionStorage.getItem("location") == "Moneygiven") {
      sessionStorage.setItem("new", `<div class='debt'><div><h2>${name.value.trim()}</h2><h4>left Amount: ₹ ${leftA.value.trim()}</h4><p hidden>${date.value}</p></div><div><h4>Total Amount: ₹ ${totalA.value.trim()}</h4><button class='add'>Add</button><button class='paid'>Paid</button></div></div>`)
      sessionStorage.setItem("receipt", `<div class='debt'><div><h2>${name.value.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Given: ₹${leftA.value.trim()}</h4></div></div>`)
      name.value = ''
      totalA.value = ''
      leftA.value = ''
      date.value = ''
    }
    location.href = 'home.html'
  }
}
else {
  if (name.value.trim() == '' || totalA.value.trim() == '' || date.value == '')  {
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
    err.innerHTML = "All feild should be filled"
    err.style.display = "block"
  }
  else if(isNaN(Number.parseInt(totalA.value)) == true){
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
    err.innerHTML = "Enter only Number in Amount Feild"
    err.style.display = "block"
  }
  else if (!(selector[0].classList.contains("active") == true || selector[1].classList.contains("active") == true)){
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
    err.innerHTML = "Choose any of two options -- Gave or took"
    err.style.display = "block"
  }
  else {
    if (sessionStorage.getItem("detail") == "gave"){
      sessionStorage.setItem("new", `<div class='debt'><div><h2>${name.value.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Given: ₹${totalA.value.trim()}</h4></div></div>`)
    }
    if (sessionStorage.getItem("detail") == "took"){
      sessionStorage.setItem("new", `<div class='debt'><div><h2>${name.value.trim()}</h2><h4>Date: ${date.value.split("-").reverse().join("/").trim()}</h4></div><div><h4>Received: ₹${totalA.value.trim()}</h4></div></div>`)
    }
    location.href = 'home.html'
    name.value = ''
    totalA.value = ''
    leftA.value = ''
    date.value = ''
}
}
})
const cancel = () =>{
  event.preventDefault()
  location.href = 'home.html'
      }
