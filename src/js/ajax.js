import $ from 'jquery';
import mask from 'jquery-mask-plugin';

function getTurList (page) {
    //button animate ---------

    if (document.querySelector('.change-filters')){
        document.querySelector('.change-filters').classList.add('change-filters-active');
    }

    //button animate ---------
	var countries = '';
    var types = '';
    var startdate = ''
    var enddate = '';
	if (!page)
		page = 1;
    if($('.js-date').length > 0){
      var startdate = $('.js-date').attr('data-begin');
      var enddate   = $('.js-date').attr('data-end');
    }
	if ( startdate && startdate != '...') {
		startdate = startdate.split('.');
		startdate = startdate[2] + '-' + startdate[1] + '-' + startdate[0];
		startdate = new Date(startdate).getTime() / 1000;
	} else {
		startdate = '';
	}

	if (enddate && enddate != '...') {
		enddate = enddate.split('.');
		enddate = enddate[2] + '-' + enddate[1] + '-' + enddate[0];
		enddate = new Date(enddate).getTime() / 1000;
	} else {
		enddate = '';
	}

	var count  = 0;
    //console.log($('.js-search-country.active'));
	$('.js-filters-row .js-country').each(function () {
		if (count > 0)
			countries += ',' + $(this).attr('data-id');
		else
			countries += $(this).attr('data-id');
		count++;
	})
    if(count == 0)
      countries = $('.js-ajax-addtur').attr('data-tur-counties');
    //console.log(countries);
	count      = 0;
    if($('#tursTypeList').length > 0){
      types = $('#tursTypeList').attr('data-tursType');
    }else{
      $('.js-filters-row .js-type').each(function () {
          if (count > 0)
              types += ',' + $(this).attr('data-id');
          else
              types += $(this).attr('data-id');
          count++;
      });
    }
    if($('.travel .js-filters-row').length > 0){
      var newLoc = location.protocol + '//' + location.host + location.pathname;
      if (countries || types || startdate || enddate)
          newLoc += '?';
      if (countries)
          newLoc += 'country=' + countries + '&';
      if (types)
          newLoc += 'type=' + types + '&';
      if (startdate)
          newLoc += 'startdate=' + startdate + '&';
      if (enddate)
          newLoc += 'enddate=' + enddate + '&';

      history.pushState(null, null, newLoc);
    }
    var perpage = $('.js-ajax-addtur').attr('data-perpage');
    if(!perpage)
      perpage = 12;
	var formData = new FormData();
	formData.append('country', countries);
    formData.append('per_page', perpage);
	formData.append('type_tour', types);
	formData.append('begin_date', startdate);
	formData.append('end_date', enddate);
	formData.append('page', page);
	formData.append('mode', $('.js-switch-sort.travel-row-text-box').attr('data-sort'));
	var url          = '/udata/catalog/get_tur_filter/' + '.json';
	$.ajax({
		url        : url,
		data       : formData,
		processData: false,
		contentType: false,
		type       : 'POST',
		dataType   : 'json',
		success    : function (data) {
            //button animate ---------

            if (document.querySelector('.change-filters')){
                document.querySelector('.change-filters').classList.remove('change-filters-active');
            }

            //button animate ---------
            console.log(data);
            var tur_list = '';
            
			for (var key in data.lines.item) {
				var tur = data.lines.item[key];
                var strimg        = tur['photo_anons_little'];
				//console.log(tur);
                tur_list += '<div class="product-container">';
                tur_list += '<a href="'+tur['link']+'">';
                tur_list += '  <div class="product-container_image">';
                tur_list += '      <img src="'+strimg+'"/>';
                tur_list += '      <p class="product-container_image-price">';
                if(tur['nonStandartDate']['nonstandart'] == 0)
                  tur_list += tur['price'];
                else
                  tur_list += 'от ' + tur['nonStandartDate']["minTurPrice"];
                /*if(tur['currency'] == 'i')
                  tur_list += ' Р';
                else
                  tur_list += ' ' + tur['currency'];*/
                tur_list += '<span class="current-currency">' +tur['currency']+ '</span> ' ;
                tur_list += '      </p>';
                tur_list += '  </div>';
                tur_list += '  <p class="product-container-country">' + tur['countries'] + '</p>';
                tur_list += '  <p class="product-container-sub-text">' + tur['name'] + '</p>';
                if(tur['turroute'])
                  tur_list += '<p class="product-container-sub-text-road">'+tur['turroute']+'</p>';
                if(tur['turdetails'])
                  tur_list += '<p class="product-container-sub-text-road">'+tur['turdetails']+'</p>';

                tur_list += '  <p class="product-container-sub-text-time">' + tur['days'] + ' ' + tur['days_cases'] + ' / ' + tur['nights'] + ' ' + tur['nights_cases'];
                if(tur['turlang'])
                  tur_list += ' '+tur['turlang'];
                tur_list +=       '<br/>';
                if(tur['date_by_request'])
					tur_list += 'Даты по запросу';
				else{
                  tur_list += tur['data_begin'] + ' - ' + tur['data_end'];
                  
                  if(Number(tur['dates']['totalDates']) > 1)
                    tur_list += ' и еще ' + (Number(tur['dates']['totalDates']) - Number(1)) + ' ' + tur['dates']['totalDatestext'] + '</p>';
				};
                tur_list +=    '</p>';
                tur_list += '</a>';
                tur_list += '</div>';
			}

            //tur_list += '</div>';

			if (data.noturtext) {
              if($('.js-no-text-block .product-container-country-case.optional-text').length == 0)
				$('.js-no-text-block').append('<div class="product-container-country-case optional-text"><p>' + data.noturtext + '</p></div>');
			}
			else {
				$('.js-no-text-block .product-container-country-case.optional-text').remove();
			}
            
			if (data.per_page > 1) {
                if($('.js-turblock').length > 0)
                  $('.js-turblock').append(tur_list);
			} else {
				$('.js-turblock').replaceWith(tur_list);
			}

			if ($('.js-ajax-addtur') && data.total < 12){
				$('.js-ajax-addtur').hide();
              }if ($('.js-ajax-addtur') && data.total > 12){
				$('.js-ajax-addtur').attr('data-page', data.per_page);
                $('.js-ajax-addtur').show();
              }
            
          /*
            var cover = $('.cover');

            cover.find('img').cover({
                backgroundPosition: 'center',
                checkWindowResize: true,
                loadHidden: true
            });
          */

		},
		error      : function () {
			console.log("fail.register");
		}
	});
}

