'use strict';

(function ($) {

    const PHONE_NUMBER = "919490903999"; // countrycode + number (no +)
    const MESSAGE = "Hi! I need help";
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

})(jQuery);