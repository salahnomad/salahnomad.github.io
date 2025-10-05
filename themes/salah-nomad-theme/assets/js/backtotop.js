// H:\Salah-Nomad\NewBlog\themes\salah-nomad-theme\assets\js\backtotop.js
// (Version fournie le 2024-05-07 ~15:17 UTC)
export default function BackToTop() {
  const backToTopLink = document.querySelector('[data-back-to-top]');
  const backToTopContainer = document.querySelector('.back-to-top');

  if (!backToTopLink || !backToTopContainer) {
    // console.warn("BackToTop elements not found.");
    return;
  }

  const scrollFunction = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopContainer.classList.add('visible');
    } else {
      backToTopContainer.classList.remove('visible');
    }
  };

  scrollFunction(); // Check initial state

  window.addEventListener('scroll', scrollFunction, { passive: true });

  backToTopLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}