// Navigation when scrolling
function reactive() {
  var activeNav = document.getElementsByClassName('active');
  for (let i = 0; i < activeNav.length; i++) {
    if (activeNav[i].classList.contains('active')) {
      activeNav[i].classList.remove('active');
    }
  }
}

var html = document.documentElement;
var banner = document.getElementById('banner');
var header = document.getElementsByTagName('header')[0];
var loveHomeNav = document.getElementById('love-home-nav');
var loveSpaceNav = document.getElementById('love-space-nav');
var loveDiaryNav = document.getElementById('love-diary-nav');
var loveSpace = document.getElementById('love-space');

window.onscroll = function() {
  if (html.scrollTop > banner.clientHeight - 100) {
    header.style.background = "#2f3b4d";
    if (html.scrollTop > banner.clientHeight + loveSpace.clientHeight - 85) {
      reactive();
      loveDiaryNav.classList.add('active');
    } else {
      reactive();
      loveSpaceNav.classList.add('active');
    }
  } else {
    header.style.background = "transparent";
    reactive();
    loveHomeNav.classList.add('active');
  }
}

$("#love-home-nav").click(function() {
  $('html, body').animate({
      scrollTop: $("#love-home").offset().top
  }, 500);
});

$("#love-space-nav").click(function() {
  $('html, body').animate({
      scrollTop: $("#love-space").offset().top
  }, 500);
});

$("#love-diary-nav").click(function() {
  $('html, body').animate({
      scrollTop: $("#love-diary").offset().top
  }, 500);
});