"use strict";

// Prevent external access through self invoking function scope
!(function () {
  if (window.location.href.split("#").length > 1) {
    window.location.href = window.location.href.split("#")[0];
    return;
  }

  const password = "ya jacob";

  const answerPassword = prompt("What is the secret password?");

  if (answerPassword == null || answerPassword == undefined) {
    alert("Incorrect D:");
    document.write("Begone");
    window.location.href = "\\";
    return;
  }

  if (answerPassword.toLowerCase() === password) {
  } else {
    alert("Incorrect D:");
    document.write("Begone");
    window.location.href = "\\";
    return;
  }

  let currentPage = 1;

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  const pages = document.querySelectorAll(".page");

  document.getElementById("init").addEventListener("click", () => {
    currentPage = 2;
    nextBtn.classList.add("nav-btn-on");
    prevBtn.classList.add("nav-btn-on");
    nextBtn.tabIndex = 0;
    prevBtn.tabIndex = 1;
    setTimeout(() => {
      nextBtn.classList.add("nav-btn-fast");
      prevBtn.classList.add("nav-btn-fast");
    }, 800);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage + 1 == pages.length) {
      enableScroll();
      let link = document.createElement("link");
      link.href = "bruh.css";
      link.rel = "stylesheet";

      document.getElementsByTagName("head")[0].appendChild(link);
    }

    if (currentPage === 5)
    {
      document.querySelector(".confetti").classList.add("confetti--shown");
    }

    if (currentPage + 1 > pages.length) return;
    currentPage++;
    nextBtn.href = `${window.location.href.split("#")[0]}#page${currentPage}`;
    prevBtn.href = `${window.location.href.split("#")[0]}#page${currentPage - 1}`;
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage - 1 < 1) return;
    currentPage--;
    prevBtn.href = `${window.location.href.split("#")[0]}#page${currentPage}`;
    nextBtn.href = `${window.location.href.split("#")[0]}#page${currentPage + 1}`;
  });

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  function elemInView(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  function animatePageIn(page) {
    let checkPage = setInterval(() => {
      if (elemInView(page)) {
        clearInterval(checkPage);

        page.classList.add("shown");
      }
    }, 250);
  }

  window.addEventListener("load", () => {
    pages.forEach((page) => {
      page.classList.add("page-delay");
      animatePageIn(page);
    });
  });

  disableScroll();
})();
