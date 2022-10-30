const generateCircles = () => {
  const box = document.querySelector(".box");
  const circles = document.createElement("div");
  circles.className = "circles";

  for (let i = 3; i >= 0; i--) {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.animationDelay = `-${i}s`;
    circles.append(circle);
  }
  
  generateDimensions(circles);
  box.appendChild(circles);
};

const generateDimensions = (circles) => {
  const box = document.querySelector(".box");
  const rect = box?.getBoundingClientRect();

  let generatedTop = rect.height * Math.random();
  let generatedLeft = rect.width * Math.random();

  if (rect.height - generatedTop <= 100) generatedTop -= 100;
  if (rect.width - generatedLeft <= 100) generatedLeft -= 100;
  circles.style.top = `${generatedTop}px`;
  circles.style.left = `${generatedLeft}px`;
};

module.exports = {
  generateCircles,
  generateDimensions,
};
