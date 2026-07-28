'use strict';


// =========================
// APPROACH TIMELINE
// =========================

const timeline = document.querySelector(".approach__timeline");

if (timeline) {

  window.addEventListener("scroll", () => {

    const rect = timeline.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    const start = windowHeight * 0.5;

    const end = rect.height;

    let progress = (start - rect.top) / end;

    progress = Math.max(
      0,
      Math.min(progress, 1)
    );

    timeline.style.setProperty(
      "--progress",
      progress
    );

  });

}


// =========================
// FIRST VIEW
// =========================

const fvSlider = document.querySelector(".fv-slider");

if (fvSlider) {

  $('.fv-slider').slick({
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    speed: 1000,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false
  });

}


// =========================
// SHUFFLE
// =========================

const targets = document.querySelectorAll(".shuffle");

targets.forEach((target) => {

  const shuffle = new ShuffleText(target);

  shuffle.duration = 400;

  target.addEventListener("mouseenter", () => {

    if (!shuffle.isRunning) {
      shuffle.start();
    }

  });

});


// =========================
// HEADER
// =========================

const header = document.querySelector(".header");


// =========================
// TOP PAGE HEADER
// =========================

if (fvSlider && header) {

  function updateTopHeader() {

    const fvRect =
      fvSlider.getBoundingClientRect();

    const isInFv =
      fvRect.bottom > 0;

    header.classList.toggle(
      "is-hidden",
      isInFv
    );

  }


  window.addEventListener(
    "scroll",
    updateTopHeader
  );

  window.addEventListener(
    "load",
    updateTopHeader
  );

  updateTopHeader();

}


// =========================
// WORKS
// =========================

const worksVisual = document.querySelector(
  ".works-visual"
);

const workVisualItems = document.querySelectorAll(
  ".works-visual__item"
);

const workDots = document.querySelectorAll(
  ".works-visual__dot"
);

const worksDots = document.querySelector(
  ".works-visual__dots"
);

const backToList = document.querySelector(
  ".back-to-list"
);


if (worksVisual) {


  // =========================
  // WORK STEP
  // =========================

  let currentStep = 0;

  let isWheelLocked = false;

  const maxStep =
    workVisualItems.length * 2 - 1;


  // =========================
  // WHEEL
  // =========================

  window.addEventListener(
    "wheel",
    (e) => {

      const worksRect =
        worksVisual.getBoundingClientRect();

      const isInWorks =
        worksRect.top <= 0 &&
        worksRect.bottom >= window.innerHeight;


      if (!isInWorks) {
        return;
      }


      // 最初・最後では通常スクロール

      if (
        (currentStep === 0 && e.deltaY < 0) ||
        (currentStep === maxStep && e.deltaY > 0)
      ) {
        return;
      }


      e.preventDefault();


      if (isWheelLocked) {
        return;
      }


      isWheelLocked = true;


      // STEP CHANGE

      if (e.deltaY > 0) {

        currentStep = Math.min(
          currentStep + 1,
          maxStep
        );

      } else {

        currentStep = Math.max(
          currentStep - 1,
          0
        );

      }


      updateWorks();


      setTimeout(() => {

        isWheelLocked = false;

      }, 700);

    },
    {
      passive: false
    }
  );


  // =========================
  // UPDATE WORKS
  // =========================

  function updateWorks() {

    const workIndex =
      Math.floor(currentStep / 2);

    const isOverlay =
      currentStep % 2 === 1;


    // TEXT / OVERLAY

    workVisualItems.forEach((item, index) => {

      item.classList.toggle(
        "is-active",
        index === workIndex && isOverlay
      );

    });


    // SCROLL TO WORK

    const targetItem =
      workVisualItems[workIndex];

    targetItem.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    // CURRENT DOT

    workDots.forEach((dot, index) => {

      dot.classList.toggle(
        "is-active",
        index === workIndex
      );

    });

  }


  // =========================
  // DOT CLICK
  // =========================

  workDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      currentStep = index * 2;

      updateWorks();

    });

  });


  // =========================
  // WORKS PAGE UI
  // =========================

  function updateWorksPageUI() {

    const worksRect =
      worksVisual.getBoundingClientRect();


    const isInWorks =
      worksRect.top <= 0 &&
      worksRect.bottom >= window.innerHeight;


    const isWorksVisible =
      worksRect.top < window.innerHeight &&
      worksRect.bottom > 0;


    // HEADER

    if (header) {

      header.classList.toggle(
        "is-hidden",
        isInWorks
      );

    }


    // BACK TO WORKS

    if (backToList) {

      backToList.classList.toggle(
        "is-visible",
        isInWorks
      );

    }


    // DOTS

    if (worksDots) {

      worksDots.classList.toggle(
        "is-visible",
        isWorksVisible
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateWorksPageUI
  );

  updateWorksPageUI();

}


// Selectedworks　スライダー

function sliderSetting() {
  if ($(window).width() <= 1024) {

    if (!$('.autoplay').hasClass('slick-initialized')) {
      $('.autoplay').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,

        responsive: [
          {
            breakpoint: 720,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }

  } else {

    if ($('.autoplay').hasClass('slick-initialized')) {
      $('.autoplay').slick('unslick');
    }

  }
}

sliderSetting();

$(window).on('resize', sliderSetting);


// ハンバーガー
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const hamburgerList = document.querySelector(".hamburger__list");

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("is-active");
    hamburgerList.classList.toggle("panelactive");
  });

  document.querySelectorAll(".hamburger__item a").forEach(link => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("is-active");
      hamburgerList.classList.remove("panelactive");
    });
  });
});


$('.autoplay-pc').slick({
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 6000,
  speed: 2500,
  fade: true,
  cssEase: 'linear',
  pauseOnHover: false,
  pauseOnFocus: false
});

// $('.autoplay-sp').slick({
//   arrows: false,
//   dots: false,
//   infinite: true,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   speed: 800,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   pauseOnHover: false,
//   pauseOnFocus: false
// });