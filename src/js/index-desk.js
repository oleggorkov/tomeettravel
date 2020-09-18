import './../scss/style-desk.sass';
import $ from 'jquery';

//----- main-page filter START -----//

(function () {
    if (document.querySelector('.filter__options-case')) {
        const DropdownCases = document.querySelectorAll('.filter__option');

        DropdownCases.forEach(el =>{
            const MainLustButton = el.querySelector('.filter__option-button');
            const SubLists = el.querySelectorAll('.filter__sub-list-wrapper');

            let MainListHeight;

            if (el.querySelector('.filter__option-dropdown-country')){
                MainListHeight = (el.querySelectorAll('.filter__sub-list-wrapper').length * 32) + (24 * 2) + 'px';
            } else {
                MainListHeight = (el.querySelectorAll('li').length * 32) + (24 * 2) + 'px';
            }

            function CloseAllCase(){
                DropdownCases.forEach(elem => {
                    if (!elem.contains(event.target)){
                        elem.classList.remove('filter__option--active');
                        elem.querySelector('.filter__option-dropdown').removeAttribute('style')
                    }
                });
            }

            MainLustButton.addEventListener('click', function () {
                CloseAllCase();

                if (!el.querySelector('.filter__option-dropdown-date')) {
                    if (el.classList.contains('filter__option--active')){
                        el.querySelector('.filter__option-dropdown').removeAttribute('style');
                    } else {
                        el.querySelector('.filter__option-dropdown').style.height = MainListHeight;
                        el.querySelector('.filter__option-dropdown').style.maxHeight = MainListHeight;
                    }
                }

                el.classList.toggle('filter__option--active');
            });

            document.addEventListener('click', CloseAllCase);

            SubLists.forEach(function (elem) {
                const MainCase = document.querySelector('.filter__main-list');
                const SubListButton = elem.querySelector('.filter__sub-list-button');
                const SubListCase = elem.querySelector('.filter__sub-list-inner');
                const SubListCaseHeight = elem.querySelectorAll('.filter__sub-list-inner li').length * 32 + 'px';

                SubListButton.addEventListener('click', function () {
                    if (elem.classList.contains('filter__sub-list-wrapper--active')){
                        SubListCase.removeAttribute('style');
                    } else {
                        SubListCase.style.maxHeight = SubListCaseHeight;
                        console.log('scroll:  ' + elem.offsetTop);

                        $(MainCase).animate({
                            scrollTop: elem.offsetTop - 24
                        }, 750);
                    }

                    elem.classList.toggle('filter__sub-list-wrapper--active');
                })
            })
        });
    }
}());
//----- main-page filter END -----//