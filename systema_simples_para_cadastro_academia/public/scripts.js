const currentPage = location.pathname
const menuLinks = document.querySelectorAll("header .links a")

for (item of menuLinks) {
  if (currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active")
  }
}