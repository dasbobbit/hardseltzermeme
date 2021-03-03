(function slider() {
  const sliderContainer = document.querySelector(".slider-container");
  const slider = sliderContainer.querySelector(".slider");
  const sliderItems = slider.querySelectorAll(".slider-item");
  const sliderArrows = sliderContainer.querySelectorAll(".arrows-item");
  const dotsContainer = sliderContainer.querySelector(".dots");

  let totalItems = sliderItems.length;
  let count = 0;
  let slideWidth = 0;
  let imageWidth = 400;
  let interval = setInterval(moveNext, 5000);

  function initDots() {
    for (let i = 0; i < totalItems; i++) {
      let dot = document.createElement("span");
      if (i === 0) {
        dot.classList.add("dot", "dots-active");
      } else {
        dot.classList.add("dot");
      }
      dot.addEventListener("click", moveToPlace);
      dotsContainer.appendChild(dot);
    }
  }
  initDots();

  function moveToPlace() {
    let position = Array.from(this.parentNode.children).indexOf(this);
    count = position;
    slideWidth = position * imageWidth;
    slider.style.transform = `translateX(${-slideWidth}px)`;

    // Clear dots to normal color and change selected to active color
    let dotsList = dotsContainer.querySelectorAll(".dot");
    dotsList.forEach((dot) => {
      if (dot.classList.contains("dots-active")) {
        dot.classList.remove("dots-active");
      }
    });
    dotsList[position].classList.add("dots-active");
    resetInterval();
  }

  // Slide to previous image
  function movePrev() {
    let dotsList = dotsContainer.querySelectorAll(".dot");

    if (count != 0) {
      count--;
      slideWidth -= imageWidth;
      slider.style.transform = `translateX(${-slideWidth}px)`;

      dotsList[count + 1].classList.remove("dots-active");
      dotsList[count].classList.add("dots-active");
    } else {
      count = totalItems - 1;
      slideWidth = (totalItems - 1) * imageWidth;
      slider.style.transform = `translateX(${-slideWidth}px)`;

      dotsList[0].classList.remove("dots-active");
      dotsList[totalItems - 1].classList.add("dots-active");
    }
    resetInterval();
  }

  // Slide to next image
  function moveNext() {
    let dotsList = dotsContainer.querySelectorAll(".dot");

    if (count < totalItems - 1) {
      count++;
      slideWidth += imageWidth;
      slider.style.transform = `translateX(-${slideWidth}px)`;

      dotsList[count - 1].classList.remove("dots-active");
      dotsList[count].classList.add("dots-active");
    } else {
      count = 0;
      slideWidth = 0;
      slider.style.transform = `translateX(${slideWidth}px)`;

      dotsList[totalItems - 1].classList.remove("dots-active");
      dotsList[count].classList.add("dots-active");
    }
    resetInterval();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(moveNext, 5000);
  }

  // Set up Event Listeners
  sliderArrows[0].addEventListener("click", movePrev);
  sliderArrows[1].addEventListener("click", moveNext);
})();
