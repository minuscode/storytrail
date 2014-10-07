$(document).ready(function(){
  // Video Modal
  var url = $('.video-container iframe').attr('src');

  $('.video-link').on( 'click', function(e) {
    e.preventDefault();

    var url = $('.video-container iframe').attr('src');
    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set height and width to mask to fill up the whole screen
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    
    //transition effect        
    $('#mask').fadeIn(100);    
    $('#mask').fadeTo(600, 0.8);    

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();
          
    //Set the popup window to center
    $('.video-container').css('top',  winH/2 - $('.video-container').height()/2);
    $('.video-container').css('left', winW/2 - $('.video-container').width()/2);

    //transition effect
    $('.video-container').fadeIn(600, function() {
      $('#video').get(0).play(); // play after the fade is complete
    }); 
  
  });

  //if close button is clicked
  $('.close').click(function (e) {
    e.preventDefault();
    $('#mask, .video-container').fadeOut( 600, function() {

      $('#video').get(0).pause();
      
      /* If video is from youtube use this code
      $('.video-container iframe').attr('src', '');
      $('.video-container iframe').attr('src', url);
      */
    });
  });        
  
  //if mask is clicked
  $('#mask').click(function () {
    $(this).fadeOut(600);
    $('.video-container').fadeOut( 600, function() {
      
      $('#video').get(0).pause();

      /* If video is from youtube use this code
      $('.video-container iframe').attr('src', '');
      $('.video-container iframe').attr('src', url);
      */
    });
  }); 

  // White Mask
  $('.js-modal').on('click', function(e) {
    e.preventDefault();
    $('#white-mask').fadeIn();
  });

  $('.back-btn').on('click', function(e) {
    e.preventDefault();
    $('#white-mask').fadeOut();
  });

  // Slide down button
  $('.slide-down').on( 'click', function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $('.info-container').offset().top
    }, 1000);
  });

  // Auto scroll 
  var slide;

  function autoScroll() {
    var height = $(window).height();
    var isSliderRunning = false;

    $(window).scroll(function() {
      clearTimeout( $.data( this, 'scrollCheck' ) );
      $.data( this, 'scrollCheck', setTimeout(function() {
        if($(window).scrollTop() >= height/2 && $(window).scrollTop() < height ) {
          $('body, html').animate({
            scrollTop: height
          }, 500);
        } else if($(window).scrollTop() < height/2) {
          $('body, html').animate({
            scrollTop: 0
          }, 500);
        }
      }, 500) );

      if($(window).scrollTop() >= height) {
        if(!isSliderRunning) {
          clearInterval(slide);
          slide = setInterval(slideForward, 7000);
          isSliderRunning = true;
        }
      }
    });
  }

  // Auto Slider Carousel
  function slideForward() {
    $('.content-list .active').animate({'left': '-100%' }, 200, function () {
      $(this).removeClass('active');

      var $size = $('.content-list li').length - 1;

      var $elem = $(this).index() == $size ? $('.content-list li:first-child') : $(this).next();
      $elem.addClass('active').animate({'left': '0px' }, 200);
      var $nextelem = $elem.index() == $size ? $('.content-list li:first-child') : $elem.next();
      $nextelem.css('left', '100%');
    });

    // Phone section
    var $size = $('.phone-list li').length - 1;
    var $elem = $('.phone-list .active').index() == $size ? $('.phone-list li:first-child') : $('.phone-list .active').next();
    var $nextelem = $elem.index() == $size ? $('.phone-list li:first-child') : $elem.next();
    
    $('.phone-list .active').animate({'left': '-100%' }, 200, function () {
      $(this).removeClass('active');
      $elem.animate({'left': '0px' }, 200).addClass('active');
    });
    $nextelem.css('left', '100%');

    $('.slider-nav a').removeClass('active');
    var $navLink = $('.slider-nav li')[$elem.index()];
    $('a', $navLink).addClass('active');
  }

  function slideBack() {
    $('.content-list .active').animate({'left': '100%' }, 200, function () {
      $(this).removeClass('active');

      var $size = $('.content-list li').length - 1;

      var $elem = $(this).index() == 0 ? $('.content-list li:last-of-type') : $(this).prev();
      $elem.addClass('active').animate({'left': '0px' }, 200);
      var $nextelem = $elem.index() == 0 ? $('.content-list li:last-of-type') : $elem.prev();
      $nextelem.css('left', '-100%');
    });

    // Phone section
    var $size = $('.phone-list li').length - 1;
    var $elem = $('.phone-list .active').index() == 0 ? $('.phone-list li:last-of-type') : $('.phone-list .active').prev();
    var $nextelem = $elem.index() == 0 ? $('.phone-list li:last-of-type') : $elem.prev();
    
    $('.phone-list .active').animate({'left': '100%' }, 200, function () {
      $(this).removeClass('active');
      $elem.animate({'left': '0px' }, 200).addClass('active');
    });
    $nextelem.css('left', '-100%');

    $('.slider-nav a').removeClass('active');
    var $navLink = $('.slider-nav li')[$elem.index()];
    $('a', $navLink).addClass('active');
  }

  // Change slides
  $('.nav-arrow').on( 'click', function(e) {
    var link = $(this);
    e.preventDefault();
    clearInterval(slide);

    if($(this).hasClass('next')) {
      slideForward();
      slide = setInterval(slideForward, 7000);
    } else {
      slideBack()
      slide = setInterval(slideForward, 7000);
    }
  });

  $('.slider-nav a').on('click', function(e) {
    e.preventDefault();
    clearInterval(slide);
    var width = $('.content-list li').width();
    var linkIndex = $(this).parent().index();
    var slideIndex = $('.content-list .active').index();

    if(linkIndex > slideIndex) {
      if ((linkIndex-slideIndex) == 2) {
        $('.content-list .active, .phone-list .active').animate({'left': -width }, 200, function () {
          $(this).removeClass('active');
          $('.content-list li:last-of-type, .phone-list li:last-of-type').css('left', width);
          $(this).next().animate({'left': -width }, 200, function () {
            $(this).prev().css('left', width);
            $('.content-list li:last-of-type, .phone-list li:last-of-type').addClass('active').animate({'left': 0 });
          });

          $('.slider-nav a').removeClass('active');
          $('.slider-nav li:last-of-type a').addClass('active');
        });
        slide = setInterval(slideForward, 7000);
      } else {
        slideForward();
        slide = setInterval(slideForward, 7000);
      }

    } else if (linkIndex < slideIndex) {
      if ((slideIndex-linkIndex) == 2) {
        $('.content-list .active, .phone-list .active').animate({'left': width }, 200, function () {
          $(this).removeClass('active');
          $('.content-list li:first-of-type, .phone-list li:first-of-type').css('left', -width);
          $(this).prev().animate({'left': width }, 200, function () {
            $(this).next().css('left', width);
            $('.content-list li:first-of-type, .phone-list li:first-of-type').addClass('active').animate({'left': 0 });
          });

          $('.slider-nav a').removeClass('active');
          $('.slider-nav li:first-of-type a').addClass('active');
        });
        slide = setInterval(slideForward, 7000);
      } else {
        slideBack()
        slide = setInterval(slideForward, 7000);
      }
    }

  });


  // Javascript Media queries
  enquire.register("screen and (min-width:769px)", {

    deferSetup : true,
    setup : function() {
    },
    match : function() {
      autoScroll();
    },
    unmatch : function() {
    }  
  });

  enquire.register("screen and (max-width:480px)", {

    deferSetup : true,
    setup : function() {
    },
    match : function() {
      clearInterval(slide);
      slide = setInterval(slideForward, 7000);
      $('.info-slider').swipe({
        allowPageScroll:"vertical",
        swipe:function(event, direction) {
          clearInterval(slide);
          if(direction == 'left') {
            slideForward();
            slide = setInterval(slideForward, 7000);
          } else if(direction == 'right'){
            slideBack();
            slide = setInterval(slideForward, 7000);
          } else if(direction == 'up'){
            $(window).scroll();
          } else {
          }
        }
      });
    } 
  });

});