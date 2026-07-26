/*------------------------------------- Page Loader -------------------------------------*/
$(function () {
    setTimeout(() => {
        $('.page-loader').fadeOut('slow');
    }, 1000);
});
/*------------------------------------- Whole Page Scrolling Animation -------------------------------------*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
        target.classList.toggle('show', isIntersecting);
    });
});

const hiddenElements = document.querySelectorAll('.fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down');

document.addEventListener('DOMContentLoaded', () => {
    hiddenElements.forEach((el) => observer.observe(el));
});
/*------------------------------------- Search Pop Up -------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const searchIcons = document.querySelectorAll('.search-icon-circle');
    const searchPopUps = document.querySelectorAll('.search-pop-up');

    searchIcons.forEach((searchIcon, index) => {
        const searchPopUp = searchPopUps[index];

        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            searchPopUp.classList.add('open');
        });

        document.addEventListener('click', (e) => {
            if (!searchPopUp.contains(e.target) && !searchIcon.contains(e.target)) {
                searchPopUp.classList.remove('open');
            }
        });
    });
});

/*------------------------------------- Side Menu -------------------------------------*/
const menu = document.querySelector('.contact-num-menu');
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const overlay = document.querySelector('.menuOverlay');


menuToggle.addEventListener('click', () => {
    menu.classList.add('active');
    overlay.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
});
/*------------------------------------- Chnges Drop Down Animition -------------------------------------*/
$(document).ready(function () {
    // Handle click on the .hov element
    $(document).on('click', '.hov', function (e) {
        e.stopPropagation();

        $('.main').not($(this).find('.main')).slideUp(280).removeClass('show');
        $('.arrow-icon-menu').not($(this).find('.arrow-icon-menu')).removeClass('up');

        $(this).find('.main').slideToggle(280).toggleClass('show');
        $(this).find('.arrow-icon-menu').toggleClass('up');
    });

    // Close all dropdowns when clicking outside
    $(document).on('click', function () {
        $('.main').slideUp(280).removeClass('show');
        $('.arrow-icon-menu').removeClass('up');
    });
});
/*------------------------------------- Active Menu Sub Menu -------------------------------------*/
const windowPathname = window.location.pathname;
const setActiveClass = (selector) => {
    const navLinks = document.querySelectorAll(selector);

    navLinks.forEach((navLink) => {
        const navLinkPathname = new URL(navLink.href, window.location.origin).pathname;

        if (
            windowPathname === navLinkPathname ||
            (windowPathname === '/' && navLinkPathname === '/index.html')
        ) {
            navLink.classList.add('active');

            const parentLi = navLink.closest('.hov');
            if (parentLi) {
                parentLi.classList.add('active');
            }

            const submenu = navLink.closest('.main');
            if (submenu) {
                submenu.parentElement.classList.add('active');
            }
        }
    });
};

setActiveClass('.submenu-link');

/*-------------------------------------main background slider-------------------------------------*/
$(document).ready(function () {
    const $sliderMain = $('.slider-main');
    const $textSlides = $('.text-slide');

    $sliderMain.slick({
        dots: false,
        speed: 1000,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        arrows: true,
        prevArrow: '<button class="PrevArrow sec-one-slider-btn"></button>',
        nextArrow: '<button class="NextArrow sec-one-slider-btn"></button>',
    });

    $textSlides.eq(0).addClass('active');

    $sliderMain.on('afterChange', function (event, slick, currentSlide) {
        $textSlides.removeClass('active');
        $textSlides.eq(currentSlide).addClass('active');
    });
});

/*------------------------------------- Form Drop Down Menu -------------------------------------*/
$(document).ready(function () {
    $('.formDropDown').on('click', function (e) {
        e.stopPropagation();
        $('.formDropDown-ul-list').slideToggle(280);
        $('.arrow-icon-form').toggleClass('up');
    });

    $('.formDropDown-ul-list li').on('click', function (e) {
        e.stopPropagation();
        let selectedItem = $(this).text();
        $('.formDropDown').contents().filter(function () {
            return this.nodeType === 3;
        }).get(0).nodeValue = selectedItem;
        $('.formDropDown-ul-list').slideUp(280);
        $('.arrow-icon-form').removeClass('up');
    });

    $(document).on('click', function () {
        $('.formDropDown-ul-list').slideUp(280);
        $('.arrow-icon-form').removeClass('up');
    });
});

/* ------------------------------------- Testimonial Slider-------------------------------------*/
$(document).ready(function () {
    $('.testimonilas-main').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true,
        speed: 1500,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});

/*------------------------------------- Bottom To Top Button -------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.bottom-top-button');
    window.addEventListener('scroll', () => {
        button.style.display = window.pageYOffset > 100 ? 'block' : 'none';
    });
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

/*-------------------------------------Specific reveal Function-------------------------------------*/
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add("active");
        } else {
            reveal.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", reveal, { passive: true });

/*-------------------------------------Automatically update the year in the-------------------------------------*/
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

/*------------------------------------- Progress Bar -------------------------------------*/
jQuery(document).ready(function () {
    jQuery(document).on('scroll', function () {
        if (jQuery('html,body').scrollTop() > jQuery('#first-sec').height()) {
            jQuery(".progress-bar").each(function () {
                jQuery(this).find(".progress-content").animate({
                    width: jQuery(this).attr("data-percentage")
                }, 2000);

                jQuery(this).find(".progress-number-mark").animate({
                    left: jQuery(this).attr("data-percentage")
                }, {
                    duration: 2000,
                    step: function (now, fx) {
                        var data = Math.round(now);
                        jQuery(this).find(".percent").html(data + "%");
                    }
                });
            });
        }
    });
});

/*------------------------------------- Pricing Tabs btn -------------------------------------*/
$(function () {
    $('.tabs-btn').on('click', 'a', function () {
        var tabId = $(this).attr('data-tab');

        $('.tabs-btn a').removeClass('active');
        $('.Tabcondent').removeClass('active');

        $(this).addClass('active');
        $('#' + tabId).addClass('active');
    });
});
/*------------------------------------- plumbing-grid -------------------------------------*/
$(document).ready(function () {
    $('.plumbing-grid').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true,
        speed: 1500,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});