function selectNewData($bDate, $eDate){
  var $newDate = $bDate;
  if($eDate)
    $newDate += " - "+ $eDate;
  $('#formTurDate').val($newDate);
  $('.js-reservePopup-data').html($newDate);
}

function checkPriceByAjax($priceId){
  if(!$priceId)
    return false;
  var $url = '/udata/custom/GetDatePrice/' + $priceId + '/.json';
  $.ajax({
    type       : 'POST',
    dataType   : 'json',
    url        : $url,
    processData: false,
    contentType: false,
    async      : false,
    success    : function (data) {
      console.log(data);
        var $headerText = "c <span>" + data.date_begin_let + "</span>";
        if(data.year_begin != data.year_end)
          $headerText += " <span>" + data.year_begin + "</span>";
        $headerText += " по <span>" + data.date_end_let + "</span> <span>" + data.year_end + "</span>";
        $(".tour_content .tour_content-title").html($headerText);
        $(".tour_title .tour_title-row-data").html(data.date_begin_num + " - " + data.date_end_num);
        $(".tour_title .tour_title-row-price span").first().html(data.price);
        $(".tour_content-dates .tour_content-dates-title img").click();
      
        $('#formTurDate').val(data.date_begin_num + " - " + data.date_end_num);
        $('.js-reservePopup-data').html(data.date_begin_num + " - " + data.date_end_num);
    },
    error      : function () {
        console.log("fail.SendRequest");
    }
  });
  
}

function sendrequest () {
	var url      = '/udata/custom/SendRequestAlfa/' + '.json';
	var formData = new FormData($('#requestformalfa')[0]);
	$('input').removeClass('error');
	$.ajax({
		type       : 'POST',
		dataType   : 'json',
		url        : url,
		processData: false,
		contentType: false,
		data       : formData,
		async      : false,
		success    : function (data) {
			switch (data.errorCode) {
				case 0:
					document.location.href = data.link;
					break;
				case 1:
					$('input[name="order"]').val('');
					$('input[name="order"]').attr('placeholder', data.errorMessage);
					$('input[name="order"]').addClass('error');
					break;
				default:
					console.log(data.errorCode);
					console.log(data.errorMessage);
					break;
			}
		},
		error      : function () {
			console.log("fail.SendRequest");
		}
	});
	return false;
}

