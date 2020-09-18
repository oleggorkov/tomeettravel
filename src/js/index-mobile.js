import $ from 'jquery';
import 'jquery-ui';
import pickmeup from "pickmeup";
import mask from 'jquery-mask-plugin';
import './CreateMap';
import './ajax';
import '../scss/style-mobile.sass';

//----- datepicker START -----//
pickmeup.defaults.locales['ru'] = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
};

addEventListener('DOMContentLoaded', function () {
    let now = new Date;

    pickmeup('.date', {
        default_date: true,
        format	: 'Y.m.d',
        flat : true,
        mode : 'range',
        locale: 'ru',
        select_month: false,
        select_year: false,
        prev: '&#8249;',
        next: '&#8250;',
        render : function (date) {
            if (date < now) {
                return {disabled : true, class_name : 'date-in-past'};
            }
            return {};
        }
    });

    pickmeup('.date-main-page', {
        default_date: true,
        format	: 'Y.m.d',
        flat : true,
        mode : 'range',
        locale: 'ru',
        select_month: false,
        select_year: false,
        prev: '&#8249;',
        next: '&#8250;',
        render : function (date) {
            if (date < now) {
                return {disabled : true, class_name : 'date-in-past'};
            }
            return {};
        }
    });

    if (document.querySelector('.date').getAttribute('data-NewDate')){
        let NewDate = document.querySelector('.date').getAttribute('data-NewDate').split(', ');

        pickmeup('.date').set_date(NewDate);

        document.querySelector('.dates-title p').innerHTML = NewDate[0] + '    ' + NewDate[1];
        document.querySelector('.dates-title p').classList.add('dates-title-active');

        if (document.querySelector('.date-main-page')){
            pickmeup('.date-main-page').set_date(NewDate);

            document.querySelector('.dates-title-main-page p').innerHTML = NewDate[0] + '    ' + NewDate[1];
            document.querySelector('.dates-title-main-page p').classList.add('dates-title-active');
        }
    }
});

(function () {
    if (document.querySelector('.date-main-page')) {
        document.querySelector('.date-main-page').addEventListener('pickmeup-change', function (e) {
            document.querySelector('.dates-title-main-page p').innerHTML = e.detail.formatted_date[0] + '    ' + e.detail.formatted_date[1];
            document.querySelector('.dates-title-main-page p').classList.add('dates-title-active');
        });
    }
}());

document.querySelector('.date').addEventListener('pickmeup-change', function (e) {
    document.querySelector('.dates-title p').innerHTML = e.detail.formatted_date[0] + '    ' + e.detail.formatted_date[1];
    document.querySelector('.dates-title p').classList.add('dates-title-active');
});

let ClearDate = function(){
    pickmeup('.date').clear();
    document.querySelector('.dates-title p').innerHTML = 'Даты';
    document.querySelector('.dates-title p').classList.remove('dates-title-active');

    if (document.querySelector('.date-main-page')) {
        pickmeup('.date-main-page').clear();
        document.querySelector('.dates-title-main-page p').innerHTML = 'Даты';
        document.querySelector('.dates-title-main-page p').classList.remove('dates-title-active');
    }
};

document.addEventListener('click',function () {
    if (event.target.hasAttribute('data-ResetDate')){
        ClearDate();
    }
});
//----- datepicker END -----//


//----- mobile lists START -----//
let goAnimation = true;

function openMenu() {
    if (goAnimation === true){
        goAnimation = false;
        setTimeout(function () {
            goAnimation = true;
        },750);
        let animated = document.querySelectorAll('.menu-animate');
        if (document.querySelector('.mobile-menu-main').classList.contains('mobile-menu-main-active')) {
            for (let i = 0;i < animated.length;i++){
                setTimeout(function () {
                    animated[i].classList.toggle('menu-animate-active');
                },i * 250);
            }
            setTimeout(function () {
                document.querySelector('.mobile-menu-main').classList.toggle('mobile-menu-main-active');
            },750);
            document.querySelector('.head-btn').classList.toggle('head-btn-active');
            document.body.style.overflow = 'auto';
        } else {
            document.querySelector('.mobile-menu-main').classList.toggle('mobile-menu-main-active');
            setTimeout(function () {
                for (let i = 0;i < animated.length;i++){
                    setTimeout(function () {
                        animated[i].classList.toggle('menu-animate-active');
                    },i * 250);
                }
            },750);
            document.querySelector('.head-btn').classList.toggle('head-btn-active');
            document.body.style.overflow = 'hidden';
        }
    }

    document.querySelectorAll('.countries').forEach(function (el) {
        el.classList.remove('countries-active');
    });
    document.querySelectorAll('.type').forEach(function (el) {
        el.classList.remove('type-active');
    });
    document.querySelectorAll('.dates').forEach(function (el) {
        el.classList.remove('dates-active');
    });

    if (document.querySelector('.main-page_head-content')) {
        document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-countries');
        document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-dates');
        document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-type');
    }
}

