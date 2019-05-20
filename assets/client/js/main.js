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
  $("#banner-pilates").hover(
    function() {
      clearInterval(autoSlide);
    },
    function() {
      autoSlide = setTimeout(showSlides, 5000);
    }
  );
  let $glryItems = $(".glry-item");
  let $thumbs = $(".thumb-item");
  $($thumbs[0]).css("opacity", 1);
  let galleryIndex = 1;
  $($glryItems[0]).show();
  $("#gallery .next").click(function() {
    for (let i = 0; i < $glryItems.length; i++) {
      $($glryItems[i])
        .fadeOut(2000)
        .css("position", "absolute");
        $($thumbs[i]).css("opacity", 0.4);
    }
    galleryIndex++;
    if (galleryIndex > $glryItems.length) {
      galleryIndex = 1;
    }
    let $src = $($glryItems[galleryIndex - 1]).children("img").attr("src");
    $($glryItems[galleryIndex - 1]).fadeIn(2000, function() {
      $(".blur img").attr("src", $src); 
    });
    $($thumbs[galleryIndex - 1]).css("opacity", 1);
  });
  $("#gallery .prev").click(function() {
    for (let i = 0; i < $glryItems.length; i++) {
      $($glryItems[i])
        .fadeOut(2000)
        .css("position", "absolute");
        $($thumbs[i]).css("opacity", 0.4);
    }
    galleryIndex--;
    if (galleryIndex < 1) {
      galleryIndex = $glryItems.length;
    }
    let $src = $($glryItems[galleryIndex - 1]).children("img").attr("src");
    $($glryItems[galleryIndex - 1]).fadeIn(2000, function() {
      $(".blur img").attr("src", $src); 
    });  
    
    
    $($thumbs[galleryIndex - 1]).css("opacity", 1); 
  });
});
