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

  const body = document.querySelector('body');

  const overlay = document.querySelector('.nav-overlay');

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
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
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
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  // Close mobile menu when clicking overlay
  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  });

  const closeBtn = document.querySelector('.nav-close');
  
  // Close button functionality
  closeBtn.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  });
});