document.querySelector('.head-btn').addEventListener('click',function () {
    if (document.querySelector('.main-page_head')){
        if (window.pageYOffset < document.querySelector('.main-page_head').clientHeight){
            document.querySelector('.mobile-menu_logo').classList.toggle('mobile-menu_logo-active')
        }
    }
    openMenu();
});

document.querySelectorAll('.countries').forEach(function (el,index) {
    el.querySelector('.countries-title').addEventListener('click',function () {
        if (document.querySelectorAll('.dates')[index].classList.contains('dates-active') || document.querySelectorAll('.type')[index].classList.contains('type-active')) {
            setTimeout(function () {
                if (document.querySelector('.main-page_head-content')){
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-countries');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-dates');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-type');
                }
                el.classList.toggle('countries-active');
            },1000)
        } else{
            if (document.querySelector('.main-page_head-content')){
                document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-countries');
            }
            el.classList.toggle('countries-active');
        }

        document.querySelectorAll('.dates').forEach(function (el) {
            el.classList.remove('dates-active');
        });
        document.querySelectorAll('.type').forEach(function (el) {
            el.classList.remove('type-active');
        });
    });
});

document.querySelectorAll('.dates').forEach(function (el,index) {
    el.querySelector('.dates-title').addEventListener('click',function () {
        if (document.querySelectorAll('.countries')[index].classList.contains('countries-active') || document.querySelectorAll('.type')[index].classList.contains('type-active')) {
            setTimeout(function () {
                if (document.querySelector('.main-page_head-content')){
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-countries');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-dates');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-type');
                }
                el.classList.toggle('dates-active');
            },1000)
        } else {
            if (document.querySelector('.main-page_head-content')){
                document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-dates');
            }
            el.classList.toggle('dates-active');
        }

        document.querySelectorAll('.countries').forEach(function (el) {
            el.classList.remove('countries-active');
        });
        document.querySelectorAll('.type').forEach(function (el) {
            el.classList.remove('type-active');
        });
    });
});

document.querySelectorAll('.type').forEach(function (el,index) {
    el.querySelector('.type-title').addEventListener('click',function () {
        if (document.querySelectorAll('.countries')[index].classList.contains('countries-active') || document.querySelectorAll('.dates')[index].classList.contains('dates-active')) {
            setTimeout(function () {
                if (document.querySelector('.main-page_head-content')){
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-countries');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-dates');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-type');
                }
                el.classList.toggle('type-active');
            },1000)
        } else{
            if (document.querySelector('.main-page_head-content')){
                document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-type');
            }
            el.classList.toggle('type-active');
        }

        document.querySelectorAll('.countries').forEach(function (el) {
            el.classList.remove('countries-active');
        });
        document.querySelectorAll('.dates').forEach(function (el) {
            el.classList.remove('dates-active');
        });
    });
});
//----- mobile lists END -----//

//----- mask START -----//
(function () {
    if (document.querySelector('.phone')){
        $(document).ready(function(){
            $(".phone").mask("+7 000 000 00 00");
        });
    }
}());

//----- mask END -----//

//----- footer list START -----//
(function () {
    if (document.querySelector('.footer-countries-show-more')) {
        document.querySelector('.footer-countries-show-more').addEventListener('click',function () {
            if (document.querySelector('.footer-countries').classList.contains('footer-countries-active')) {
                this.innerHTML = 'ПОКАЗАТЬ ЕЩЕ';
            } else {
                this.innerHTML = 'СКРЫТЬ';
            }
            document.querySelector('.footer-countries').classList.toggle('footer-countries-active');
        });
    }
}());

(function () {
    if (!document.querySelector('.btn-footer')) return;

    document.querySelector('.btn-footer').addEventListener('click',function () {
        this.classList.toggle('active');
    });
}());
//----- footer list END -----//


