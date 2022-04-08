var version='4.12.0';

var arrTemplate = [
	'header-siti',
	'header-app',
	'header-app-sm',
	'menu-top-siti',
	'menu-top-app',
	'menu-top-app-sm',
	'menu-left-dark',
	'menu-left-light',
	'footer-siti',
	'footer-app',
	'footer-app-sm'
];

var arrSnippet = [
	'accordion',
	'accordion-reverse',
	'badge',
	'bottoni',
	'button-group',
	'breadcrumb',
	'calendar',
	'captcha',
	'card',
	'card-horizontal',
	'card-icon-bg',
	'card-image',
	'card-simple',
	'card-vertical',
	'carousel',
	'chips',
	'collapsible',
	'collapsible-reverse',
	'cookiebar',
	'datepicker',
	'entrypoint',
	'error',
	'form',
	'icone',
	'immagini-multi',
	'immagini',
	'input',
	'input-classic',
	'form-dimensioni',
	'input-group',
	'layout-menu',
	'layout',
	'link',
	'liste',
	'list-group',
	'login',
	'main',
	'main-section',
	'mediaquery',
	'messaggi',
	'messaggi-multipli',
	'modal',
	'notifiche',
	'page',
	'paginazione',
	'progress-bar',
	'progress-indicator',
	'rating',
	'scroll-top',
	'slider',
	'spinner',
	'tabelle',
	'tabs',
	'tabs-reverse',
	'tabs-vertical',
	'testo',
	'timeline',
	'titoli',
	'tree-view',
	'tree-view-form',
	'validazione',
	'video',
	'wizard'
];

$(document).ready(function() {
	
	// Skip link
	$('html:not(#full-page) > body').prepend(
		'<a href="#menu-top" class="sr-only sr-only-focusable m-2">Vai al menu principale</a>'+
		'<a href="#main" class="sr-only sr-only-focusable m-2">Vai al contenuto principale</a>'
	);

	// Includes
	$('body > header').load('resources/html/includes/header.html?v='+version);
	$('body > footer').load('resources/html/includes/footer.html?v='+version);
	$('body > nav').load('resources/html/includes/menu-top.html?v='+version, function() {
		$('#menu-top > ul > li').each(function() {
			if (window.location.pathname.indexOf($(this).data('active')) >= 0) {
		    	$(this).children('.nav-link').addClass('active');
			}
		});
		$('#menu-top .dropdown-menu > li').each(function() {
			if (window.location.pathname.indexOf($(this).data('active')) >= 0) {
		    	$(this).children('.dropdown-item').addClass('active');
			}
		});
	});
	$('#menu-componenti').load('resources/html/includes/menu-componenti.html?v='+version, function() {
		$('#menu-left > li').each(function() {
			if (window.location.pathname.indexOf($(this).data('active')) >= 0) {
		    	$(this).children('.nav-link').addClass('active');
		    	$(this).children('.navbar-nav').collapse('show');
			}
		});
	});
	
	// Template
	$.each(arrTemplate, function(key, value) {
		var tplTesto = '#tpl-'+value;
		$.get('resources/html/snippets/'+value+'.html?v='+version, function(data) {
			//if (value == 'menu-top-siti') alert('menu-top-siti');
			$(tplTesto).replaceWith(data);
			if (value == 'menu-top-siti') { 
				//alert('funzioni menu-top-siti');
			$('#menu-top > ul > li').each(function() {
				//alert('ciao');
				if (window.location.pathname.indexOf($(this).data('active')) >= 0) {
					$(this).children('.nav-link').addClass('active');
				}
			});
		}
		});

		$('#menu-top > ul > li').each(function() {
			if (window.location.pathname.indexOf($(this).data('active')) >= 0) {
		    	$(this).children('.nav-link').addClass('active');
			}
		});
		$('#menu-top .dropdown-menu > li').each(function() {
			if (window.location.pathname.indexOf($(this).data('active')) >= 0) {
		    	$(this).children('.dropdown-item').addClass('active');
			}
		});

		var snpTesto = '#snp-'+value;
		$(snpTesto).load('resources/html/snippets/'+value+'.html?v='+version);
	});

	// Snippet
	$.each(arrSnippet, function(key, value) {
		var snpTesto = '#snp-'+value;
		$(snpTesto).load('resources/html/snippets/'+value+'.html?v='+version);
	});
	
	// Prevent link example
	$('a[href=""]').click(function(e) {
		e.preventDefault();
	});
});

