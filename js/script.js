/* =====================================================
   FUN SIDEBAR JS (STABLE FOR VIDEO)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* stagger enter */
  const items = document.querySelectorAll(".fun-sidebar > *");
  items.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-10px)";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
      item.style.transition = "all 0.4s ease";
    }, index * 120);
  });

  /* typing effect */
  const text = "Dwi Krisdanarti";
  const typingTarget = document.getElementById("typing-text");
  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingTarget) return;

    if (!isDeleting) {
      typingTarget.textContent = text.slice(0, index + 1);
      index++;
      if (index === text.length) {
        setTimeout(() => isDeleting = true, 1800);
      }
    } else {
      typingTarget.textContent = text.slice(0, index - 1);
      index--;
      if (index === 0) isDeleting = false;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }

  typeEffect();
});

/* =====================================================
   PARALLAX (LIGHT & SAFE)
===================================================== */
document.addEventListener("mousemove", (e) => {
  const sidebar = document.querySelector(".fun-sidebar");
  if (!sidebar) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 3;
  const y = (e.clientY / window.innerHeight - 0.5) * 3;

  sidebar.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});

/* =====================================================
   AVATAR CLICK (IMAGE ONLY)
===================================================== */
const avatarImage = document.querySelector(".avatar:not(.avatar-video)");
let avatarClick = 0;

avatarImage?.addEventListener("click", () => {
  avatarClick++;

  avatarImage.style.transform = "rotate(360deg) scale(1.1)";
  setTimeout(() => {
    avatarImage.style.transform = "";
  }, 400);

  if (avatarClick === 5) {
    alert("👋 Hi! Thanks for visiting my portfolio!");
    avatarClick = 0;
  }
});

/* =====================================================
   RANDOM SOCIAL ICON BOUNCE
===================================================== */
setInterval(() => {
  const icons = document.querySelectorAll(".social-icon");
  if (!icons.length) return;

  const random = icons[Math.floor(Math.random() * icons.length)];
  random.style.transform = "translateY(-6px)";
  setTimeout(() => {
    random.style.transform = "";
  }, 300);
}, 2500);

// Portfolio Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // active button
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || category.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});