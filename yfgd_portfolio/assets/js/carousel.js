// ==============================
// File: carousel.js
// Description: JSON-driven rotating image carousel
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  // Fetch the JSON file with image lists
  fetch("carousel-images.json")
    .then(response => response.json())
    .then(jsonData => {

      const containers = document.querySelectorAll(".rotating-container");
      const defaultInterval = 4000; // fallback interval

      containers.forEach(container => {
        const img = container.querySelector("img");
        if (!img) return;

        const carouselKey = container.dataset.carousel;
        if (!carouselKey || !jsonData[carouselKey]) return;

        const images = jsonData[carouselKey];
        if (images.length === 0) return;

        const interval = container.dataset.interval
          ? parseInt(container.dataset.interval)
          : defaultInterval;

        let index = 0;

        setInterval(() => {
          // Fade out
          img.style.opacity = 0;

          setTimeout(() => {
            // Advance to next image
            index = (index + 1) % images.length;
            img.src = images[index];

            // Fade in
            img.style.opacity = 1;
          }, 800); // match this to your CSS fade duration
        }, interval);
      });

    })
    .catch(error => {
      console.error("Error loading carousel-images.json:", error);
    });

});