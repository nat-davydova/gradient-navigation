const nav = document.querySelector('.nav-area');
const navItems = document.querySelectorAll('.nav-area__item');

//grabbing gradient value
const gradValue = () => {

  return nav.dataset.gradient;

};

//grabbing gradient direction
const gradDir = () => {

  return nav.dataset.gradientDirection;

};

//building a gradient
const buildGrad = (value, direction) => {

  return `to ${direction}, ${value}`;

};