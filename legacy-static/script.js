//googled this domcontentloaded thing

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {

      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
      }
    });
  }

  function closeMobileMenu() {
    if (window.innerWidth <= 900 && navLinks) {
      navLinks.style.display = "none";
    }
  }
});



const el = document.getElementById("typed");
const titles = ["Frontend Developer", "Web Enthusiast", "MERN Developer"];
let i = 0, j = 0;

function type() {
  el.textContent = titles[i].substring(0, j++);
  if (j <= titles[i].length) {
    setTimeout(type, 100);
  } else {
    i = (i + 1) % titles.length;
    j = 0;
    setTimeout(type, 1000); 
  }
}

type();
