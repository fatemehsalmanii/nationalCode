// document.addEventListener("DOMContentLoaded", () => {
//   const inputs = document.querySelectorAll("input");
//   for (let index = 0; index < inputs.length; index++) {
//     inputs[index].addEventListener("keydown", () => {
//       // console.log("lengh is:",inputs[index].value.length);
//     });
//   }
// });

const checkCodeMeli = (code) => {
  const bads = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ];
  if (!code) return false;
  code = code.toString().trim();
  if (/^\d+$/.test(code) === false) return false;
  const numbers = code.split("").map((i) => +i);
  for (const bad of bads) if (code === bad) return false;
  if (numbers.length !== 10) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(code.charAt(i), 10) * (10 - i);
  s = s % 11;
  return (
    (s < 2 && numbers.at(-1) === s) || (s >= 2 && numbers.at(-1) === 11 - s)
  );
};
let box = document.querySelector("#boxInput");

let inp = document.getElementById("inp");

let otps = document.querySelectorAll(".otp");

inp.value = "";

inp.addEventListener("focus", (event) => {
  if (event.target.value.length <= 1) {
    otps[0].innerHTML =
      (event.target.value[0] || "") + `<span id="current">|</span>`;

    otps[0].classList.add("active");
  }
});

inp.addEventListener("blur", () => {
  let activeItem = document.querySelector(".active");

  activeItem.style.boxShadow = "none";

  activeItem.innerHTML = "";

  activeItem.classList.remove("active");
});

inp.addEventListener("input", (event) => {
  if (event.target.value.length <= 10) {
    const result = checkCodeMeli(event.target.value);
    if (result) {
      // fa-times
      // fa-check
      relativeIcon("fa-check");
    } else {
      relativeIcon("fa-times");
    }
  }

  otps.forEach((item, index) => {
    if (index == event.target.value.length) {
      item.classList.add("active");

      item.innerHTML =
        (event.target.value[index] || "") + `<span id="current">|</span>`;
    } else {
      item.style.boxShadow = "none";

      item.innerHTML = event.target.value[index] || "";

      item.classList.remove("active");
    }
  });
});

// const inputs = document.querySelectorAll("input");
// // inputs.
function relativeIcon(iconName) {
  const icon = document.getElementById("icon");
  icon.removeAttribute("class");
  icon.setAttribute("class", `fa ${iconName}`);
}

// function checkNationaliti() {

//   let national = "";
//   for (let index = 0; index < inputs.length; index++) {
//     national = national + `${inputs[index].value}`;
//   }

// }
