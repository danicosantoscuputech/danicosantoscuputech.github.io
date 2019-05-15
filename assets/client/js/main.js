$(document).ready(function() {
  $("#btn-menu").click(function() {
    $(".nav-list li").toggle("slow");
    $(this).toggleClass("change");
  });
  let $items = $(".crsl-item");
  let slideIndex = 0;
  let autoSlide;
  const showSlides = () => {
    for (let i = 0; i < $items.length; i++) {
      $($items[i])
        .fadeOut(2000)
        .css("position", "absolute");
    }
    slideIndex++;
    if (slideIndex > $items.length) {
      slideIndex = 1;
    }
    $($items[slideIndex - 1]).fadeIn(2000);
    autoSlide = setTimeout(showSlides, 5000);
  };
  showSlides();
  $("#carousel .next").click(function() {
    for (let i = 0; i < $items.length; i++) {
      $($items[i])
        .fadeOut(2000)
        .css("position", "absolute");
    }
    slideIndex++;
    if (slideIndex > $items.length) {
      slideIndex = 1;
    }
    $($items[slideIndex - 1]).fadeIn(2000);
  });
  $("#carousel .prev").click(function() {
    for (let i = 0; i < $items.length; i++) {
      $($items[i])
        .fadeOut(2000)
        .css("position", "absolute");
    }
    slideIndex--;
    if (slideIndex < 1) {
      slideIndex = $items.length;
    }
    $($items[slideIndex - 1]).fadeIn(2000);
  });
  $("#banner").hover(
    function() {
      clearInterval(autoSlide);
    },
    function() {
      autoSlide = setTimeout(showSlides, 5000);
    }
  );
});
