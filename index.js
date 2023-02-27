
sites = ["#main", "#projects"];
positions = [0, 0];
for (let i = 0; i < sites.length; i++) {
  positions[i] = document.querySelector(sites[i]).offsetTop;
}
currentSite = 0;
lastScrollTop = 0;
scrollTimer = 0;

function scrollDown() {
  currentSite++;
  if (currentSite >= sites.length) {
    currentSite = sites.length;
  }
  document.querySelector(sites[currentSite]).scrollIntoView({
    behavior: "smooth",
  });
}

function scrollUp() {
  currentSite--;
  if (currentSite < 0) {
    currentSite = 0;
  }
  document.querySelector(sites[currentSite]).scrollIntoView({
    behavior: "smooth",
  });
}

function flashDivs() {
  let divs;
  if(currentSite == 0){
    divs = document.querySelectorAll('#main div.container');
  }
  else if(currentSite == 1){
    divs = document.querySelectorAll('#projects div.container');
  }
  divs.forEach((div, index) => {
    setTimeout(() => {
      div.classList.add('flash');
    }, 100 * index);
    setTimeout(() => {
      div.classList.remove('flash');
    }, 100 * index + 500);
  });
  timerID = setTimeout(flashDivs, 10000);
}

function removeFlash() {
  let divs = document.querySelectorAll('#main div.container');
  divs.forEach((div, index) => {
    div.classList.remove('flash');
  });
}

function snapScroll() {
  let current = document.querySelector("main").scrollTop;
  closest = positions.reduce(function(prev, curr) {
    return (Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev);
  });
  currentSite = positions.indexOf(closest);
  document.querySelector(sites[currentSite]).scrollIntoView({
    behavior: "smooth",
  });
}

body = document.querySelector('body');
body_width = body.offsetWidth;
body_height = body.offsetHeight;

document.addEventListener('mousemove', function (e) {
  ball = document.getElementById('ball');
  ball.classList.remove('hidden');
  width = ball.offsetWidth/2;
  hieght = ball.offsetHeight/2;
  ball.style.left = `${e.pageX-width}px`;
  ball.style.top = `${e.pageY-hieght}px`;
  clearTimeout(timerID);
  timerID = setTimeout(flashDivs, 5000);
});

document.querySelector("main").addEventListener('scroll', function (e) {
  posY = window.scrollY;
  for (let i = 0; i < positions.length; i++) {
    if (posY >= positions[i] - 1) {
      currentSite = i;
    }
  }
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(snapScroll, 100);
});

document.addEventListener('keydown', function (e) {
  //shift
  if (e.key == "Shift") {
    clearTimeout(timerID);
    flashDivs();
  }
});

timerID = setTimeout(flashDivs, 5000);