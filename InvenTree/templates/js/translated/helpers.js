{% load i18n %}

/* exported
    blankImage,
    deleteButton,
    editButton,
    imageHoverIcon,
    makeIconBadge,
    makeIconButton,
    makeProgressBar,
    renderLink,
    select2Thumbnail,
    thumbnailImage
    yesNoLabel,
*/

function yesNoLabel(value) {
    if (value) {
        return `<span class='badge rounded-pill bg-success'>{% trans "YES" %}</span>`;
    } else {
        return `<span class='badge rounded-pill bg-warning'>{% trans "NO" %}</span>`;
    }
}


function editButton(url, text='{% trans "Edit" %}') {
    return `<button class='btn btn-success edit-button btn-sm' type='button' url='${url}'>${text}</button>`;
}


function deleteButton(url, text='{% trans "Delete" %}') {
    return `<button class='btn btn-danger delete-button btn-sm' type='button' url='${url}'>${text}</button>`;
}


function blankImage() {
    return `/static/img/blank_image.png`;
}

/* Render a small thumbnail icon for an image.
 * On mouseover, display a full-size version of the image
 */
function imageHoverIcon(url) {

    if (!url) {
        url = blankImage();
    }

    var html = `
        <a class='hover-icon'>
            <img class='hover-img-thumb' src='${url}'>
            <img class='hover-img-large' src='${url}'>
        </a>
        `;

    return html;
}


/**
 * Renders a simple thumbnail image
 * @param {String} url is the image URL 
 * @returns html <img> tag
 */
function thumbnailImage(url) {

    if (!url) {
        url = blankImage();
    }

    // TODO: Support insertion of custom classes

    var html = `<img class='hover-img-thumb' src='${url}'>`;

    return html;

}


// Render a select2 thumbnail image
function select2Thumbnail(image) {
    if (!image) {
        image = blankImage();
    }

    return `<img src='${image}' class='select2-thumbnail'>`;
}


/*
 * Construct an 'icon badge' which floats to the right of an object
 */
function makeIconBadge(icon, title) {

    var html = `<span class='icon-badge fas ${icon} float-right' title='${title}'></span>`;

    return html;
}


/*
 * Construct an 'icon button' using the fontawesome set
 */
function makeIconButton(icon, cls, pk, title, options={}) {

    var classes = `btn btn-outline-secondary ${cls}`;

    var id = `${cls}-${pk}`;

    var html = '';

    var extraProps = '';

    if (options.disabled) {
        extraProps += `disabled='true' `;
    }

    html += `<button pk='${pk}' id='${id}' class='${classes}' title='${title}' ${extraProps}>`;
    html += `<span class='fas ${icon}'></span>`;
    html += `</button>`;

    return html;
}


/*
 * Render a progessbar!
 * 
 * @param value is the current value of the progress bar
 * @param maximum is the maximum value of the progress bar
 */
function makeProgressBar(value, maximum, opts={}) {

    var options = opts || {};

    value = parseFloat(value);

    var percent = 100;

    // Prevent div-by-zero or null value
    if (maximum && maximum > 0) {
        maximum = parseFloat(maximum);
        percent = parseInt(value / maximum * 100);
    }

    if (percent > 100) {
        percent = 100;
    }

    var extraclass = '';

    if (value > maximum) {
        extraclass='progress-bar-over';
    } else if (value < maximum) {
        extraclass = 'progress-bar-under';
    }

    var style = options.style || '';

    var text = '';

    if (style == 'percent') {
        // Display e.g. "50%"

        text = `${percent}%`;
    } else if (style == 'max') {
        // Display just the maximum value
        text = `${maximum}`;
    } else if (style == 'value') {
        // Display just the current value
        text = `${value}`;
    } else if (style == 'blank') {
        // No display!
        text = '';
    } else {
        /* Default style
        * Display e.g. "5 / 10"
        */

        text = `${value} / ${maximum}`;
    }

    var id = options.id || 'progress-bar';

    var style = '';

    if (opts.max_width) {
        style += `max-width: ${options.max_width}; `;
    }

    return `
    <div id='${id}' class='progress' style='${style}'>
        <div class='progress-bar ${extraclass}' role='progressbar' aria-valuenow='${percent}' aria-valuemin='0' aria-valuemax='100' style='width:${percent}%'></div>
        <div class='progress-value'>${text}</div>
    </div>
    `;
}


function renderLink(text, url, options={}) {
    if (url === null || url === undefined || url === '') {
        return text;
    }

    var max_length = options.max_length || -1;

    // Shorten the displayed length if required
    if ((max_length > 0) && (text.length > max_length)) {
        var slice_length = (max_length - 3) / 2;

        var text_start = text.slice(0, slice_length);
        var text_end = text.slice(-slice_length);

        text = `${text_start}...${text_end}`;
    }

    return `<a href="${url}">${text}</a>`;
}
