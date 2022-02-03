/**
 * file: nowuseeme.js
 * purpose: is my element visible on the screen or not?
 **/

/* select an element */
var a = document.getElementById("last-col");
const ele = document.getElementById("container");
/*
	Detect whether element is visible or not.
	@url: https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
*/
function isElementVisible(el) {
  var rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || doc.documentElement.clientWidth,
    vHeight = window.innerHeight || doc.documentElement.clientHeight,
    efp = function (x, y) {
      return document.elementFromPoint(x, y);
    };

  // Return false if it's not in the viewport
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  )
    return false;

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  );
}

var keepMe = 0;

/* When scrolling do this */
ele.onscroll = function () {
  // test
  console.log(isElementVisible(a)); // false or true: Q.E.D.

  // as soon as the thing is visible ... fire off some youtube html
  if (isElementVisible(a) == true) {
    console.log("ultimo elemento");
  }
};