//----- main-page list countries START -----//
(function () {
    if (document.querySelectorAll('.countries-list-list-open')) {
        document.querySelectorAll('.countries-list-list-open').forEach(function (el) {
            el.querySelector('.countries-list-title').addEventListener('click',function () {
                let height = el.querySelectorAll('li').length * 38;

                $(el.parentNode).animate({
                    scrollTop: el.offsetTop - 48
                }, 1000);

                if (el.querySelector('.countries-list-sub-list').getAttribute('style') !== null && el.getAttribute('style') !== undefined){
                    el.querySelector('.countries-list-sub-list').removeAttribute('style');
                } else {
                    el.querySelector('.countries-list-sub-list').style.maxHeight = height + 'px';
                    el.querySelector('.countries-list-sub-list').style.marginTop = '12px';
                }
            });

            el.querySelectorAll('li').forEach(function (elem) {
                elem.addEventListener('click',function () {
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-countries');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-dates');
                    document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-type');
                })
            });
        });
    }

}());
//----- main-page list countries END -----//

//----- main-page list type START -----//
(function () {
    if (document.querySelectorAll('.page-list-title')) {
        document.querySelectorAll('.page-list-title .type ul li').forEach(function (el) {
            el.addEventListener('click',function () {
                document.querySelector('.page-list-title .type').classList.remove('type-active');

                document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-countries');
                document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.remove('mobile-menu-main-lists-active-dates');
                document.querySelector('.main-page_head-content .mobile-menu-main-lists').classList.toggle('mobile-menu-main-lists-active-type');
            })
        });
    }

}());
//----- main-page list type END -----//


(function () {
    if (document.querySelector('.change-filters')){
        document.querySelector('.change-filters').addEventListener('click',function () {
            openMenu();
        })
    }
}());



document.querySelectorAll('.mobile-menu-main-lists').forEach(function (elem) {
    elem.querySelectorAll('.type ul li').forEach(function (el) {
        el.addEventListener('click',function () {

            this.classList.toggle('active');
        })
    });
});

document.querySelectorAll('.mobile-menu-main-lists').forEach(function (elem) {
    elem.querySelectorAll('.countries ul li .countries-list-sub-list li').forEach(function (el) {
        el.addEventListener('click',function () {
            elem.querySelectorAll('.countries ul li .countries-list-sub-list li').forEach(function (element) {
                element.classList.remove('active');
            });
            this.classList.toggle('active');
            elem.querySelector('.countries-title p').innerHTML = this.innerHTML;
            elem.querySelector('.countries-title p').classList.add('countries-title-active');


            document.querySelectorAll('.countries').forEach(function (el) {
                el.classList.remove('countries-active');
            });
        });

    })
});

document.querySelectorAll('.mobile-menu .type').forEach(function (el) {
    el.querySelectorAll('ul li').forEach(function (elem) {
        elem.addEventListener('click',function () {
            el.classList.remove('type-active');
        })
    })
});

//---- Tour dates list START ----//
(function () {
    if (document.querySelector('.tour_content-dates-title')){
        document.querySelector('.tour_content-dates-title').addEventListener('click',function () {
            document.querySelector('.tour_content-dates').classList.toggle('tour_content-dates-active');
            document.querySelector('.tour_content-dates-show-case').classList.toggle('tour_content-dates-show-case-active');
        })
    }
}());
//---- Tour dates list END ----//

let countriesState = document.querySelectorAll('.countries'),
    datesState = document.querySelectorAll('.dates'),
    typeState = document.querySelectorAll('.type');

document.addEventListener('click',function (event) {
    countriesState.forEach(function (elem) {
        if (!elem.contains(event.target)) {
            elem.classList.remove('countries-active');
            elem.parentNode.classList.remove('mobile-menu-main-lists-active-countries');
        }
    });

    datesState.forEach(function (elem) {
        if (!elem.contains(event.target)) {
            elem.classList.remove('dates-active');
            elem.parentNode.classList.remove('mobile-menu-main-lists-active-dates');
        }
    });

    typeState.forEach(function (elem) {
        if (!elem.contains(event.target)) {
            elem.classList.remove('type-active');
            elem.parentNode.classList.remove('mobile-menu-main-lists-active-type');
        }
    });
});

//---- footer Select list START ----//

(function () {
    window.addEventListener('load',function () {
        if (document.querySelector('.footer')){
            let currency  = document.querySelectorAll('.footer .currency-list p');

            currency.forEach(function (el,index) {
                if (el.getAttribute('data-selected')){
                    el.parentNode.prepend(el);
                }
            });
        }
    });
}());

//---- footer Select list END ----//


//---- Main page slider START ----//

