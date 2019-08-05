const root = document.querySelector("div#root");

const colors = ["red", "orange", "yellow"];
let leftRectangle = [];
let topRectangle = [];
let leftCirlce = [];
let topCircle = [];

let leftPosition = 715;
let topPosition = 220;

for (let i = 0; i < 42; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.cssText =
    "left: " + leftPosition + "px; top: " + topPosition + "px;  background:" + colors[i % 3];
  root.appendChild(circle);
  leftRectangle[i] = leftPosition;
  topRectangle[i] = topPosition;
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

for(let i = 0; i < circleList.length; i++) {
  leftCirlce[i] = 290 * Math.cos(angle) + 350;
  topCircle[i] = 290 * Math.sin(angle) + 225;
  angle += delta;
}

const button = document.querySelector("button");
let rectangle = true;

function transform() {
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed >= 1000) {
      clearInterval(timer);
      return;
    }
    if(rectangle) {
      draw(timePassed, leftCirlce, topCircle, leftRectangle, topRectangle);  
    } else {
      draw(timePassed, leftRectangle, topRectangle, leftCirlce, topCircle);
    }
  }, 20);
  if (rectangle) {
    rectangle = false;
  } else {
    rectangle = true;
  }
}

function draw(timePassed, initialX, initialY, finalX, finalY) {
  for (let i = 0; i < circleList.length; i++) {
    const initialLeft = initialX[i];
    const initialTop = initialY[i];
    const finalLeft = finalX[i];
    const finalTop = finalY[i];
    circleList[i].style.left =
      initialLeft + (finalLeft - initialLeft) * timePassed / 1000 + "px";
    circleList[i].style.top =
      initialTop + (finalTop - initialTop) * timePassed / 1000 + "px";
  }
}

button.addEventListener("click", transform);


