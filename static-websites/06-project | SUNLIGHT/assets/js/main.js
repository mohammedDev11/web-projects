/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav--link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");

  // If the user scrolled down 50px or more
  this.scrollY >= 50
    ? header.classList.add("bg-header") // Add background style
    : header.classList.remove("bg-header"); // Remove background style
};

// Trigger the function every time the user scrolls
window.addEventListener("scroll", scrollHeader);

/*=============== SWIPER POPULAR ===============*/
const popularSwiper = new Swiper(".popular--content", {
  slidesPerView: "auto",
  centeredSlides: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      centeredSlides: false,
    },
  },
});

/*=============== CHOOSE FAQ ===============*/
const faqItems = document.querySelectorAll(".choose--fag-item");

// 1. Select each item
faqItems.forEach((item) => {
  const faqHeader = item.querySelector(".choose--fag-header");

  // 2. Select each button click
  faqHeader.addEventListener("click", () => {
    // 7. Select the current faq-open class
    const openItem = document.querySelector(".fag-open");

    // 5. Call the toggleItem function
    toggleItem(item);

    // 8. Remove the faq-open class from other items
    if (openItem && openItem != item) {
      toggleItem(openItem);
    }
  });
});

// 3. Create function to display the content
const toggleItem = (item) => {
  // 3.1. Select each faq content
  const faqContent = item.querySelector(".choose--fag-content");

  // 6. If the same item contains the faq-open class, remove
  if (item.classList.contains("fag-open")) {
    faqContent.removeAttribute("style");
    item.classList.remove("fag-open");
  } else {
    // 4. Add max-height to the content and add the faq-open class
    faqContent.style.height = faqContent.scrollHeight + "px";
    item.classList.add("fag-open");
  }
};

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the tag with the scrollup id
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrolly = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav--menu a[href*=" + sectionId + "]"
      );

    if (scrolly > sectionTop && scrolly <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected theme and icon (if user chose before)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Get current theme and icon based on class presence
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// Check if the user previously chose a theme
if (selectedTheme) {
  // Apply the saved theme and icon from localStorage
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Toggle dark mode and icon
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // Save the selected theme and icon in localStorage
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true // Animations repeat
});
sr.reveal(
  `.home--content, .popular--container, .products--container, .join--bg, footer--container`
);

sr.reveal(`.home--image`, { origin: "bottom" });

sr.reveal(`.choose--image, .features--image`, { origin: "left" });

sr.reveal(`.choose_--ontent, .features--content`, { origin: "right" });
