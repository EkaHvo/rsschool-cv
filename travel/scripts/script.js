document.addEventListener("DOMContentLoaded", ()=>{

  const dotsArr = document.querySelectorAll('.dot');
  const slider = document.querySelector('.slider');
  const slides = slider.querySelector('.slides');
  const slidesArr = slides.querySelectorAll('.slide');
  const slide = slides.querySelector('.slide');

  dotsArr.forEach(dot => {
    dot.addEventListener('click', ()=>{
      let id = dot.dataset.slide;

      slideItems(id)
    })
  })

  const nextArrow = slider.querySelector('.next');
  nextArrow.addEventListener('click', ()=>{
    let activeSleder = slider.querySelector('.slide.active');
    let id = +activeSleder.dataset.id + 1;

    id > slidesArr.length ? id = id - slidesArr.length : '';

    slideItems(id)
  })

  const preArrow = slider.querySelector('.pre');
  preArrow.addEventListener('click', ()=>{
    let activeSleder = slider.querySelector('.slide.active');
    let id = +activeSleder.dataset.id - 1;

    id < 1 ? id = slidesArr.length - id  : '';

    slideItems(id)
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
    })
    dotsArr.forEach(dot => {
      dot.classList.remove('active');
    })
  }

  function slideItems(id){
    removeActive();
    moveSlider(id);
    setActive(id);
  }

  slideItems(2)

});