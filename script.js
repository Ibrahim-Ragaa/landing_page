let backgroundOption = true;

let backgroundInterval;

let backgroundLocal = localStorage.getItem("background-option");

if (backgroundLocal !== null) {
  if (backgroundLocal === "true") {
    backgroundOption = true;
  } else if (backgroundLocal === "false") {
    backgroundOption = false;
  }
  document.querySelectorAll(".option-box span").forEach((ele) => {
    if (backgroundLocal === "true" && ele.dataset.background === "yes") {
      ele.classList.add("active");
    } else if (backgroundLocal === "false" && ele.dataset.background === "no") {
      ele.classList.add("active");
    }
  });
}

// choose to make background random on or off
const backgroundSpan = document.querySelectorAll(".option-box span");
backgroundSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll("span").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      localStorage.setItem("background-option", true);
      backgroundOption = true;
      randomBackground();
    } else if (e.target.dataset.background === "no") {
      localStorage.setItem("background-option", false);
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

let landingPage = document.querySelector(".landing-page");

let imageArray = [
  "images/img-01.jpg",
  "images/img-02.jpg",
  "images/img-03.jpg",
  "images/img-04.jpg",
  "images/img-05.jpg",
];

//
function randomBackground() {
  backgroundInterval = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * imageArray.length);
    let imageBackground = imageArray[randomIndex];
    landingPage.style.backgroundImage = 'url("' + imageBackground + '")';
  }, 1500);
}
if (backgroundOption) {
  randomBackground();
}

//check if there's local storage color option
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    if (ele.dataset.color === mainColor) {
      ele.classList.add("active");
    }
  });
}

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    e.target.parentElement
      .querySelectorAll(".colors-list li.active")
      .forEach((ele) => {
        ele.classList.remove("active");
      });
    e.target.classList.add("active");
  });
});

// open popup image
document.querySelectorAll(".images-box img").forEach((img) => {
  img.addEventListener("click", (e) => {
    let poopupBox = document.createElement("div");
    poopupBox.className = "popup-overlay";
    let popupImg = `
    <div class="popup-image">
        <img src="${e.target.src}" alt="">
    </div>
    `;
    poopupBox.innerHTML = popupImg;
    document.body.appendChild(poopupBox);

    let closeButton = document.createElement("span");
    let closeText = document.createTextNode("X");
    closeButton.appendChild(closeText);
    closeButton.className = "close-button";
    document.querySelector(".popup-image").appendChild(closeButton);
  });
});

addEventListener("click", (e) => {
  if (
    e.target.className === "close-button" ||
    e.target.className === "popup-overlay"
  ) {
    let poopupBox = document.querySelector(".popup-overlay").remove();
  }
});