(function () {
    if (document.querySelector('.main-page_slider')){
        let prev = document.querySelectorAll('.main-page_slider .main-page_slider-navigation button')[0],
            next = document.querySelectorAll('.main-page_slider .main-page_slider-navigation button')[1],
            slides = document.querySelectorAll('.main-page_slider .main-page_slider-slide'),
            SwipeState = true,
            CurrentSlide = 0;

        let ChangeSlide = (index, oldIndex) => {
            slides[oldIndex].classList.remove('slide-active');

            if (index > oldIndex){
                prev.innerHTML = slides[oldIndex].querySelector('h2').innerHTML;
                next.innerHTML = slides[index < slides.length - 1 ? index + 1 : 0].querySelector('h2').innerHTML;
            } else {
                prev.innerHTML = slides[index > 0 ? index - 1 : (slides.length - 1)].querySelector('h2').innerHTML;
                next.innerHTML = slides[oldIndex].querySelector('h2').innerHTML;
            }

            if ((index === 0) && (oldIndex === slides.length - 1)){
                next.innerHTML = slides[index + 1].querySelector('h2').innerHTML;
                prev.innerHTML = slides[slides.length - 1].querySelector('h2').innerHTML;
            }

            if ((index === slides.length - 1) && (oldIndex === 0)){
                prev.innerHTML = slides[index - 1].querySelector('h2').innerHTML;
                next.innerHTML = slides[oldIndex].querySelector('h2').innerHTML;
            }

            setTimeout(() => {
                slides[oldIndex].removeAttribute('style');

                slides[index].style.display = 'block';
                setTimeout(() => {
                    slides[index].classList.add('slide-active');
                },25)
            },500)
        };

        let prevSlide = () =>{
            let OldSlide = CurrentSlide;

            CurrentSlide > 0 ? CurrentSlide-- : CurrentSlide = (slides.length - 1);

            ChangeSlide(CurrentSlide,OldSlide);
        };

        let nextSlide = () => {
            let OldSlide = CurrentSlide;

            CurrentSlide < (slides.length - 1) ? CurrentSlide++ : CurrentSlide = 0;

            ChangeSlide(CurrentSlide,OldSlide);
        };

        prev.addEventListener('click',function () {
            if (SwipeState){
                SwipeState = false;

                prevSlide();

                setTimeout(function () {
                    SwipeState = true;
                },1025);
            }
        });

        next.addEventListener('click',function () {
            if (SwipeState){
                SwipeState = false;

                nextSlide();

                setTimeout(function () {
                    SwipeState = true;
                },1025);
            }
        });

        let hammer = new Hammer.Manager(document.querySelector('.main-page_slider'), {
            touchAction: 'pan-y',
        });

        let swipe = new Hammer.Swipe({threshold: 100});

        hammer.add(swipe);

        hammer.on('swipeleft', function(){
            if (SwipeState){
                SwipeState = false;

                nextSlide();

                setTimeout(function () {
                    SwipeState = true;
                },1025);
            }
        });

        hammer.on('swiperight', function(){
            if (SwipeState){
                SwipeState = false;

                prevSlide();

                setTimeout(function () {
                    SwipeState = true;
                },1025);
            }
        });

        prev.innerHTML = slides[slides.length - 1].querySelector('h2').innerHTML;
        next.innerHTML = slides[1].querySelector('h2').innerHTML;
    }
}());

//---- Main page slider END ----//


//---- Popup open\close START ----//

window.OpenPopup = function(el){
    let Popup = document.querySelector(`#${el}`);

    Popup.style.display = 'block';

    if (Popup.hasAttribute('data-load-recaptcha') && !document.querySelector('head #recaptcha')){
        DownloadRecaptcha();
    }

    setTimeout(function () {
        Popup.classList.add('popup-main-active');
        document.body.classList.add('popup-open');
    },50);
};

window.ClosePopup = function(el){
    document.querySelector(`#${el}`).classList.remove('popup-main-active');

    setTimeout(function () {
        document.querySelector(`#${el}`).style.display = 'none';
        document.body.classList.remove('popup-open');
    },500);
};

(function () {
    if (document.querySelector('[data-OpenPopup]')){
       let PopupsOpen = document.querySelectorAll('[data-OpenPopup]'),
           PopupsClose = document.querySelectorAll('[data-ClosePopup]');

        PopupsOpen.forEach(function (elem) {
           elem.addEventListener('click',function () {
                OpenPopup(elem.getAttribute('data-OpenPopup'));
            });
        });

        PopupsClose.forEach(function (elem) {
            elem.addEventListener('click',function () {
                ClosePopup(elem.getAttribute('data-ClosePopup'));
            });
        });


    }
}());

//---- Popup open\close END ----//

//---- Tour navigation START ----//

