const input = document.querySelector('#count-numbers');
const current = document.querySelector('#count-numbers');
const currentPlace = document.querySelector('.counter_current');
let currentLength = 0;

// maxLength = input.maxLength;

// document.querySelector('.counter_max').innerHTML = maxLength;

input.addEventListener("input", ({ currentTarget: target }) => {
currentLength = target.value.length;

// if (currentLength >= maxLength) {
//   document.querySelector('.counter').classList.add('max');
// } else {
//   document.querySelector('.counter').classList.remove('max');
// }

currentPlace.innerHTML = currentLength;
});
