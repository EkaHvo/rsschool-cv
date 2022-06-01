function burgerMenu() {
  let menu = document.querySelector(".nav-list");
  let links = document.querySelector(".nav-list__item");
  let button = document.querySelector(".burger-button");
  let burger = document.querySelector(".burger");
  // let overlay = menu.find('.burger-menu_overlay');
  
  
  button.addEventListener('click', () => toggleMenu());
  menu.addEventListener('click', () => toggleMenu());
  
  function toggleMenu(){
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  }
}

burgerMenu();