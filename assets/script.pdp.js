var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 3,
    // loop: true,
    direction: "vertical",
  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    effect: "cube",
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    // loop: true,  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });