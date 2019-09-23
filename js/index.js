(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = convertRange;

/**
  * Convert value from one range to another
  * @param {Number} value value to convert
  * @param {Object|Array} oldRange min, max of original range
  * @param {Object|Array} newRange min, max of desired range
  * @return {Number} value converted to other range
  */
function convertRange(value, oldRange, newRange) {
  if (Array.isArray(oldRange) && Array.isArray(newRange)) {
    return ((value - oldRange[0]) * (newRange[1] - newRange[0])) / (oldRange[1] - oldRange[0]) + newRange[0];
  }
  return ((value - oldRange.min) * (newRange.max - newRange.min)) / (oldRange.max - oldRange.min) + newRange.min;
}

},{}],2:[function(require,module,exports){
(function (root, smoothScroll) {
  'use strict';

  // Support RequireJS and CommonJS/NodeJS module formats.
  // Attach smoothScroll to the `window` when executed as a <script>.

  // RequireJS
  if (typeof define === 'function' && define.amd) {
    define(smoothScroll);

  // CommonJS
  } else if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = smoothScroll();

  } else {
    root.smoothScroll = smoothScroll();
  }

})(this, function(){
'use strict';

// Do not initialize smoothScroll when running server side, handle it in client:
if (typeof window !== 'object') return;

// We do not want this script to be applied in browsers that do not support those
// That means no smoothscroll on IE9 and below.
if(document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) { return; }

// Get the top position of an element in the document
var getTop = function(element, start) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if(element.nodeName === 'HTML') return -start
    return element.getBoundingClientRect().top + start
}
// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
var easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
var position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
}

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
// if context is set then scroll that element, else scroll window
var smoothScroll = function(el, duration, callback, context){
    duration = duration || 500;
    context = context || window;
    var start = context.scrollTop || window.pageYOffset;

    if (typeof el === 'number') {
      var end = parseInt(el);
    } else {
      var end = getTop(el, start);
    }

    var clock = Date.now();
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn){window.setTimeout(fn, 15);};

    var step = function(){
        var elapsed = Date.now() - clock;
        if (context !== window) {
          context.scrollTop = position(start, end, elapsed, duration);
        }
        else {
          window.scroll(0, position(start, end, elapsed, duration));
        }

        if (elapsed > duration) {
            if (typeof callback === 'function') {
                callback(el);
            }
        } else {
            requestAnimationFrame(step);
        }
    }
    step();
}

var linkHandler = function(ev) {
    ev.preventDefault();

    if (location.hash !== this.hash) window.history.pushState(null, null, this.hash)
    // using the history api to solve issue #1 - back doesn't work
    // most browser don't update :target when the history api is used:
    // THIS IS A BUG FROM THE BROWSERS.
    // change the scrolling duration in this call
    var node = document.getElementById(this.hash.substring(1))
    if(!node) return; // Do not scroll to non-existing node

    smoothScroll(node, 500, function(el) {
        location.replace('#' + el.id)
        // this will cause the :target to be activated.
    });
}

// We look for all the internal links in the documents and attach the smoothscroll function
document.addEventListener("DOMContentLoaded", function () {
    var internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'), a;
    for(var i=internal.length; a=internal[--i];){
        a.addEventListener("click", linkHandler, false);
    }
});

