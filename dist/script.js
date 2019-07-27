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

//building a gradient image
const buildGrad = (value, direction) => {

  return `to ${direction}, ${value}`;

};

//calc background-size
const gradSize = () => {

  //1. get number of columns
  let firstItemPosX = navItems[0].getBoundingClientRect().left;
  let cols = 1;

  for (let i = 1; i < navItems.length; i++) {

    if (navItems[i].getBoundingClientRect().left > firstItemPosX) {
      cols++;
    } else {
      break;
    }

  }

  //2. get number of rows
  let itemPosY = navItems[0].getBoundingClientRect().top;
  let rows = 1;

  for (let i = 1; i < navItems.length; i++) {

    if (navItems[i].getBoundingClientRect().top > itemPosY) {
      rows++;

      itemPosY = navItems[i].getBoundingClientRect().top;
    }

  }

  //3. get size of 1 item
  const itemWidth = navItems[0].offsetWidth;
  const itemHeight = navItems[0].offsetHeight;

  //4. get gradient size
  let gradSizeX = itemWidth * cols;
  let gradSizeY = itemHeight * rows;

  return [gradSizeX, gradSizeY];

};

//setting gradient styles
const setGrad = elem => {

  //background image style
  const bgImg = `linear-gradient(${buildGrad(gradValue(), gradDir())})`;

  elem.style.backgroundImage = bgImg;

  //background size style
  const bgSizeX = `${gradSize()[0]}`;
  const bgSizeY = `${gradSize()[1]}`;

  elem.style.backgroundSize = `${bgSizeX}px ${bgSizeY}px`;

};

//setting gradient styles to every item onload
navItems.forEach(elem => {

  setGrad(elem);

});