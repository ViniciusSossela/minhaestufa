
jQuery(document).ready(function ($) {

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  new WOW().init();

  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

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

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
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

  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
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
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  $('#playstore_button').click(function () {
    alert("O applicativo para Android esta quase pronto! Em breve você podera instalar no seu celular e fazer a gestão de forma fácil e ágil.");
    gtag('event', 'download_app_click', {
      'event_category': 'store',
      'event_label': 'play_store',
      'value': 1
    });
  });

  $('#appstore_button').click(function () {
    alert("O applicativo para iOS esta quase pronto! Em breve você podera instalar no seu celular e fazer a gestão de forma fácil e ágil.");
    gtag('event', 'download_app_click', {
      'event_category': 'store',
      'event_label': 'app_store',
      'value': 0
    });
  });

  $('#home_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'pagina_inicial'
    });
  });
  $('#about_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'sobre_nos'
    });
  });
  $('#feature_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'funcionalidades'
    });
  });
  $('#team_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'equipe'
    });
  });
  $('#gallery_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'galeria'
    });
  });
  $('#price_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'preco'
    });
  });
  $('#install_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'instale_agora'
    });
  });
  $('#contact_link').click(function () {
    gtag('event', 'page_click', {
      'event_category': 'top',
      'event_label': 'contato'
    });
  });


  $('form.contactForm').submit(function () {
    event.preventDefault();
    
    var formSubmit = document.getElementById('contact_form')
    if (formSubmit.checkValidity()) {
      var form = new GoogleForm('https://docs.google.com/forms/d/e/1FAIpQLSe-eIv2B5Bw5pV7LhFdmUPlnFVbaN1zgMYYw0OApF7DBwhlBA/viewform?usp=sf_link')

      var data = {
        'entry.1884265043': $('#name').val(),
        'entry.1417095760': $('#email').val(),
        'entry.281901209': $('#subject').val(),
        'entry.513669972': $('textarea[name="message"]').val()
      }
      form.setAllFields(data)

      form.send(true)

      alert('Obrigado! Seu contato foi realizado com sucesso.');
    } else
      alert('Por favor preencha os dados corretamente.');

  })

});