$(document).ajaxStop(function() {

	selectTheme(sessionStorage.getItem('uikit_theme'));
	$('body').removeAttr('hidden');

	// Configurazione Calendar
	if ($('.calendar').length) {
		$('#example-calendar').datepicker({
			daysOfWeekDisabled: [0,1,2,3,4,5,6],
			daysOfWeekHighlighted: [0,6],
			language: 'it',
			maxViewMode: 2,
			templates: {
				leftArrow: '<i class="fas fa-chevron-left" title="Mese precedente"></i>',
				rightArrow: '<i class="fas fa-chevron-right" title="Mese successivo"></i>'
			},
			todayHighlight: true
		}).on('changeMonth', function(e) {
	    	myCalendar = e.date;
			setTimeout(function() {
	    		setCalendarContent();
	    	}, 100);
		});
		setCalendarContent();
	}
	
	// Configurazione Modal con spinner
	$('[data-target="#example-modal-spinner"]').click(function() {
		setTimeout(function() {
        	$('#example-modal-spinner').modal('hide');
        }, 2500);
	});
	
	// Configurazione Scroll to top
	var scrollTopBtn = $('#scroll-top-btn');
	$(window).scroll(function() {
		if ($(window).scrollTop() > 5000) {
			scrollTopBtn.addClass('d-block');
		} else {
			scrollTopBtn.removeClass('d-block');
		}
	});
	scrollTopBtn.click(function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	
	// Configurazione input File
	$('.custom-file-input').change(function() {
		var fn = $(this)[0].files[0].name;
		$(this).next('.custom-file-label').html(fn);
	});

	// Configurazione input Range
	$('#range-value').html($('#input-range').val());
	$('#input-range').change(function() {
		$('#range-value').html($(this).val());
	});

	// Configurazione input Password
	$('.btn-show-hide').click(function() {
		var e = $(this).parent().prev('.form-control');
		if ($(this).children('.fas').hasClass('fa-eye')) {
			e.attr('type','text');
			e.attr('autocomplete','off');
			$(this).children('.fas').removeClass('fa-eye').addClass('fa-eye-slash');
			$(this).prop('title', 'Nascondi password');
		} else {
			e.attr('type','password');
			e.removeAttr('autocomplete');
			$(this).children('.fas').removeClass('fa-eye-slash').addClass('fa-eye');
			$(this).prop('title', 'Mostra password');
		}
	});

	// Configurazione Popover (Input con Help)
	$('[data-toggle="popover"]').popover({
		container: 'body',
		placement: 'auto',
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
		trigger: 'hover click'
	});

	// Configurazione Datepicker
	if ($('.input-group.date').length) {
		$('.input-group.date').datepicker({
			autoclose: true,
			daysOfWeekHighlighted: [0,6],
			enableOnReadonly: false,
			forceParse: false,
			format: 'dd/mm/yyyy',
			keyboardNavigation: false,
			language: 'it',
			maxViewMode: 2,
			orientation: 'auto right',
			showOnFocus: false,
			templates: {
				leftArrow: '<i class="fas fa-chevron-left"></i>',
				rightArrow: '<i class="fas fa-chevron-right"></i>'
			},
			todayHighlight: true
		});
	}

	// Configurazione Chips
	$('.btn.chip').click(function() {
		$(this).toggleClass('chip-active');
	});

	// Configurazione Rating
	$('.rating-progress input[type=radio]').change(function() {
		$(this).parent().prevAll().children('.far').addClass('font-weight-bold');
		$(this).parent().nextAll().children('.far').removeClass('font-weight-bold');
	});

	// Configurazione Carousel
	$('#carousel-pause').click(function() {
		$('#custom-carousel').carousel('pause');
	});
	$('#carousel-play').click(function() {
		$('#custom-carousel').carousel('cycle');
	});
	$('#custom-carousel li[data-slide-to]').keypress(function() {
		$('#custom-carousel').carousel($(this).data('slide-to'));
	});

	// highlight.js e clipboard.js
	$('xmp').each(function() {
		var data = $(this).html().toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
		$(this).replaceWith('<code>'+data+'</code>');
	});

	if ($('pre').length) {
		hljs.initHighlighting();
		var clipboard = new ClipboardJS('.btn-copy');

		$('.btn-copy').tooltip({
			title: 'Codice copiato!',
			trigger: 'click'
		});

		clipboard.on('success', function(e) {
			e.clearSelection();
			console.log(e);
			setTimeout(function () {
				$('.btn-copy').tooltip('hide');
			}, 1500);
		});

		clipboard.on('error', function(e) {
			e.clearSelection();
			console.log(e);
			$('.btn-copy').tooltip('hide');
			alert('Premi Ctrl+C per copiare il codice.');
		});
	}
});

function changeTheme(theme) {
	sessionStorage.setItem('uikit_theme', theme);
	sessionStorage.setItem('uikit_color', $('input[name="'+theme+'"]:checked').val());
	selectTheme(theme);
	$('html, body').animate({scrollTop: 0}, 'slow');
}

function selectTheme(theme) {
	$('html:not(#full-page) #page-header').removeClass('section-primary-digito'); //sogei-o
	$('#hero').removeClass('section-primary-digito'); //sogei-o sogei-i
	$('#menu-top .navbar-nav').removeClass('active-reverse'); //ae
	$('#page-header').removeClass('bg-grifone'); //gdf
	$('.section-grey').removeClass('section-grey-pittogrammi'); //act
	switch (theme) {
	case 'sogei-o':
		var color = sessionStorage.getItem('uikit_color');
		$('#agenzia-theme').attr('href', 'resources/css/uikit/sogei-internet-'+color+'.css');
		$('header .logo').attr('src', 'resources/img/Digito_'+color+'_152.png');
		$('footer .logo').attr('src', 'resources/img/Digito_'+color+'_152.png');
		$('#sogei-o-logo > img').attr('src', 'resources/img/Sogei_bianco_'+color+'_304.png');
		$('html:not(#full-page) #page-header').addClass('section-primary-digito');
		$('#hero').addClass('section-primary-digito');
		break;
	case 'ae':
		if (sessionStorage.getItem('uikit_color') === 'riscossione') {
			$('#agenzia-theme').attr('href', 'resources/css/uikit/agenzia-entrate-riscossione.css');
			$('header .logo').attr('src', 'resources/img/ADER_logo_152.png');
			$('footer .logo').attr('src', 'resources/img/ADER_mono_152.png');
			$('#menu-top .navbar-nav').addClass('active-reverse');
		} else {
			$('#agenzia-theme').attr('href', 'resources/css/uikit/agenzia-entrate.css');
			$('header .logo').attr('src', 'resources/img/AE_logo_152.png');
			$('footer .logo').attr('src', 'resources/img/AE_mono_152.png');
		}
		break;
	case 'adm':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/dogane-monopoli.css');
		$('header .logo').attr('src', 'resources/img/ADM_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/ADM_mono_152.png');
		break;
	case 'ad':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/agenzia-demanio.css');
		$('header .logo').attr('src', 'resources/img/AD_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/AD_mono_152.png');
		break;
	case 'gdf':
		var color = sessionStorage.getItem('uikit_color');
		$('#agenzia-theme').attr('href', 'resources/css/uikit/guardia-finanza-'+color+'.css');
		$('header .logo').attr('src', 'resources/img/GdF_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/GdF_logo_152.png');
		$('#page-header').addClass('bg-grifone');
		break;
	case 'mef':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/mef.css');
		$('header .logo').attr('src', 'resources/img/MEF_mono_152.png');
		$('footer .logo').attr('src', 'resources/img/MEF_mono_152.png');
		break;
	case 'rgs':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/rgs.css');
		$('header .logo').attr('src', 'resources/img/RGS_mono_152.png');
		$('footer .logo').attr('src', 'resources/img/RGS_mono_152.png');
		break;
	case 'mattm':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/ministero-ambiente.css');
		$('header .logo').attr('src', 'resources/img/MATTM_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/MATTM_mono_152.png');
		break;
	case 'sts':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/sistema-ts.css');
		$('header .logo').attr('src', 'resources/img/STS_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/STS_mono_152.png');
		break;
	case 'gt':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/giustizia-tributaria.css');
		$('header .logo').attr('src', 'resources/img/GT_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/GT_mono_152.png');
		break;
	case 'lds':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/lotteria-scontrini.css');
		$('header .logo').attr('src', 'resources/img/LDS_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/LDS_mono_152.png');
		break;
	case 'didattico':
		switch (sessionStorage.getItem('uikit_color')) {
		case 'pubblico':
			$('#agenzia-theme').attr('href', 'resources/css/uikit/didattico-pubblico.css');
			$('header .logo').attr('src', 'resources/img/Didattico_sm_bianco_152.png');
			$('footer .logo').attr('src', 'resources/img/Didattico_sm_nero_152.png');
			break;
		case 'docente':
			$('#agenzia-theme').attr('href', 'resources/css/uikit/didattico-docente.css');
			$('header .logo').attr('src', 'resources/img/Didattico_sm_nero_152.png');
			$('footer .logo').attr('src', 'resources/img/Didattico_sm_bianco_152.png');
			break;
		case 'alunno':
			$('#agenzia-theme').attr('href', 'resources/css/uikit/didattico-alunno.css');
			$('header .logo').attr('src', 'resources/img/Didattico_sm_bianco_152.png');
			$('footer .logo').attr('src', 'resources/img/Didattico_sm_bianco_152.png');
			break;
		}
		break;
	case 'act':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/act-intranet.css');
		$('header .logo').attr('src', 'resources/img/ACT_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/ACT_mono_152.png');
		$('.section-grey').addClass('section-grey-pittogrammi');
		break;
	case 'eqg':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/equitalia-giustizia.css');
		$('header .logo').attr('src', 'resources/img/EqG_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/EqG_mono_152.png');
		break;
	case 'pff':
		$('#agenzia-theme').attr('href', 'resources/css/uikit/portale-ff.css');
		$('header .logo').attr('src', 'resources/img/PFF_logo_152.png');
		$('footer .logo').attr('src', 'resources/img/PFF_mono_152.png');
		break;
	case 'it':
		if (sessionStorage.getItem('uikit_color') === 'light') {
			$('#agenzia-theme').attr('href', 'resources/css/uikit/it-light.css');
			$('header .logo').attr('src', 'resources/img/it_logo_152.png');
		} else {
			$('#agenzia-theme').attr('href', 'resources/css/uikit/it.css');
			$('header .logo').attr('src', 'resources/img/it_mono_152.png');
		}
		$('footer .logo').attr('src', 'resources/img/it_mono_152.png');
		break;
	default:
		$('#agenzia-theme').attr('href', 'resources/css/uikit/sogei-intranet.css');
		var colorsH = ['arancio','azzurro','giallo','verde','verdechiaro','viola'];
		var colorH = colorsH[Math.floor(Math.random() * colorsH.length)];
		$('header .logo').attr('src', 'resources/img/Digito_'+colorH+'_152.png');
		var colorsF = ['arancio','azzurro','bianco','giallo','verdechiaro'];
		var colorF = colorsF[Math.floor(Math.random() * colorsF.length)];
		$('footer .logo').attr('src', 'resources/img/Digito_'+colorF+'_152.png');
		$('#sogei-i-logo > img').attr('src', 'resources/img/Sogei_'+colorH+'_304.png');
		$('#full-page header .logo').attr('src', 'resources/img/Digito_giallo_152.png');
		$('#hero').addClass('section-primary-digito');
		break;
	}
}

//Configurazione Calendar
var myCalendar = new Date();

var arrEvents = [{
	date: new Date(Date.UTC(new Date().getFullYear(),new Date().getMonth(),9)),
	title: 'Titolo evento del 9',
	icon: 'fas fa-circle icon-secondary',
	link: ''
},{
	date: new Date(Date.UTC(new Date().getFullYear(),new Date().getMonth(),14)),
	title: 'Titolo evento del 14',
	icon: 'fas fa-star icon-primary',
	link: ''
}];

function setCalendarContent() {
	$('#example-calendar-content').html('<h3>'+$('.datepicker-days .datepicker-switch').text()+'</h3>');
	var monthEmpty = true;
	$.each(arrEvents, function(key, event) {
		var eventDate = $('[data-date="'+event.date.getTime()+'"]');
		if (eventDate.length) {
			eventDate.append('<a href="'+
				event.link+'" class="d-block" tabindex="-1" title="'+
				event.title+'"><i class="'+
				event.icon+' mt-2"></i></a>'
			);
			if (event.date.getMonth() === myCalendar.getMonth()) {
				$('#example-calendar-content').append('<p><i class="'+
					event.icon+' mr-2"></i><strong>'+
					event.date.getDate()+':</strong> <a href="'+
					event.link+'">'+
					event.title+'</a></p>'
				);
				monthEmpty = false;
			}
		}
	});
	if (monthEmpty) {
		$('#example-calendar-content').append('<p>Nessun evento in questo mese.</p>');
	}
}

function changeMonth(month) {
	switch (month) {
	case 'prev':
		myCalendar.setMonth(myCalendar.getMonth()-1);
		break;
	case 'next':
		myCalendar.setMonth(myCalendar.getMonth()+1);
		break;
	}
	$('#example-calendar').datepicker('update', myCalendar);
	setCalendarContent();
}

function confirmDelete() {
	confirm("Sei sicuro di voler eliminare ...?");
}