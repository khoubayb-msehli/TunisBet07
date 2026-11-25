
document.addEventListener("DOMContentLoaded", () => {
  console.log("TunisBet07 is running!");

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
