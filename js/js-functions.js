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


  // Slide down button
  $('.slide-down').on( 'click', function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $('.info-container').offset().top - 40
    }, 1000);

  });


  // Slider Carousel
  var width = - $('.slide-content li').width();
  function changeSlide() {
    $('.content-list .active').animate({'left': width }, 300, function () {
      $(this).removeClass('active');

      var $size = $('.content-list li').length - 1;

      var $elem = $(this).index() == $size ? $('.content-list li:first-child') : $(this).next();
      $elem.addClass('active').animate({'left': '0px' });
      var $nextelem = $elem.index() == $size ? $('.content-list li:first-child') : $elem.next();
      $nextelem.css('left', '100%');
    });

    // Phone section
    var $size = $('.phone-list li').length - 1;
    var $elem = $('.phone-list .active').index() == $size ? $('.phone-list li:first-child') : $('.phone-list .active').next();
    var $nextelem = $elem.index() == $size ? $('.phone-list li:first-child') : $elem.next();
    
    $('.phone-list .active').animate({'left': width }, 100, function () {
      $(this).removeClass('active');
    });
    $elem.animate({'left': '0px' }).addClass('active');
    $nextelem.css('left', '100%');

    $('.slider-nav li').removeClass('active');
    var $navLink = $('.slider-nav li')[$elem.index()];
    $($navLink).addClass('active');
  }

  var slide = setInterval(changeSlide, 5000);

  $('.nav-arrow').on( 'click', function(e) {
    var link = $(this);
    e.preventDefault();
    clearInterval(slide);

    if($(this).hasClass('next')) {
      changeSlide();
      slide = setInterval(changeSlide, 5000);
    } else {}
  });

  /*$('.nav-arrow').on( 'click', function(e) {
    e.preventDefault();

    var $link = $(this), 
        $slideContent = $('.slide-content  .js-slide'),
        $slidePhone = $('.image .js-slide');

    $('.slider-nav li').removeClass('active');
    if ($(this).hasClass('next')) {
      // i-Phone slider
      if ($slidePhone.css('left') == '0px') {
        $slidePhone.animate({ left: '-214px' });
        $slideContent.animate({ left: '-399px' }, function() {
          $('.slider-nav li:nth-of-type(2)').addClass('active');
        });
        $('.prev').show();
      } else if ($slidePhone.css('left') == '-214px') {
        $slidePhone.animate({ left: '-427px' });
        $slideContent.animate({ left: '-798px' }, function() {
          $('.slider-nav li:nth-of-type(3)').addClass('active');
        });
        $('.next').hide();
      }

    } else {
      // i-Phone slider
      if ($slidePhone.css('left') == '-427px') {
        $slidePhone.animate({ left: '-210px' });
        $slideContent.animate({ left: '-399px' }, function() {
          $('.slider-nav li:nth-of-type(2)').addClass('active');
        });
        $('.next').show();
      } else if ($slidePhone.css('left') == '-210px') {
        $slidePhone.animate({ left: '0px' });
        $slideContent.animate({ left: '0px' }, function() {
          $('.slider-nav li:nth-of-type(1)').addClass('active');
        });
        $('.prev').hide();
      }

    }
    
  });*/

});