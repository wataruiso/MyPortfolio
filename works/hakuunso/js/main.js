'use strict';
(function() {
  var i = 2;
  setInterval(() => {
    if(i === 4) i = 1;
    $(`.main${i}`).fadeIn(800);
    if(i === 1) {
      $('.main3').fadeOut(800);
    }else {
    $(`.main${i - 1}`).fadeOut(800);
    }
    i++;
  }, 4000);

  $('.snowfall_wrapper').snowfall({
    maxSpeed: 2,
    maxSize: 3,
    round: true,
  });

setTimeout(function() {
  if($(window).width() >= 768) {
    $('.opening_wrapper').css('z-index', '6');
    $('.main_logo').css('opacity', '1');
  }
}, 1000)
setTimeout(function() {
  $('.opening_wrapper').css('z-index', '3');
  $('.snowfall_wrapper').fadeIn(1000);
}, 1500)
setTimeout(function() {
  $('.opening_wrapper').fadeOut(1000);
  $('.main_txt').css('z-index', '4');
  $('.snowfall_wrapper').css('z-index', '3');
}, 4000)
setTimeout(function() {
  $('header').css('transform', 'translateY(0)');
  $('.summer_season').fadeIn(1000, function() {
    $(this).css('transition', '.4s');
  });
  $('.main_txt span').fadeIn(1000);
}, 5000)



$('.hamburger').click(function() {
  $('.collapse').toggleClass('open');
  for(let i = 0; i < 3; i++) {
    $(`.bar${i + 1}`).toggleClass('active');
  }
})

$('.slide_txt').hover(
  function() {
    $(this).siblings('.cover').css('width', '0');
    $(this).css('color', '#c1a250');
  },function() {
    $(this).siblings('.cover').css('width', '100%');
    $(this).css('color', '#fff');
  }
)


$(window).on('scroll', function() {
  var scrollTop = $(this).scrollTop();
  var windowHeight = $(this).height();
  var windowWidth = $(this).width();
  var breakPoint = 768;
  if(scrollTop > windowHeight) {
    $('header').css({
      'position': 'fixed',
      'background-color': 'white',
    });
    $('.before_scroll').css('display', 'none');
    $('.after_scroll').css('display', 'block');
    if(windowWidth >= breakPoint) {
      $('.lang_tel a').css('color', '#626f7f');
      $('.collapse').css('color', '#626f7f');
    }else {
      $('.header_sp_title').css('color', '#626f7f');
    }
  } else {
    $('.collapse').css('color', 'white');
    $('.lang_tel a').css('color', 'white');
    $('header').css({
      'position': 'absolute',
      'background-color': 'transparent',
    });
    $('.header_sp_title').css('color', 'white');
    $('.before_scroll').css('display', 'block');
    $('.after_scroll').css('display', 'none');
  }
  if($('.location').offset().top < scrollTop + (windowHeight * 2 / 3)) {
    $('.white').fadeOut();
  }
  if($('.bnrlinks').offset().top < scrollTop + (windowHeight * 2 / 3)) {
    $('.links_txt').css('top', '0');
    $('.links_txt').css('opacity', '1');
    $('.links_txt').css('transform', 'translateY(0)');
    $('.black_wrapper').css('background', 'rgba(0, 0, 0, 0.5)');

  }

})




$('.more').hover(
  function() {
    $('span', this).css('color', '#c1a250');
    $('img', this).css('right', '-8px');
  },
  function() {
    $('span', this).css('color', '#626f7f');
    $('img', this).css('right', '0');
  }
)

$('.links_txt').hover(
  function() {
    if($(window).width() >= 768) {
      $(this).parent('li').css('background-size', '145%');
    }else {
      $(this).parent('li').css('background-size', '105%');
    }
    $(this).siblings('.black_wrapper').css('background', 'rgba(0, 0, 0, 0)');
  },
  function() {
    if($(window).width() >= 768) {
      $(this).parent('li').css('background-size', '140%');
    }else {
      $(this).parent('li').css('background-size', '100%');
    }
    $(this).siblings('.black_wrapper').css('background', 'rgba(0, 0, 0, 0.5)');
  }
)



})()
