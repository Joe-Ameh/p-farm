/* ==========================================================================
   DANGOTE INDUSTRIES LIMITED - OFFICIAL REPLICA JS LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initSearch();
});

/* 1. HERO SLIDER */
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
    timer = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
}

/* 2. SEARCH MODAL */
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = prompt('Search Dangote Industries Limited:');
      if (q) {
        alert(`Searching Dangote website for "${q}"...`);
      }
    });
  }
}

/* 3. REUSABLE MODAL PREVIEW */
window.openModal = function(title, content) {
  alert(`${title}\n\n${content}`);
};
