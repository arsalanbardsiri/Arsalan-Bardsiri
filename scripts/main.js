const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".fas"); 
let currentTheme = localStorage.getItem("theme") || "light";



const observer = new IntersectionObserver((entries)=> {
  entries.forEach((entry)=>{
    // console.log(entry)
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }else{
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


setTheme(currentTheme); 

themeToggle.addEventListener("click", () => {
  themeToggle.classList.add("rotated"); // Apply rotation animation

  // After the animation ends, change the theme and remove rotated class
  setTimeout(() => {
    if (document.body.classList.contains("light")) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    themeToggle.classList.remove("rotated"); // Remove the rotation class after theme switch
  }, 500); // Wait for 500ms to match the animation duration
});

function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    themeIcon.classList.add("fa-sun");
    themeIcon.classList.remove("fa-moon");
    setIconColor("#333333"); // Set icons color to black
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    themeIcon.classList.add("fa-moon");
    themeIcon.classList.remove("fa-sun");
    setIconColor("#ffffff"); // Set icons color to white
  }
}

function setIconColor(color) {
  let icons = document.querySelectorAll(".project-icon");
  icons.forEach((icon) => {
    icon.style.color = color;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      let width = card.offsetWidth;
      let height = card.offsetHeight;
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;

      let tiltX = (mouseY / height - 0.5) * -15; // Adjust the multiplier for more tilt
      let tiltY = (mouseX / width - 0.5) * 15; // Adjust the multiplier for more tilt

      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener("mouseout", function () {
      card.style.transform = "";
    });
  });
});

