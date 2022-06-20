document.addEventListener("DOMContentLoaded", ()=>{

  // burger
  const body = document.querySelector('body');
  const menu = document.querySelector('.nav');
  const burger = body.querySelector('.burger');
  const overlay = body.querySelector('.overlay');
  const close = menu.querySelector('.close');

  burger.addEventListener('click', () => {
    showMenu();
  });

  close.addEventListener('click', () => {
    hideMenu();
  });

  overlay.addEventListener('click', () => {
    hideMenu();
  });

  menu.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      hideMenu();
    });
  });

  function showMenu(){
    menu.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('lock');
  }
  
  function hideMenu(){
    menu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('lock');
  }

  // smooth scroll

  const anchors = document.querySelectorAll('a.nav-link[href*="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substring(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

    });
  });


  // slider

  const dotsArr = document.querySelectorAll('.dot');
  const slider = document.querySelector('.slider');
  const slides = slider.querySelector('.slides');
  const slidesArr = slides.querySelectorAll('.slide');
  const slide = slides.querySelector('.slide');

  dotsArr.forEach(dot => {
    dot.addEventListener('click', ()=>{
      let id = dot.dataset.slide;

      slideItems(id);
    })
  })

  const nextArrow = slider.querySelector('.next');
  nextArrow.addEventListener('click', ()=>{
    let activeSleder = slider.querySelector('.slide.active');
    let id = +activeSleder.dataset.id + 1;

    id > slidesArr.length ? id = id - slidesArr.length : '';

    slideItems(id);
  })

  const preArrow = slider.querySelector('.pre');
  preArrow.addEventListener('click', ()=>{
    let activeSleder = slider.querySelector('.slide.active');
    let id = +activeSleder.dataset.id - 1;

    id < 1 ? id = slidesArr.length - id  : '';

    slideItems(id);
  })

  function moveSlider(id){
    const gapPX = getComputedStyle(slides).gap;
    const slideWidthPX = getComputedStyle(slide).width;

    const gap = +(gapPX.slice(0, gapPX.length-2));
    const slideWidth = +(slideWidthPX.slice(0, slideWidthPX.length-2));

    const centerScreen = window.screen.width/2;
    const halfSlide = slideWidth/2;
    const wholeSlide = gap + slideWidth;

    const translation = centerScreen - (wholeSlide*(id-1) + halfSlide);

    slides.style.transform = `translateX(${translation}px)`;
  }

  function setActive(id){
    let activeDot = slider.querySelector(`.dot[data-slide="${id}"]`);
    activeDot.classList.add('active');
    let activeSlide = slider.querySelector(`.slide[data-id="${id}"]`);
    activeSlide.classList.add('active');
  }

  function removeActive(){
    slidesArr.forEach(slide => {
      slide.classList.remove('active');
    });
    dotsArr.forEach(dot => {
      dot.classList.remove('active');
    });
  }

  function slideItems(id){
    removeActive();
    moveSlider(id);
    setActive(id);
  }

  slideItems(2);

  console.log(
    `
    1. Вёрстка соответствует макету. Ширина экрана 390px +48
    блок <header> +6
    секция preview +9
    секция steps +9
    секция destinations +9
    секция stories +9
    блок <footer> +6
    2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
    нет полосы прокрутки при ширине страницы от 1440рх до 390px +7
    нет полосы прокрутки при ширине страницы от 390px до 320рх +8
    3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22
    при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2
    при нажатии на бургер-иконку плавно появляется адаптивное меню +4
    адаптивное меню соответствует макету +4
    при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
    ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)
    при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4
    `
  );

});