$('body').on("click", ".js-open-reserveTour", function(){
  
  selectNewData($(this).attr('data-begin'),$(this).attr('data-end'));
  //yaCounter34682760.reachGoal('zabronirovat');
  
})

$('body').on("click", ".tour_content-dates-show-case li", function(){
  $(".tour_content-dates-show-case li").show();
  $(this).hide();
  checkPriceByAjax($(this).val())
})

$('body').on("click", ".js-ajax-addtur", function () {
	//$('.js-ajax-addtur a.link.more--catalog').addClass('loading');
	var page = $('.js-ajax-addtur').attr('data-page');
	setTimeout(
		function(){
			getTurList(1 + Number(page));
			/*setTimeout(
				function(){
					if($('.js-ajax-addtur a.link.more--catalog').hasClass('loading'))
						$('.js-ajax-addtur a.link.more--catalog').removeClass('loading');
				}, 2000);*/
		}
		,
		300);
});

/*смена валюты на сайте*/
$('.footer .button-main.btn-footer').on("click", "p", function () {
	var cur = $(this).attr('data-short-name')
	var url = '/udata/custom/ChangeSiteCurrency/' + cur + '.json';
	$.ajax({
		type    : 'POST',
		dataType: 'json',
		url     : url,
		async   : false,
		success : function (data) {
			location.reload()
		},
		error   : function () {
			console.log("fail.CurrencyChange");
		}
	})
})

$('.mobile-menu-main-lists').on("click", "li a", function(){
  //if($('.travel').length == 0)
  //  return false;
  
  if($(".travel .js-filters-row .travel-row_input-container[data-id = "+$(this).attr('id')+"]").length > 0){
    $(".travel .js-filters-row .travel-row_input-container[data-id = "+$(this).attr('id')+"]").remove();
    setTimeout(getTurList, 300);
  }else{
    var datastr = '';
    if($(this).hasClass('js-search-type')){
      datastr  = '<div class="travel-row_input-container js-type" data-type="Поход" data-id="'+$(this).attr('id')+'">';
      datastr +=    '<label for="travel-row_input-1"><img src="/templates/ilovetravel/mobile/img/cross-gray.svg"></label><input class="travel-row-input" readonly="" value="'+$(this).html()+'">';
      datastr += '</div>';
    }
    if($(this).hasClass('js-search-country')){
      datastr  = '<div class="travel-row_input-container js-country" data-type="Поход" data-id="'+$(this).attr('id')+'">';
      datastr +=    '<label for="travel-row_input-1"><img src="/templates/ilovetravel/mobile/img/cross-gray.svg"></label><input class="travel-row-input" readonly="" value="'+$(this).html()+'">';
      datastr += '</div>';
    }
    if(datastr.length > 0){
      $( ".travel .js-filters-row" ).prepend( datastr );
      setTimeout(getTurList, 300);
    }
  }
  $('.head-btn.head-btn-active').click();
});

$('.js-filters-row').on("click", ".travel-row_input-container img", function(){
  if($(this).closest('.travel-row_input-container').hasClass('js-date')){
    console.log("REMOVE DATE");
    $(this).closest('.travel-row_input-container').remove();
    //ClearDate();
    $("#resetDateButton").click();
    //СБРОСИТЬ КАЛЕНДАРЬ
  }else{
    var id = $(this).closest('.travel-row_input-container').attr('data-id');
    var searchStr = '.mobile-menu-main-lists #'+id;
    $(searchStr).closest('li').removeClass('active');
    $(this).closest('.travel-row_input-container').remove();
  }
  setTimeout(getTurList, 300);
})

$('.travel').on('click', '.js-switch-sort', function(){
  if($(this).hasClass('travel-row-text-box'))
    return false;
  $('.js-switch-sort').removeClass('travel-row-text-box').addClass('travel-row-text-gray');
  $(this).removeClass('travel-row-text-gray').addClass('travel-row-text-box');
  setTimeout(getTurList, 300);
})

document.querySelector('.date').addEventListener('pickmeup-change', function (e) {
  var arrData = e.detail.formatted_date;
  if(arrData[0] != arrData[1]){
    changeDate(arrData);
  }
});

if (document.querySelector('.date-main-page')) {
    document.querySelector('.date-main-page').addEventListener('pickmeup-change', function (e) {
      var arrData = e.detail.formatted_date;
      if(arrData[0] != arrData[1]){
        changeDate(arrData);
      }
    });
}

