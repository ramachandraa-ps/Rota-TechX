// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const sections = document.querySelectorAll("section");
  const navLinkElements = document.querySelectorAll(".nav-links a");
  const featureCards = document.querySelectorAll(".feature-card");

  let lastScroll = 0;
  // Navigation scroll effect
  function handleNavScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      nav.style.transform = "translate(-50%, 0)";
      return;
    }

    if (currentScroll > lastScroll) {
      // Scrolling down
      nav.style.transform = "translate(-50%, -100%)";
    } else {
      // Scrolling up
      nav.style.transform = "translate(-50%, 0)";
    }

    lastScroll = currentScroll;
  }

  // Mobile menu handlers
  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  }

  function closeMobileMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }

  // Smooth scroll implementation
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      closeMobileMenu();
    }
  }

  // Active section detection for navigation
  function updateActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinkElements.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  }

  // ... existing code ...

  // FAQ accordion functionality
  function handleFAQClick() {
    const faqItem = this.closest(".faq-item");
    const answer = faqItem.querySelector(".faq-answer");
    const icon = faqItem.querySelector(".faq-icon");

    // Close other open FAQs
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem && item.classList.contains("active")) {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
        item.querySelector(".faq-icon").textContent = "+";
      }
    });

    // Toggle current FAQ
    faqItem.classList.toggle("active");
    if (faqItem.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = "−";
    } else {
      answer.style.maxHeight = null;
      icon.textContent = "+";
    }
  }

  // Initialize FAQ items
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", handleFAQClick);
  });

  // ... existing code ...

  // Event Listeners
  window.addEventListener("scroll", handleNavScroll);
  window.addEventListener("scroll", updateActiveNavLink);
  hamburger.addEventListener("click", toggleMobileMenu);

  navLinkElements.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", handleFAQClick);
  });

  // Initialize feature card observers
  featureCards.forEach((card) => {
    featureObserver.observe(card);
  });

  // Additional utility functions
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Optional: Add scroll-based animations for performance
  const scrollHandler = debounce(() => {
    handleNavScroll();
    updateActiveNavLink();
  }, 10);

  window.addEventListener("scroll", scrollHandler);

  // Optional: Add resize handler
  const resizeHandler = debounce(() => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 250);

  window.addEventListener("resize", resizeHandler);

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Close mobile menu when clicking overlay
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
  });

  const closeBtn = document.querySelector(".nav-close");

  // Close button functionality
  closeBtn.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("menu-open");
  });
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let intervals = {}; // Store intervals for each card
/*
const domainData = [
  {
    name: "Peacebuilding and Conflict Prevention",
    link: "https://example.com/first",
    description: "Fostering peace and resilience through conflict prevention, social harmony, and inclusive dialogue",
    image: "assets/images/black-background.jpg",
    logo: "assets/images/AOF_peace_white_no_title.png",
  },
  {
    name: "Disease Prevention and Treatment",
    link: "https://example.com/second",
    description: "Enhancing healthcare through disease prevention, improved treatments, and strengthened infrastructure",
    image: "assets/images/black-background-inverse.jpg",
    logo: "assets/images/AOF_disease_white_no_title.png",
  },
  {
    name: "Water, Sanitation, and Hygiene",
    link: "https://example.com/third",
    description: "Ensuring clean water, sanitation, and hygiene for better public health and well-being.",
    image: "assets/images/black-background-port.jpg",
    logo: "assets/images/AOF_water_white_no_title.png",
  },
  {
    name: "Maternal and Child Health",
    link: "https://example.com/fourth",
    description: "Promoting maternal and child health through better care, nutrition, and development.",
    image: "assets/images/black-background.jpg",
    logo: "assets/images/AOF_maternal_white_no_title.png",
  },
  {
    name: "Basic Education and Literacy",
    link: "https://example.com/fifth",
    description: "Empowering through quality education, literacy, and skill development for all.",
    image: "assets/images/black-background-inverse.jpg",
    logo: "assets/images/AOF_education_white_no_title.png",
  },
  {
    name: "Community Economic Development",
    link: "https://example.com/sixth",
    description: "Driving growth through entrepreneurship, financial inclusion, and job creation.",
    image: "assets/images/black-background.jpg",
    logo: "assets/images/AOF_economic_white_no_title.png",
  },
  {
    name: "Supporting the Environment",
    link: "https://example.com/seventh",
    description: "Advancing sustainability through climate action, conservation, and resource management.",
    image: "assets/images/black-background.jpg",
    logo: "assets/images/AOF_environment_white_no_title.png",
  },
];*/

