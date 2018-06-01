// 'use strict';

// import GoogleForm from 'google-form-send'
// var GoogleForm = require('google-form-send')


// var form = new GoogleForm('https://docs.google.com/forms/d/e/1FAIpQLSc1HRkXFZziTANZSuMqh8RRCiDU8U1ESJvdnu0qJSBaZr1bFA')

jQuery(document).ready(function($) {

  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery - uses the magnific popup jQuery plugin
  $('.gallery-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  // var GoogleForm = function (link) {
  //   var findViewform = link.lastIndexOf('viewform')
  //   if (~findViewform)
  //     link = link.slice(0, findViewform - 1)
  //   this.link = link + '/formResponse?ifq'
  //   this.data = {}
  // }
  
  // GoogleForm.prototype.addField = function (name, data) {
  //   data = data || ''
  
  //   var field = {}
  //   field[name] = data
  //   Object.assign(this.data, field)
  // }
  
  // GoogleForm.prototype.setAllFields = function (data) {
  //   this.data = data
  // }
  
  // GoogleForm.prototype.send = function (isAsyn) {
  //   isAsyn = isAsyn || false
  
  //   var XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest
  //   var xhr = new XHR()
  //   var data = ''
  //   for (var name in this.data) {
  //     data += '&' + name + '=' + encodeURIComponent(this.data[name] || '')
  //   }
  
  //   var sendDataGoogle = this.link + data + '&submit=Submit'
  //   console.log(sendDataGoogle)
    
  //   xhr.open('GET', sendDataGoogle, isAsyn)
    
  //   xhr.send()
  // }

  
  $('form.contactForm').submit(function() {
    event.preventDefault();
    
    // form.addField('nome', 'pindaiba');
    // form.send()

    var form = new GoogleForm('https://docs.google.com/forms/d/e/1FAIpQLSc1HRkXFZziTANZSuMqh8RRCiDU8U1ESJvdnu0qJSBaZr1bFA')
    // var form = new GoogleForm('https://docs.google.com/forms/d/e/1FAIpQLSc1HRkXFZziTANZSuMqh8RRCiDU8U1ESJvdnu0qJSBaZr1bFA/viewform?embedded=true')
                               
    console.log(form.link)

    var data = {
      'entry.1525904630': 'text 1'
    }
    form.setAllFields(data)

    // form.setField('entry.3', 'text 3')
    // form.setField('entry.4', 'text 4')

    console.log(form.data)

    form.send(true)

    alert('submit');
  })


  // custom code

});