function changeDate(arrData){
  if($('.travel').length > 0){
    if($('.js-date').length > 0){
      $('.js-date').attr('data-begin', arrData[0]);
      $('.js-date').attr('data-end', arrData[1]);
      $('.js-date input').val('с '+arrData[0]+' по '+arrData[1]);
    }else{
      var strData = '';
      strData += '<div class="travel-row_input-container js-date" data-begin="'+arrData[0]+'" data-end="'+arrData[1]+'">';
      strData += '   <label for="travel-row_input-1"><img src="/templates/ilovetravel/mobile/img/cross-gray.svg"></label><input id="travel-row_input-1" class="travel-row-input" readonly="" value="с '+arrData[0]+' по '+arrData[1]+'">';
      strData += '</div>';
      $( ".travel .js-filters-row" ).prepend( strData );
    }
    $('.head-btn.head-btn-active').click();
    setTimeout(getTurList, 300);
  }else{
    var startdate = arrData[0].split('.');

    startdate = startdate[2] + '-' + startdate[1] + '-' + startdate[0];
    startdate = new Date(startdate).getTime() / 1000;
    var enddate = arrData[1].split('.');

    enddate = enddate[2] + '-' + enddate[1] + '-' + enddate[0];
    enddate = new Date(enddate).getTime() / 1000;

    
    window.location.href = '/tours/?startdate='+startdate+'&enddate='+enddate;
  }
}


