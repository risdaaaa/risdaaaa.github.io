
/* =====================================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   Modern, lightweight, and responsive
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. GLOBAL CONFIGURATION
  ===================================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isMobile = window.matchMedia(
    "(max-width: 700px)"
  ).matches;


  /* =====================================================
     2. SIDEBAR STAGGER ANIMATION
  ===================================================== */

  const sidebar = document.querySelector(".fun-sidebar");

  if (sidebar && !prefersReducedMotion) {

    const sidebarItems = sidebar.children;

    Array.from(sidebarItems).forEach((item, index) => {

      item.animate(
        [
          {
            opacity: 0,
            transform: "translateX(-12px)"
          },
          {
            opacity: 1,
            transform: "translateX(0)"
          }
        ],
        {
          duration: 450,
          delay: index * 100,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both"
        }
      );

    });

  }


  /* =====================================================
     3. TYPING EFFECT
  ===================================================== */

  const typingTarget = document.getElementById("typing-text");

  if (typingTarget) {

    const fullName = "Dwi Krisdanarti";

    let charIndex = 0;
    let isDeleting = false;
    let typingTimer = null;

    const typingSpeed = 100;
    const deletingSpeed = 55;
    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 500;

    function typeEffect() {

      // Pause when browser tab is inactive
      if (document.hidden) {
        return;
      }

      if (!isDeleting) {

        charIndex++;

        typingTarget.textContent = fullName.slice(0, charIndex);

        if (charIndex === fullName.length) {

          typingTimer = setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, pauseAfterTyping);

          return;
        }

      } else {

        charIndex--;

        typingTarget.textContent = fullName.slice(0, charIndex);

        if (charIndex === 0) {

          isDeleting = false;

          typingTimer = setTimeout(
            typeEffect,
            pauseAfterDeleting
          );

          return;
        }

      }

      typingTimer = setTimeout(
        typeEffect,
        isDeleting ? deletingSpeed : typingSpeed
      );

    }


    // Static text for reduced-motion users
    if (prefersReducedMotion) {

      typingTarget.textContent = fullName;

    } else {

      typeEffect();

      // Resume typing when the tab becomes active
      document.addEventListener("visibilitychange", () => {

        if (!document.hidden && typingTimer === null) {
          typeEffect();
        }

      });

    }

  }


  /* =====================================================
     4. AVATAR CLICK INTERACTION
  ===================================================== */

  // Supports both image and video-based avatar classes
  const avatarImage = document.querySelector(
    ".fun-sidebar img.avatar"
  );

  let avatarClickCount = 0;
  let avatarResetTimer = null;

  if (avatarImage && !prefersReducedMotion) {

    avatarImage.style.cursor = "pointer";

    avatarImage.addEventListener("click", () => {

      avatarClickCount++;

      // Avoid overlapping click animations
      if (avatarResetTimer) {
        clearTimeout(avatarResetTimer);
      }

      avatarImage.animate(
        [
          {
            transform: "rotate(0deg) scale(1)"
          },
          {
            transform: "rotate(360deg) scale(1.08)"
          },
          {
            transform: "rotate(360deg) scale(1)"
          }
        ],
        {
          duration: 500,
          easing: "ease-out"
        }
      );

      // Small easter egg
      if (avatarClickCount >= 5) {

        alert("👋 Hi! Thanks for visiting my portfolio!");

        avatarClickCount = 0;

      }

    });

  }


  /* =====================================================
     5. RANDOM SOCIAL ICON ANIMATION
  ===================================================== */

  const socialIcons = document.querySelectorAll(".social-icon");

  let socialBounceInterval = null;

  function animateRandomSocialIcon() {

    if (
      document.hidden ||
      prefersReducedMotion ||
      socialIcons.length === 0
    ) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * socialIcons.length
    );

    const selectedIcon = socialIcons[randomIndex];

    selectedIcon.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-5px)" },
        { transform: "translateY(0)" }
      ],
      {
        duration: 350,
        easing: "ease-out"
      }
    );

  }

  if (socialIcons.length > 0 && !prefersReducedMotion) {

    socialBounceInterval = setInterval(
      animateRandomSocialIcon,
      3500
    );

    // Stop unnecessary activity in inactive tabs
    document.addEventListener("visibilitychange", () => {

      if (document.hidden && socialBounceInterval) {

        clearInterval(socialBounceInterval);
        socialBounceInterval = null;

      } else if (
        !document.hidden &&
        !socialBounceInterval
      ) {

        socialBounceInterval = setInterval(
          animateRandomSocialIcon,
          3500
        );

      }

    });

  }


  /* =====================================================
     6. PORTFOLIO FILTER
  ===================================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  if (filterButtons.length > 0 && portfolioCards.length > 0) {

    function filterPortfolio(selectedFilter) {

      portfolioCards.forEach(card => {

        const categories = (
          card.dataset.category || ""
        )
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean);

        const shouldShow =
          selectedFilter === "all" ||
          categories.includes(selectedFilter);

        card.hidden = !shouldShow;

      });

    }


    filterButtons.forEach(button => {

      button.addEventListener("click", () => {

        const selectedFilter = (
          button.dataset.filter || "all"
        ).toLowerCase();

        // Update active button
        filterButtons.forEach(filterButton => {

          const isActive = filterButton === button;

          filterButton.classList.toggle("active", isActive);

          filterButton.setAttribute(
            "aria-pressed",
            String(isActive)
          );

        });

        // Apply filter
        filterPortfolio(selectedFilter);

      });

    });


    // Initialize active filter
    const initialFilter = document.querySelector(
      ".filter-btn.active"
    );

    if (initialFilter) {

      filterPortfolio(
        (initialFilter.dataset.filter || "all").toLowerCase()
      );

    } else {

      filterPortfolio("all");

    }

  }


  /* =====================================================
     7. AUTOMATIC COPYRIGHT YEAR
  ===================================================== */

  const currentYear = document.getElementById("current-year");

  if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

  }


  /* =====================================================
     8. EXTERNAL LINKS SECURITY
  ===================================================== */

  const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
  );

  externalLinks.forEach(link => {

    const relValues = new Set(
      (link.getAttribute("rel") || "")
        .split(/\s+/)
        .filter(Boolean)
    );

    relValues.add("noopener");
    relValues.add("noreferrer");

    link.setAttribute(
      "rel",
      [...relValues].join(" ")
    );

  });


  /* =====================================================
     9. IMAGE LOADING OPTIMIZATION
  ===================================================== */

  const contentImages = document.querySelectorAll(
    ".project-img, .certificate-img, .doing-icon, .tech-icon"
  );

  contentImages.forEach(img => {

    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }

  });


  /* =====================================================
     10. MOBILE NAVIGATION ACCESSIBILITY
  ===================================================== */

  const navigationLinks = document.querySelectorAll(
    ".nav-right a"
  );

  navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

      navigationLinks.forEach(navLink => {

        navLink.classList.remove("active");
        navLink.removeAttribute("aria-current");

      });

      link.classList.add("active");
      link.setAttribute("aria-current", "page");

    });

  });


  /* =====================================================
     11. INITIALIZATION COMPLETE
  ===================================================== */

  console.info(
    "Portfolio website initialized successfully."
  );

});
