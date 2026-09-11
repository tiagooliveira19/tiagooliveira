export function initScrollProfile() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  if (!header || !hero) {
    return;
  }

  const update = (scrolled) => {
    header.classList.toggle('is-scrolled', scrolled);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        update(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-20% 0px 0px 0px',
      },
    );

    observer.observe(hero);
    return;
  }

  const onScroll = () => {
    update(window.scrollY > hero.offsetHeight * 0.45);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