function getCookie (name) {
	var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setLongCookie(){
    var date = new Date;
    date.setDate(date.getDate() + 3600);
    document.cookie = "neverModal=1; expires=" + date.toUTCString();
    //console.log( date.toUTCString() )
}


function show_subscribe_modal() {
    if(!(getCookie('showModal')||getCookie('neverModal'))){
        var date = new Date;
        date.setDate(date.getDate() + 90);
        document.cookie = "showModal=1; expires=" + date.toUTCString();

        OpenPopup('SubscribePopupForm-PopupContainer');
    }
 }

//6Lf93s8UAAAAAFAJDjWKrqAD5QV8Fl-ylgX7jWOI - test key

//6LfXqCoUAAAAAKjbWzN_vsQvVyKLlY3uDRbrtorM - original key

window.Preloader = function (state){
    if (state && !document.querySelector('.preloader-main')){
        let Preloader = document.createElement('div');

        document.body.appendChild(Preloader);

        Preloader.classList.add('preloader-main');

        setTimeout(() => Preloader.style.opacity = '1', 50);
    } else if (document.querySelector('.preloader-main')){
        let Preloader = document.querySelector('.preloader-main');

        Preloader.removeAttribute('style');

        setTimeout(() => Preloader.remove(),500);
    }
};

let FormPay,
    SubscribeFormFooterWidget,
    ApplicationOnPageWidget,
    PopupFormMenuWidget,
    PopupFormWidget,
    SubscribePopupFormWidget;

function recall_d(inputname){
    Preloader(true);
    let $data = $(`#${inputname}`).serialize(),
        url;

    switch (inputname) {
        case 'SubscribeFormFooter':
            url = '/udata/webforms/subscribeUnisender/.json?&' + $data;
            break;
        case 'SubscribePopupForm':
            url = '/udata/webforms/subscribeUnisender/.json?&' + $data;
            break;
        case 'FormPay':
            url = '/udata/custom/SendRequestAlfa/.json';
            break;
        default:
            url = '/udata/webforms/send_custom/.json?' + $data;
            break;
    }

    setLongCookie();

    const RequestOptions = {
        processData: false,
        contentType: false,
        type       : 'POST',
        dataType   : 'json',
        url        : url,
        success    : function (data) {
            console.log('success: ');
            console.log(data);
            setTimeout(() => Preloader(false),500);

            let ErrorType,
                ErrorMessage;

            function ClearForm() {
                if (document.querySelector(`#${inputname} .application_form-error-input`)){
                    document.querySelectorAll(`#${inputname} .application_form-error-input`).forEach(el => {
                        el.classList.remove('application_form-error-input');
                    })
                }

                if (document.querySelector(`#${inputname} .application_form-error-text`)){
                    document.querySelectorAll(`#${inputname} .application_form-error-text`).forEach(el => {
                        el.classList.remove('application_form-error-text');
                    })
                }

                if (document.querySelector(`#${inputname} input[type=text]`)){
                    document.querySelectorAll(`#${inputname} input[type=text]`).forEach(el => {
                        el.value = '';
                    })
                }

                if (document.querySelector(`#${inputname} input[type=email]`)){
                    document.querySelectorAll(`#${inputname} input[type=email]`).forEach(el => {
                        el.value = '';
                    })
                }
            }

            switch (inputname) {
                case 'FormPay':
                    grecaptcha.reset(FormPay);
                    ErrorType = data.errorCode;
                    ErrorMessage = data.errorMessage;
                    break;
                case 'SubscribeFormFooter':
                    grecaptcha.reset(SubscribeFormFooterWidget);
                    ErrorType = data.error;
                    ErrorMessage = data.errortext;
                    break;
                case 'ApplicationOnPage':
                    grecaptcha.reset(ApplicationOnPageWidget);
                    ErrorType = data.err_code;
                    ErrorMessage = data.err_message;
                    break;
                case 'PopupFormMenu':
                    grecaptcha.reset(PopupFormMenuWidget);
                    ErrorType = data.err_code;
                    ErrorMessage = data.err_message;
                    break;
                case 'PopupForm':
                    grecaptcha.reset(PopupFormWidget);
                    ErrorType = data.err_code;
                    ErrorMessage = data.err_message;
                    break;
                case 'SubscribePopupForm':
                    grecaptcha.reset(SubscribePopupFormWidget);
                    ErrorType = data.error;
                    ErrorMessage = data.errortext;
                    break;
            }

            if ( document.querySelector(`#${inputname} .application_form-error-input`)){
                document.querySelectorAll(`#${inputname} .application_form-error-input`).forEach(function (el) {
                    el.classList.remove('application_form-error-input');
                });
            }

            if (document.querySelectorAll(`#${inputname} .application_form-error-text`)){
                document.querySelectorAll(`#${inputname} .application_form-error-text`).forEach(function (el) {
                    el.classList.remove('application_form-error-text');
                });
            }

            function CreateError() {
                if (document.querySelector(`#${inputname} .application_form-error-row`)){
                    let ErrorRow = document.querySelector(`#${inputname} .application_form-error-row`);

                    ErrorRow.classList.add('error-active');

                    ErrorRow.querySelector('p').innerHTML = ErrorMessage;
                }
            }

            switch (ErrorType) {
                case 0:
                    ClearForm();
                    switch (inputname) {
                        case 'FormPay':
                            window.open(data.link, '_blank').focus();
                            break;
                        case 'PopupFormMenu':
                            ClosePopup(`${inputname}-PopupContainer`);
                            OpenPopup('SuccessApplication');
                            break;
                        case 'PopupForm':
                            ClosePopup(`${inputname}-PopupContainer`);
                            OpenPopup('SuccessApplication');
                            break;
                        case 'ApplicationOnPage':
                            OpenPopup('SuccessApplication');
                            break;
                        case 'SubscribeFormFooter':
                            FooterSuccess();
                            break;
                        case 'SubscribePopupForm':
                            document.querySelector('#SubscribePopup form').style.opacity = 0;

                            setTimeout(function () {
                                document.querySelector('#SubscribePopup form').style.display = 'none';
                                document.querySelector('#SubscribePopup .footer-subscribe-success').style.display = 'flex';
                            },250);

                            setTimeout(function () {
                                document.querySelector('#SubscribePopup .footer-subscribe-success').style.opacity = '1';
                            },300);
                            break;
                    }
                    grecaptcha.reset();
                    break;
                case 5:
                    CreateError();

                    let ErrorInput = document.querySelector(`#${inputname} input[type=email]`),
                        Length = ErrorInput.offsetTop -75;

                    ErrorInput.classList.add('application_form-error-input');

                    $('.popup-main').animate({
                        scrollTop: Length
                    }, 1000);

                    break;
                case 6:
                    CreateError();

                    document.querySelectorAll(`#${inputname} .sub-check_input-container`).forEach(function (el) {
                        if (el.hasAttribute('data-required')){
                            el.classList.add('application_form-error-input');
                        }
                    });
                    break;
                default:
                    CreateError();
                    break;
            }
        },
        error      : function () {
            setTimeout(() => Preloader(false),500);
            console.log('fail.register:');
        }
    };

    if (inputname === 'FormPay'){
        RequestOptions['data'] = new FormData($(`#${inputname}`)[0]);
    }

    console.log('el:');
    console.log(document.querySelector('#' + inputname));
    console.log('serialize:');
    console.log($data);

    console.log(RequestOptions.data);

    $.ajax(RequestOptions);
}

function FooterSuccess() {
    document.querySelector('.footer-subscribe form').style.opacity = 0;

    setTimeout(function () {
        document.querySelector('.footer-subscribe form').style.display = 'none';
        document.querySelector('.footer-subscribe .footer-subscribe-success').style.display = 'flex';
    },250);

    setTimeout(function () {
        document.querySelector('.footer-subscribe .footer-subscribe-success').classList.add('footer-active-state')
    },300);
}

window.DownloadRecaptcha = function () {
    let script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit';
    script.id = 'recaptcha';

    document.querySelector('head').appendChild(script);
};

window.onloadCallback = function () {
    let key = '6LfXqCoUAAAAAKjbWzN_vsQvVyKLlY3uDRbrtorM';

    ///6LfXqCoUAAAAAKjbWzN_vsQvVyKLlY3uDRbrtorM

    if (document.querySelector('#FormPay')){
        FormPay = grecaptcha.render(document.querySelector('#FormPay .invisible-recaptcha'), {
            'sitekey': key,
            'badge': 'badge',
            'size': 'invisible',
            'callback': function () {
                recall_d('FormPay');
                grecaptcha.reset(FormPay);
            },
        });
    }
    if (document.querySelector('#SubscribeFormFooter')){

        console.log(document.querySelector('#SubscribeFormFooter .invisible-recaptcha'));

        SubscribeFormFooterWidget = grecaptcha.render(document.querySelector('#SubscribeFormFooter .invisible-recaptcha'), {
            'sitekey': key,
            'badge': 'badge',
            'size': 'invisible',
            'callback': function () {
                recall_d('SubscribeFormFooter');
                grecaptcha.reset(SubscribeFormFooterWidget);
            },
        });
    }
    if (document.querySelector('#ApplicationOnPage')){
        ApplicationOnPageWidget = grecaptcha.render(document.querySelector('#ApplicationOnPage .invisible-recaptcha'), {
            'sitekey': key,
            'badge': 'badge',
            'size': 'invisible',
            'callback': function () {
                recall_d('ApplicationOnPage');
                grecaptcha.reset(ApplicationOnPageWidget);
            },
        });
    }
    if (document.querySelector('#PopupFormMenu')){
        PopupFormMenuWidget = grecaptcha.render(document.querySelector('#PopupFormMenu .invisible-recaptcha'), {
            'sitekey': key,
            'badge': 'badge',
            'size': 'invisible',
            'callback': function () {
                recall_d('PopupFormMenu');
                grecaptcha.reset(PopupFormMenuWidget);
            },
        });
    }
    if (document.querySelector('#PopupForm')){
        PopupFormWidget = grecaptcha.render(document.querySelector('#PopupForm .invisible-recaptcha'), {
            'sitekey': key,
            'badge': 'badge',
            'size': 'invisible',
            'callback': function () {
                recall_d('PopupForm');
                grecaptcha.reset(PopupFormWidget);
            },
        });
    }
    if (document.querySelector('#SubscribePopupForm')){
        SubscribePopupFormWidget = grecaptcha.render(document.querySelector('#SubscribePopupForm .invisible-recaptcha'), {
            'sitekey': key,
            'badge': 'badge',
            'size': 'invisible',
            'callback': function () {
                recall_d('SubscribePopupForm');
                grecaptcha.reset(SubscribePopupFormWidget);
            },
        });
    }
};

(function () {
    if (document.querySelector('form')){
        document.querySelectorAll('form').forEach(el => {

            const CreateObserver = (id) => {
                const options = {
                    root: null,
                    rootMargin: "0px 0px 0px 0px",
                    threshold: 0,
                };

                function callback(entries,observer) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting){
                            if (!document.querySelector('head #recaptcha')){
                                DownloadRecaptcha();
                            }
                            observer.unobserve(entry.target);
                        }
                    })
                }

                const observer = new IntersectionObserver(callback,options);

                document.querySelectorAll(`#${id}`).forEach(function (el) {
                    observer.observe(el);
                });
            };

            if (el.id === 'ApplicationOnPage'){
                CreateObserver('ApplicationOnPage');
            }

            if (el.id === 'FormPay'){
                CreateObserver('FormPay');
            }

            el.querySelectorAll('input').forEach(function (elem) {
                elem.addEventListener('input',function () {
                    if (!document.querySelector('head #recaptcha')){
                        DownloadRecaptcha();
                    } else {
                        elem.removeEventListener('input',function () {})
                    }
                })
            });

            function Validate(form) {
                if (form.querySelector('input')){
                    let Validate = true,
                        ErrorText = null,
                        ErrorRow = form.hasAttribute('data-popup-form');

                    form.querySelectorAll('input').forEach(function (elem) {
                        if (elem.hasAttribute('data-required')){
                            switch (elem.type) {
                                case 'checkbox':
                                    if (!elem.checked){
                                        Validate = false;
                                        ErrorText = 'Подтвердите согласие с пользовательским соглашением';

                                        if (ErrorRow){
                                            elem.parentNode.querySelector('span').classList.add('application_form-error-input');
                                        }
                                    } else if (ErrorRow){
                                        elem.parentNode.querySelector('span').classList.remove('application_form-error-input');
                                    }
                                    break;
                                case 'email':
                                    if(!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,14}$/.test(elem.value)){
                                        Validate = false;
                                        ErrorText = 'Введите корректный адрес электронной почты';

                                        if (ErrorRow){
                                            elem.classList.add('application_form-error-input');

                                            el.querySelector(`label[for=${elem.id}]`).classList.add('application_form-error-text');
                                        }
                                    } else if (!(elem.value.length > 0)) {
                                        Validate = false;
                                        ErrorText = 'Заполните все обязательные поля';

                                        if (ErrorRow){
                                            elem.classList.add('application_form-error-input');

                                            el.querySelector(`label[for=${elem.id}]`).classList.add('application_form-error-text');
                                        }
                                    } else if (ErrorRow){
                                        elem.classList.remove('application_form-error-input');

                                        el.querySelector(`label[for=${elem.id}]`).classList.remove('application_form-error-text');
                                    }
                                    break;
                                case 'text':
                                case 'phone':
                                    if(!(elem.value.length > 0)){
                                        Validate = false;
                                        ErrorText = 'Заполните все обязательные поля';

                                        if (ErrorRow){
                                            elem.classList.add('application_form-error-input');

                                            el.querySelector(`label[for=${elem.id}]`).classList.add('application_form-error-text');
                                        }
                                    } else if (ErrorRow) {
                                        elem.classList.remove('application_form-error-input');

                                        el.querySelector(`label[for=${elem.id}]`).classList.remove('application_form-error-text');
                                    }
                                    break;
                            }
                        }
                    });

                    if (Validate === false){
                        form.querySelector('.application_form-error-row').classList.add('error-active');
                        form.querySelector('.application_form-error-row p').innerHTML = ErrorText;

                        if (ErrorRow && el.querySelector('.application_form-error-text')){
                            let Length = el.querySelectorAll('.application_form-error-text')[0].offsetTop -75;

                            if (el.parentNode.classList.contains('popup-main')){
                                $('.popup-main').animate({
                                    scrollTop: Length
                                }, 1000);
                            } else {
                                $('html, body').animate({
                                    scrollTop: Length
                                }, 1000);
                            }
                        }
                    } else {
                        form.querySelector('.application_form-error-row').classList.remove('error-active');
                        form.querySelector('.application_form-error-row p').innerHTML = null;

                        switch (el.id) {
                            case 'FormPay':
                                grecaptcha.execute(FormPay);
                                break;
                            case 'SubscribeFormFooter':
                                grecaptcha.execute(SubscribeFormFooterWidget);
                                break;
                            case 'ApplicationOnPage':
                                grecaptcha.execute(ApplicationOnPageWidget);
                                break;
                            case 'PopupFormMenu':
                                grecaptcha.execute(PopupFormMenuWidget);
                                break;
                            case 'PopupForm':
                                grecaptcha.execute(PopupFormWidget);
                                break;
                            case 'SubscribePopupForm':
                                grecaptcha.execute(SubscribePopupFormWidget);
                                break;
                        }
                    }
                }
            }

            if (el.querySelector('button[type=submit]')){
                el.querySelector('button[type=submit]').addEventListener('click',function (event) {
                    event.preventDefault();

                    Validate(el);
                });
            }
        })
    }
}());

$(document).ready(function () {
  console.log("CHECK");
  if(getCookie('neverModal')){
    setLongCookie();
  }

  setTimeout(show_subscribe_modal, 5000);
});