// return smoothscroll API
return smoothScroll;

});

},{}],3:[function(require,module,exports){
// Enable smooth scrolling
require('smoothscroll');

const convertRange = require('convert-range');
const logo = document.querySelector('.logo');
const sections = document.querySelectorAll('section');

let ticking = false;
let currentOpacity = 1;
let currentScale = 1;
let currentID = 0;

/**
 * Converts any number to a number with 3 decimals
 * @param  {Number} num
 * @return {Number}
 */
const roundToThreeDecimals = num => Math.round(num * 1000) / 1000;

/**
 * Converts the current pageheight / scroll position into a valid opacity value
 * @param  {Number} innerHeight Height of the viewport
 * @param  {Number} scrollY     Scroll offset
 * @return {Number}             Opacity (value between 1 and 0)
 */
const getOpacity = (innerHeight, scrollY) => {
  // Calculate num in range 1-0
  let result = convertRange(scrollY, [0, innerHeight], [1, 0]);

  if (result > 1) result = 1;
  if (result < 0) result = 0;

  // Return either the result, or one of the absolutes
  return roundToThreeDecimals(result);
};

/**
 * Comparable to the getOpacity function, but for the scale
 * @param  {Number} innerHeight Height of the viewport
 * @param  {Number} scrollY     Scroll offset
 * @return {Number}             Scale (value between 1 and 0.85)
 */
const getScale = (innerHeight, scrollY) => {
  // Calculate num in range 1-0.8
  let result = convertRange(scrollY, [0, innerHeight], [1, 0.85]);

  if (result > 1) result = 1;
  if (result < 0.85) result = 0.85;

  // Return either the result, or one of the absolutes
  return roundToThreeDecimals(result);
};

/**
 * Gets newly calculated opacity and scale values and sets them to the logo
 *   element if they've changed from the previous time
 * @param  {Number} innerHeight Height of the viewport
 * @param  {Number} scrollY     Scroll offset
 */
const updateLogo = (innerHeight, scrollY) => {
  const newOpacity = getOpacity(innerHeight, scrollY);
  const newScale = getScale(innerHeight, scrollY);

  if (newOpacity !== currentOpacity) {
    currentOpacity = newOpacity;
    logo.style.opacity = newOpacity;
  }

  if (newScale !== currentScale) {
    currentScale = newScale;
    logo.style.transform = `translate(-50%, -50%) scale(${newScale})`;
  }
}

/**
 * Measures which section's top offset is closest to 0 in the viewport and
 *   updates the url and title accordingly
 *
 * When a section is fully visible with the title at the top, the offset from
 *   the section's top in relation to the viewport is 0
 */
const updateUrlAndTitle = () => {
  // Create an array of the top offsets of all sections
  const topOffsets = Array
    .from(sections)
    .map(section => section.getBoundingClientRect())
    .map(obj => obj.top);

  // Get the offset which is closest to 0
  const closest = topOffsets
    .reduce((prev, curr) => Math.abs(curr - 0) < Math.abs(prev - 0) ? curr : prev);

  // Find the index in the offsets array of this offset
  const closestIndex = topOffsets.indexOf(closest);

  // Get the section based on this index
  const newSection = sections[closestIndex];

  // Retrieve the ID of the section
  const newID = newSection.getAttribute('id') || '';

  // If this is a different ID than the current, update the browsers history
  //   (url) and title
  if (newID !== currentID) {
    currentID = newID;

    history.pushState({}, '', '#' + newID);

    document.title = 'Vncnt\'s portfolio | ' + newID;
  }
}

const photo = document.getElementById('profile');
photo.addEventListener('mouseover', (event) => {
  photo.src = '/img/colored-vncnt.png'
});

photo.addEventListener('mouseout', (event) => {
  photo.src = '/img/malle_maat.png'
});

/**
 * Updater function calls al other functionality
 *
 * Gets called as soon as we're granted an animationframe by the browser
 */
const update = () => {
  ticking = false;

  const {innerHeight, scrollY} = window;

  updateLogo(innerHeight, scrollY);
  updateUrlAndTitle(innerHeight, scrollY);
};

/**
 * The main scroll handler function
 *
 * If we're in the middle of an animationframe (ticking !== false), do nothing
 *   else, request a new animationframe which in turn calls the above update fn
 */
const onScroll = () => {
  ticking = ticking || requestAnimationFrame(update);
}



window.addEventListener('scroll', onScroll, false);

// Update once on load set the correct initial values for f.e. the logo & url
update();

},{"convert-range":1,"smoothscroll":2}]},{},[3]);
