document.addEventListener("DOMContentLoaded", ()=>{

  // burger
  const body = document.querySelector('body');
  const menu = document.querySelector('.nav');
  const burger = document.querySelector('.burger');
  const close = document.querySelector('.close');

  burger.addEventListener('click', () => {
    showMenu();
  });

  close.addEventListener('click', () => {
    hideMenu();
  });

  menu.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      hideMenu();
    });
  });

  function showMenu(){
    menu.classList.add('active');
    body.classList.add('lock');
  }
  function hideMenu(){
    menu.classList.remove('active');
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
    100/100
    1. Вёрстка валидная +10
    2. Вёрстка семантическая +20
        В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):
        <header>, <main>, <footer> +3
        четыре элемента <section> (по количеству секций) +3
        только один заголовок <h1> +3
        три заголовка <h2> (количество секций минус одна, у которой заголовок <h1>) +3
        один элемент <nav> (панель навигации) +3
        два списка ul > li > a (панель навигации, ссылки на соцсети) +3
        четыре кнопки <button> +2
    3. Вёрстка соответствует макету +48
        блок <header> +6
        секция preview +9
        секция steps +9
        секция destinations +9
        секция stories +9
        блок <footer> +6
    4. Требования к css + 12
        для построения сетки используются флексы или гриды +2
        при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
        фоновый цвет тянется на всю ширину страницы +2
        иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2
        изображения добавлены в формате .jpg +2
        есть favicon +2
    5. Интерактивность, реализуемая через css +20
        плавная прокрутка по якорям +5
        ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5
        интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта.  +5
        обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5
    `
  );

});