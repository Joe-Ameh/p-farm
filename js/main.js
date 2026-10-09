/* ==========================================================================
   DANGOTE GROUP - INTERACTIVE MULTI-PAGE JAVASCRIPT LOGIC (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initProjectsCarousel();
  initTimelineTabs();
  initBusinessFilter();
  initSearchModal();
});


const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-navigation");
const menuOverlay = document.querySelector(".menu-overlay");

function setMenuOpen(isOpen) {
  siteNavigation.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-active", isOpen);
  menuOverlay.classList.toggle("is-visible", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// Close when the overlay is clicked
menuOverlay.addEventListener("click", () => {
  setMenuOpen(false);
});

// Close when a navigation link is clicked
siteNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

// Close with the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

// Reset the menu when returning to desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    setMenuOpen(false);
  }
});

/* 1. HERO SLIDER LOGIC */
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide-item');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');

  if (!slides.length) return;

  let current = 0;
  const total = slides.length;
  let timer;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % total;
    goToSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + total) % total;
    goToSlide(prev);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });
  }

  function startTimer() {
    timer = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
}

/* 2. BUSINESS PROJECTS HORIZONTAL CAROUSEL */
function initProjectsCarousel() {
  const container = document.querySelector('.businesses-carousel-grid');
  const prevBtn = document.querySelector('.carousel-prev-btn');
  const nextBtn = document.querySelector('.carousel-next-btn');

  if (!container || !prevBtn || !nextBtn) return;

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: 360, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -360, behavior: 'smooth' });
  });
}

/* 3. ABOUT US HISTORY TIMELINE TABS */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const panels = document.querySelectorAll('.timeline-content-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const year = btn.getAttribute('data-year');
      const targetPanel = document.getElementById(`timeline-${year}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* 4. OUR BUSINESSES FILTER TABS */
function initBusinessFilter() {
  const filterBtns = document.querySelectorAll('.biz-filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* GLOBAL REUSABLE MODAL DIALOG */
window.openModal = function(title, content) {
  alert(`${title}\n\n${content}`);
};
