const light = document.querySelector("#light");
const dark = document.querySelector("#dark");
const contrast = document.querySelector("#contrast");

light.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
});

dark.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
});

contrast.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "contrast");
  localStorage.setItem("theme", "contrast");
});
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    dark.checked = true;
  }
  if (currentTheme === "contrast") {
    contrast.checked = true;
  }
}

const buttonNumber = document.querySelectorAll("[data-number]");
const buttonOperation = document.querySelectorAll("[data-operation");
const buttonEqual = document.querySelector("[data-equals]");
const buttonDelete = document.querySelector("[data-delete]");
const buttonClear = document.querySelector("[data-clear]");
const previousDataTextElement = document.querySelector("[data-previous-data]");
const currentDataTextElement = document.querySelector("[data-current-data]");
