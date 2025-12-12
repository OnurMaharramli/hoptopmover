(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 150, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: { items: 2 },
            576: { items: 4 },
            768: { items: 6 },
            992: { items: 8 }
        }
    });

})(jQuery);

// =================== DOMContentLoaded ===================
document.addEventListener('DOMContentLoaded', function () {

    const logo = document.getElementById('logo');
    const navbar = document.querySelector('.navbar');

    function updateLogo() {
        if (window.matchMedia("(max-width: 991px)").matches) {
            logo.src = 'img/HOPTOP_Logo.png';
            navbar.classList.remove('sticky-top', 'shadow-sm'); 
        } else {
            if (window.scrollY > 45) {
                navbar.classList.add('sticky-top', 'shadow-sm');
                logo.src = 'img/HOPTOP_Logo.png';
            } else {
                navbar.classList.remove('sticky-top', 'shadow-sm');
                logo.src = 'img/HOPTOP_LogoWhite.png';
            }
        }
    }

    window.addEventListener('scroll', updateLogo);
    window.addEventListener('resize', updateLogo);

    updateLogo();

    // Get form data
    function getFormData() {
        return {
            name: document.getElementById("name")?.value.trim() || "",
            phone: document.getElementById("phone")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            moveType: document.getElementById("moveType")?.value.trim() || "",
            pickup: document.getElementById("pickup")?.value.trim() || "",
            dropoff: document.getElementById("dropoff")?.value.trim() || "",
            message: document.getElementById("message")?.value.trim() || ""
        };
    }

    // WhatsApp button
    const sendWhatsApp = document.getElementById("sendWhatsApp");
    sendWhatsApp?.addEventListener("click", function () {
        const d = getFormData();
        const num = "14374361414";

        const text =
            `New Moving Quote Request:\n-----------------------\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nMove Type: ${d.moveType}\nPickup: ${d.pickup}\nDrop-off: ${d.dropoff}\nDetails: ${d.message}\n-----------------------\nSent from www.hoptopmovers.ca`;

        const url = "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
        window.open(url, "_blank");
    });

    // SMS button
    const sendSMS = document.getElementById("sendSMS");
    sendSMS?.addEventListener("click", function () {
        const d = getFormData();
        const num = "14374361414";

        const text =
            `New Moving Quote Request:\nName: ${d.name}\nPhone: ${d.phone}\nMove Type: ${d.moveType}\nPickup: ${d.pickup}\nDrop-off: ${d.dropoff}`;

        const smsLink = `sms:${num}?body=${encodeURIComponent(text)}`;
        window.location.href = smsLink;
    });

    // =================== Language Switcher ===================
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    function setLanguage(lang) {
        if (!window.languages[lang]) return;

        currentLang = lang;
        const data = window.languages[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keys = el.dataset.i18n.split('.'); // split by dot
            let value = data;
            keys.forEach(k => value = value?.[k]);
            if (value) el.innerText = value;
        });
    }

    // Buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.dataset.lang;
            if (selectedLang === currentLang) return;
            setLanguage(selectedLang);
        });
    });

    // Default on load
    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(currentLang);
    });

});
