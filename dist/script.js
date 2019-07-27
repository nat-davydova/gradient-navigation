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

  //get number of columns
  let firstItemPosX = navItems[0].getBoundingClientRect().left;
  let cols = 1;

  for (let i = 1; i < navItems.length; i++) {

    if (navItems[i].getBoundingClientRect().left > firstItemPosX) {
      cols++;
    } else {
      break;
    }

  }

  //get number of rows
  let itemPosY = navItems[0].getBoundingClientRect().top;
  let rows = 1;

  for (let i = 1; i < navItems.length; i++) {

    if (navItems[i].getBoundingClientRect().top > itemPosY) {
      rows++;

      itemPosY = navItems[i].getBoundingClientRect().top;
    }

  }

  // get size of 1 item
  const itemWidth = navItems[0].offsetWidth;
  const itemHeight = navItems[0].offsetHeight;

  //get gradient size
  let gradSizeX = itemWidth * cols;
  let gradSizeY = itemHeight * rows;

  return [gradSizeX, gradSizeY, cols, rows];

};

// add col and row for every item
const colRow = () => {

  let row = 1;
  let col = 1;

  let xItemPos = navItems[0].getBoundingClientRect().left;

  //setting cols
  for (let i = 0; i < navItems.length; i++) {

    if (navItems[i].getBoundingClientRect().left > xItemPos) {
      col++;
    } else {
      col = 1;
    }

    navItems[i].dataset.col = col;
  }

  //setting rows
  let yItemPos = navItems[0].getBoundingClientRect().top;

  for (let i = 0; i < navItems.length; i++) {

    if (navItems[i].getBoundingClientRect().top > yItemPos) {
      row++;

      yItemPos = navItems[i].getBoundingClientRect().top;
    }

    navItems[i].dataset.row = row;

  }
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

  //background position style
  const bgPosX = bgSizeX * (elem.dataset.col - 1) / gradSize()[2];
  const bgPosY = bgSizeY * (elem.dataset.row - 1) / gradSize()[3];

  elem.style.backgroundPosition = `${-bgPosX}px ${-bgPosY}px`;

};

//setting gradient styles to every item
navItems.forEach(elem => {

  colRow();

  setGrad(elem);

});