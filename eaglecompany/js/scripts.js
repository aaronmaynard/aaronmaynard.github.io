document.addEventListener("DOMContentLoaded", function() {
  initBannerCarousel();
  initMobileTreeAccordion();
  setupMobileTopnavDropdowns();
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}

function setupMobileTopnavDropdowns() {
  var nav = document.getElementById("myTopnav");
  if (!nav) return;

  var menuItems = nav.querySelectorAll("li:not(.menu-toggle)");

  menuItems.forEach(function(item) {
    var link = item.querySelector("a:first-child");
    var submenu = item.querySelector(".nav-submenu");

    if (!link || !submenu) {
      return;
    }

    link.addEventListener("click", function(event) {
      // Only handle clicks on mobile viewports
      if (window.innerWidth > 730) {
        return;
      }

      // Check if menu is in responsive mode
      if (!nav.classList.contains("responsive")) {
        return;
      }

      // Prevent default navigation on click
      event.preventDefault();

      // Close other open submenus (only one open at a time)
      menuItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove("show-submenu");
        }
      });

      // Toggle current submenu
      item.classList.toggle("show-submenu");
    });
  });
}

function initMobileTreeAccordion() {
  if (window.innerWidth > 730) {
    return;
  }

  var tree = document.querySelector(".site-tree");
  if (!tree) {
    console.warn("Site tree not found");
    return;
  }

  var links = tree.querySelectorAll(".tree-top-link");
  console.log("Found " + links.length + " tree-top-links");

  links.forEach(function(link) {
    link.addEventListener("click", function(event) {
      if (window.innerWidth > 730) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      var section = link.closest(".tree-section");
      if (!section) {
        console.warn("Could not find tree-section");
        return;
      }

      var isActive = section.classList.contains("active");
      var allSections = tree.querySelectorAll(".tree-section");

      allSections.forEach(function(sec) {
        sec.classList.remove("active");
      });

      if (!isActive) {
        section.classList.add("active");
        console.log("Opened: " + link.textContent);
      }
    });
  });
}

function initBannerCarousel() {
  var carousel = document.querySelector(".banner-carousel");
  if (!carousel) {
    return;
  }

  var slidesEl = carousel.querySelector(".banner-slides");
  var prevButton = carousel.querySelector(".carousel-control.prev");
  var nextButton = carousel.querySelector(".carousel-control.next");
  var indicatorsEl = carousel.querySelector(".carousel-indicators");
  var bannerPath = "images/banner/";
  var currentIndex = 0;
  var autoRotateId;
  var slideCount = 0;

  prevButton.addEventListener("click", function() {
    setActiveSlide(currentIndex - 1);
    resetAutoRotate();
  });

  nextButton.addEventListener("click", function() {
    setActiveSlide(currentIndex + 1);
    resetAutoRotate();
  });

  indicatorsEl.addEventListener("click", function(event) {
    var target = event.target;
    if (!target.classList.contains("carousel-indicator")) {
      return;
    }
    var index = Number(target.getAttribute("data-index"));
    setActiveSlide(index);
    resetAutoRotate();
  });

  // Hardcoded banner images for offline-first static deployment
  var bannerImages = [
    bannerPath + "BuybackService.png",
    bannerPath + "Exploration.png",
    bannerPath + "FuelBlockProduction.png",
    bannerPath + "Logistics.png",
    bannerPath + "SRP.png"
  ];

  buildSlides(bannerImages);
  setActiveSlide(0);
  startAutoRotate();

  function buildSlides(imageUrls) {
    slideCount = imageUrls.length;
    slidesEl.innerHTML = "";
    indicatorsEl.innerHTML = "";

    imageUrls.forEach(function(src, index) {
      var slide = document.createElement("div");
      slide.className = "banner-slide";
      var image = document.createElement("img");
      image.src = src;
      image.alt = "Banner image " + (index + 1);
      slide.appendChild(image);
      slidesEl.appendChild(slide);

      var indicator = document.createElement("button");
      indicator.type = "button";
      indicator.className = "carousel-indicator";
      indicator.setAttribute("data-index", index);
      indicatorsEl.appendChild(indicator);
    });
  }

  function setActiveSlide(index) {
    if (!slideCount) {
      return;
    }
    currentIndex = (index % slideCount + slideCount) % slideCount;
    slidesEl.style.transform = "translateX(-" + currentIndex * 100 + "%)";
    updateIndicators();
  }

  function updateIndicators() {
    var indicators = indicatorsEl.querySelectorAll(".carousel-indicator");
    indicators.forEach(function(indicator, index) {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function startAutoRotate() {
    if (slideCount <= 1) {
      return;
    }
    if (autoRotateId) {
      clearInterval(autoRotateId);
    }
    autoRotateId = setInterval(function() {
      setActiveSlide(currentIndex + 1);
    }, 15000); // Rotate every 15 seconds
  }

  function resetAutoRotate() {
    startAutoRotate();
  }
}
