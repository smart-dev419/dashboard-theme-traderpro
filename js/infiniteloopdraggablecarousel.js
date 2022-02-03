var lastCol = document.getElementById("last-col");
var firstCol = document.getElementById("first-col");
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

// /* When scrolling do this */
// ele.onscroll = function () {
//   // test
//   console.log(isElementVisible(a)); // false or true: Q.E.D.

//   // as soon as the thing is visible ... fire off some youtube html
//   if (isElementVisible(a) == true) {
//     console.log("ultimo elemento");
//   }
// };

document.addEventListener("DOMContentLoaded", function () {
  const ele = document.getElementById("container");
  ele.style.cursor = "grab";

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";

    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  // Attach the handler
  ele.addEventListener("mousedown", mouseDownHandler);
});

document.getElementById("prev-btn").addEventListener("click", function () {
  const ele = document.getElementById("container");
  let items = document.querySelector(".items");
  let itemWidth = items.offsetWidth;
  isElementVisible(firstCol)
    ? (ele.scrollLeft = itemWidth * 5)
    : (ele.scrollLeft -= items.offsetWidth);
});
document.getElementById("next-btn").addEventListener("click", function () {
  const ele = document.getElementById("container");
  let items = document.querySelector(".items");

  isElementVisible(lastCol)
    ? (ele.scrollLeft = 0)
    : (ele.scrollLeft += items.offsetWidth);
});
