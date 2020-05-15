const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel_button-right");
const prevButton = document.querySelector(".carousel_button-left");
const dotsNav = document.querySelector(".carousel_nav");
const currentSlide = track.querySelector(".current-slide");
const dots = Array.from(dotsNav.children);
//Index number for last slide / first slide

const firstSlide = track.firstElementChild;
const lastSlide = track.lastElementChild;

console.log(firstSlide);
console.log(currentSlide);
console.log(lastSlide);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

//set movement position
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

//when i click left, move slides to the left
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const lastDot = dotsNav.lastElementChild;
  const firstSlide = track.firstElementChild;
  const lastSlide = track.lastElementChild;

  if (currentSlide == firstSlide) {
    moveToSlide(track, currentSlide, lastSlide);
    updateDots(currentDot, lastDot);
  } else {
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  }
});

// when i click right, move slides to the right
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const firstDot = dotsNav.firstElementChild;
  const firstSlide = track.firstElementChild;
  const lastSlide = track.lastElementChild;

  if (currentSlide == lastSlide) {
    moveToSlide(track, currentSlide, firstSlide);
    updateDots(currentDot, firstDot);
  } else {
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  }
});

//when i click the nav indicator, move to that slide

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});