function createScreenElement(data) {
  const screen = document.createElement("div");
  screen.classList.add("screen");

  const screenImage = document.createElement("div");
  screenImage.classList.add("screen-image");
  screenImage.style.backgroundImage = `url("${data.image}")`;
  screen.appendChild(screenImage);

  const screenOverlay = document.createElement("div");
  screenOverlay.classList.add("screen-overlay");
  screen.appendChild(screenOverlay);

  const screenContent = document.createElement("div");
  screenContent.classList.add("screen-content");
  screen.appendChild(screenContent);

  // Replace Font Awesome icon with image
  const screenIcon = document.createElement("img");
  screenIcon.classList.add("screen-icon");
  screenIcon.src = data.logo; // Set the src attribute to the ICO path
  screenIcon.alt = data.name + " Logo"; // Add alt text for accessibility

  screenContent.appendChild(screenIcon);

  const screenUser = document.createElement("div");
  screenUser.classList.add("screen-user");
  screenContent.appendChild(screenUser);

  const nameSpan = document.createElement("span");
  nameSpan.classList.add("name");
  nameSpan.dataset.value = data.name;
  nameSpan.textContent = data.name;
  screenUser.appendChild(nameSpan);

  const linkElement = document.createElement("a");
  linkElement.classList.add("link");
  linkElement.href = data.link;
  linkElement.target = "_blank";
  linkElement.textContent = data.description;
  linkElement.setAttribute("aria-label", `Visit ${data.name}`);
  screenUser.appendChild(linkElement);

  screen.addEventListener("mouseenter", handleMouseEnter);
  screen.addEventListener("mouseleave", handleMouseLeave);

  return screen;
}

function handleMouseEnter(event) {
  const screen = event.currentTarget;
  const nameSpan = screen.querySelector(".name");

  if (!nameSpan) return;

  let iteration = 0;
  const cardIndex = Array.from(domainGrid.children).indexOf(screen);

  if (intervals[cardIndex]) {
    clearInterval(intervals[cardIndex]);
  }

  intervals[cardIndex] = setInterval(() => {
    nameSpan.innerText = nameSpan.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return nameSpan.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= nameSpan.dataset.value.length) {
      clearInterval(intervals[cardIndex]);
    }
    iteration += 1 / 3;
  }, 30);
}

function handleMouseLeave(event) {
  const screen = event.currentTarget;
  const nameSpan = screen.querySelector(".name");
  const cardIndex = Array.from(domainGrid.children).indexOf(screen);

  if (!nameSpan) return;

  if (intervals[cardIndex]) {
    clearInterval(intervals[cardIndex]);
    nameSpan.innerText = nameSpan.dataset.value;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const domainGrid = document.getElementById("domainGrid");

  domainData.forEach((data) => {
    const screenElement = createScreenElement(data);
    domainGrid.appendChild(screenElement);
  });
});


// Script for the Timeline Section

document.addEventListener("DOMContentLoaded", function() {

  // Fade-in Animation Logic
  const timelineItems = document.querySelectorAll(".Timeline-grid ul li");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the element is visible
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Timeline Toggle (Expand/Collapse) Logic
  const timelineItemsToggle = document.querySelectorAll(".Timeline-grid ul li");

  timelineItemsToggle.forEach(item => {
    const toggleButton = item.querySelector(".timeline-toggle");

    toggleButton.addEventListener("click", function() {
      item.classList.toggle("expanded");
      const expanded = item.classList.contains("expanded");
      toggleButton.setAttribute("aria-expanded", expanded); //Update aria attribute
    });
  });
});