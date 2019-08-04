const root = document.querySelector("div#root");

const colors = ["red", "orange", "yellow"];

let leftPosition = 715;
let topPosition = 220;

for (let i = 0; i < 42; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.cssText =
    "left: " + leftPosition + "px; top: " + topPosition + "px;  background:" + colors[i % 3];
  root.appendChild(circle);
  circle.value = i % 3;
  if (i < 4 || i >= 38) {
    topPosition += 55;
  } else if (i < 17) {
    leftPosition -= 55;
  } else if (i < 25) {
    topPosition -= 55;
  } else if (i < 38) {
    leftPosition += 55;
  }
}

const circleList = document.querySelectorAll("div.circle");

setInterval(function() {
  for (let i = 0; i < circleList.length; i++) {
    circleList[i].value =
      circleList[i].value < 2 ? (circleList[i].value += 1) : 0;
    circleList[i].style.background = colors[circleList[i].value];
  }
}, 300);

const delta = Math.PI * 2 / circleList.length;
let angle = 0;

const button = document.querySelector("button");

function makeCircle() {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed >= 2000) {
      clearInterval(timer);
      return;
    }
    draw(timePassed);
  }, 20);
}

function draw(timePassed) {
  for (let i = 0; i < circleList.length; i++) {
    const initialLeft = parseInt(circleList[i].style.left);
    const initialTop = parseInt(circleList[i].style.top);
    const finalLeft = 290 * Math.cos(angle) + 350;
    const finalTop = 290 * Math.sin(angle) + 225;
    circleList[i].style.left =
      initialLeft + (finalLeft - initialLeft) * timePassed / 2000 + "px";
    circleList[i].style.top =
      initialTop + (finalTop - initialTop) * timePassed / 2000 + "px";
    angle += delta;
  }
}

button.addEventListener("click", makeCircle);

