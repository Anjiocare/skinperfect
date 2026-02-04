'use strict';

(function ($) {

    const PHONE_NUMBER = "919080236443"; // countrycode + number (no +)
    const MESSAGE = "Hi! I need help";
    const INSTAGRAM_URL = "https://www.instagram.com/skinperfectguntur";
    const WA_CONSULT_TEMPLATE = ({ name, phone, date, gender }) =>
        `Hi, I want a consultation.\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Date: ${date}\n` +
        `Gender: ${gender}`;

    const encodedMsg = encodeURIComponent(MESSAGE);
    const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodedMsg}`;

    $("a.x-contact-us").each(function () {
    $(this)
        .attr("href", WHATSAPP_URL)
        .attr("target", "_blank")
        .attr("rel", "noopener noreferrer");
    });

    document.title = "Skin Perfect - Dermatology & Cosmetic clinic";
    $("div.header__logo a img").attr("src", "img/main_logo.png");
    $("div.offcanvas__logo a img").attr("src", "img/main_logo.png");
    $("div.footer__logo a img").attr("src", "img/main_logo.png");

    $("div.footer__social a i.fa-instagram")
        .closest("a")
        .attr("href", INSTAGRAM_URL)
        .attr("target", "_blank");

    $("div.header__top__right a i.fa-instagram")
        .closest("a")
        .attr("href", INSTAGRAM_URL)
        .attr("target", "_blank");

    $("div.offcanvas__social a i.fa-instagram")
        .closest("a")
        .attr("href", INSTAGRAM_URL)
        .attr("target", "_blank");

    $("#consultation-form").on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const form = this;
        const data = new FormData(form);

        const values = {
            name: data.get("name") || "",
            phone: data.get("phone") || "",
            date: data.get("date") || "",
            gender: data.get("gender") || "",
        };

        // Construct message + encode it properly
        const msg = WA_CONSULT_TEMPLATE(values);
        const encodedMsg = encodeURIComponent(msg);

        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodedMsg}`;

        window.open(url, "_blank");
    });

    // $.getScript("js/player.js")

    $('.video-popup').magnificPopup({
        type: 'iframe',
        iframe: {
            markup:
            '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>' +
            '</div>',
            patterns: {
            custom: {
                index: '',
                src: '%id%'
            }
            },
            srcAction: 'iframe_src'
        }
    });

    loadContent('#offcanvas', 'partials/offcanvas.html');
    loadContent('.header', 'partials/header.html');
    loadContent('.footer', 'partials/footer.html');

    async function loadContent(selector, url) {
        const res = await fetch(url)
        const body = await res.text();
        for (const el of window.document.querySelectorAll(selector)) {
            el.innerHTML = body;
        }
    }

})(jQuery);