(function () {
    if (document.querySelector('.tour')){
        let HeaderLinks = document.querySelectorAll('.tour .tour_title .nav-links a');

        function slowScroll(id) {
            let offset = 155;
            $('html, body').animate({
                scrollTop: $(id).offset().top - offset
            }, 1000);
            return false;
        }

        HeaderLinks.forEach(function (el) {
            el.addEventListener('click',function () {
                slowScroll(`#${el.getAttribute('data-to')}`)
            })
        });

        let NavigationLinks = document.querySelectorAll('.tour_title .nav-links a span');

        function CheckLink(id) {
            NavigationLinks.forEach(function (el,index) {
                if (index === id){
                    el.classList.add('line-active');
                } else {
                    el.classList.remove('line-active');
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-175px 0px 0px 0px",
            threshold: 0.1,
        };

        function callback(entries,observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    CheckLink(parseInt(entry.target.getAttribute('data-TourNavigation')));
                }
            })
        }

        const observer = new IntersectionObserver(callback,options);

        document.querySelectorAll('[data-TourNavigation]').forEach(function (el) {
            observer.observe(el);
        });
    }
}());

//---- Tour navigation END ----//

//---- input mail autocomplete START ----//

(function () {
    if (document.querySelector('#mail')){
        let MailInput = document.querySelector('#mail'),
            CurrentMail = document.querySelector('#CurrentMail');

        MailInput.addEventListener('input',function () {
            if (this.value.length > 0){
                CurrentMail.innerHTML = this.value;
            } else {
                CurrentMail.innerHTML = 'name@mail.ru';
            }
        })
    }
}());

//---- input mail autocomplete END ----//


//---- Tour_gallery START ----//
(function () {
    if (document.querySelector('.tour_gallery')){
        let CurrentSlide = 0,
            SwipeState = true,
            stage = document.querySelector('.tour_gallery-stage'),
            SlidesLength = document.querySelectorAll('.tour_gallery-stage img').length,
            prev = document.querySelector('.tour_gallery-prev'),
            next = document.querySelector('.tour_gallery-next'),
            dots = document.querySelector('.tour_gallery-dots');

        for (let i = 0; i < SlidesLength; i++){
            let dot = document.createElement('span');
            dots.appendChild(dot);
        }

        dots.querySelectorAll('span')[CurrentSlide].classList.add('active-dot');

        let ChangeSlide = function(index){
            stage.style.transform = `translateX(${-100 * index}%)`;

            dots.querySelectorAll('span').forEach(function (el) {
                el.classList.remove('active-dot');
            });

            dots.querySelectorAll('span')[index].classList.add('active-dot');
        };

        let NextSlide = function () {
            if (CurrentSlide < SlidesLength - 1){
                CurrentSlide++;

                ChangeSlide(CurrentSlide);
            } else {
                CurrentSlide = 0;

                ChangeSlide(CurrentSlide);
            }
        };

        let PrevSlide = function () {
            if (CurrentSlide > 0){
                CurrentSlide--;

                ChangeSlide(CurrentSlide);
            } else {
                CurrentSlide = SlidesLength - 1;

                ChangeSlide(CurrentSlide);
            }
        };

        prev.addEventListener('click',function () {
            PrevSlide();
        });

        next.addEventListener('click',function () {
            NextSlide();
        });

        let hammer = new Hammer.Manager(stage, {
            touchAction: 'pan-y',
        });

        let swipe = new Hammer.Swipe({threshold: 100});

        hammer.add(swipe);

        hammer.on('swipeleft', function(){
            if (SwipeState){
                SwipeState = false;

                NextSlide();

                setTimeout(function () {
                    SwipeState = true;
                },500);
            }
        });

        hammer.on('swiperight', function(){
            if (SwipeState){
                SwipeState = false;

                PrevSlide();

                setTimeout(function () {
                    SwipeState = true;
                },500);
            }
        });
    }
}());
//---- Tour_gallery END ----//

//---- Lazy load image START ----//

(function () {
    const options = {
        root: null,
        rootMargin: "300px 300px 300px 300px",
        threshold: 0,
    };

    function LoadImage(el) {
        el.src = el.dataset.src;
    }

    function CreateObserver() {
        function callback(entries,observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    LoadImage(entry.target);

                    observer.unobserve(entry.target);
                }
            })
        }

        const observer = new IntersectionObserver(callback,options);

        if (document.querySelector('[data-src]')){
            document.querySelectorAll('[data-src]').forEach(function (el) {
                observer.observe(el);
            });
        }
    }

    if (!window['IntersectionObserver']){
        if (document.querySelector('[data-src]')){
            document.querySelectorAll('[data-src]').forEach(function (el) {
                LoadImage(el);
            });
        }
    } else {
        CreateObserver();
    }
}());

//---- Lazy load image END ----//