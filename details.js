let mydetail = document.getElementById("mydetail")
mydetail.innerHTML = sessionStorage.getItem("detail")
const back = ()=>{
  location.href = 'home.html'
}
sessionStorage.removeItem("detail")