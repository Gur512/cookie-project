'use strict';

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const modal1 = select('.modal .modal1-content');
const modal2 = select('.modal2-content');
const modal = select('.modal');
const acceptBtn = select('.btn-1');
const settingBtn = select('.btn-2');
const saveBtn = select('.save-btn');
const browserCheckbox = select('#browser');
const osCheckbox = select('#oprator');
const widthCheckbox = select('#width');
const heightCheckbox = select('#height');


function setCookie(name, value, seconds) {
  const expires = `max-age=${seconds}`;
  document.cookie = `${name}=${value};path=/;${expires}`;
}

function getCookie(cookiename) {
  let name = cookiename + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let newCookie = cookies[i].trim();
    if (newCookie.indexOf(name) === 0) {
      return newCookie.substring(name.length, newCookie.length);
    }
  }
  return "";
}

function areCookiesEnabled() {
  document.cookie = "testcookie=test; max-age=1";
  return document.cookie.indexOf("testcookie") !== -1;
}

function getBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Edg") > -1) return 'Edge'; 
  if (userAgent.indexOf("Chrome") > -1) return 'Chrome';
  if (userAgent.indexOf("Firefox") > -1) return 'Firefox';
  if (userAgent.indexOf("Safari") > -1) return 'Safari'; 
  return 'Unknown Browser';
}

function getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Win") > -1) return 'Windows';
    if (userAgent.indexOf("Mac") > -1) return 'Mac/iOS';
    if (userAgent.indexOf("Linux") > -1) return 'Linux';
    return 'Unknown OS';
}

function getDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function displayCookies() {
    console.log("Cookies are enabled");
    console.log("Browser Info: " + getCookie("browserInfo"));
    console.log("OS Info: " + getCookie("osInfo"));
    console.log("Screen Width: " + getCookie("screenWidth"));
    console.log("Screen Height: " + getCookie("screenHeight"));
}

function AcceptButton() {
  setCookie("userConsent", "accepted", 20);
  setCookie("browserInfo", getBrowser(), 20);
  setCookie("osInfo", getOS(), 20);
  const screenDimensions = getDimensions();
  setCookie("screenWidth", screenDimensions.width, 20);
  setCookie("screenHeight", screenDimensions.height, 20);

  modal1.style.display = 'none';
  displayCookies();

  setTimeout(() => {
    clearCookies();
    modal.style.display = 'block';
  }, 15000);
}

function clearCookies() {
  const maxAge = 0;
  document.cookie = `userConsent=; max-age=${maxAge}; path=/`;
  document.cookie = `browserInfo=; max-age=${maxAge}; path=/`;
  document.cookie = `osInfo=; max-age=${maxAge}; path=/`;
  document.cookie = `screenWidth=; max-age=${maxAge}; path=/`;
  document.cookie = `screenHeight=; max-age=${maxAge}; path=/`;
}

function openSettings() {
    modal1.style.visibility = 'hidden';
    modal2.style.visibility = 'visible';
}

function savePreferences() {
    setCookie("browserInfo", browserCheckbox.checked ? getBrowser() : "rejected", 20);
    setCookie("osInfo", osCheckbox.checked ? getOS() : "rejected", 20);
    setCookie("screenWidth", widthCheckbox.checked ? window.innerWidth : "rejected", 20);
    setCookie("screenHeight", heightCheckbox.checked ? window.innerHeight : "rejected", 20);

    modal2.style.display = 'none';
    displayCookies();

    setTimeout(() => {
        clearCookies();
        modal.style.display = 'block';
    }, 15000);
}

if (!areCookiesEnabled()) {
  console.log('Cookies are not enabled!');
}

window.onload = function () {
    const userConsent = getCookie("userConsent");

    if (!userConsent) {
        setTimeout(() => (modal1.style.visibility = 'visible'), 1000);
    } else {
        displayCookies();
        setTimeout(() => (modal1.style.visibility = 'visible'), 15000);
    }
};

listen('click', acceptBtn, AcceptButton);
listen('click', settingBtn, openSettings);
listen('click', saveBtn, savePreferences);

